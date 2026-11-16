// A small MIPS decoder for the Lab section: the same field-splitting and
// control-signal logic as a single-cycle datapath's decode stage, in JS.

export const REGISTERS = [
  '$zero', '$at', '$v0', '$v1', '$a0', '$a1', '$a2', '$a3',
  '$t0', '$t1', '$t2', '$t3', '$t4', '$t5', '$t6', '$t7',
  '$s0', '$s1', '$s2', '$s3', '$s4', '$s5', '$s6', '$s7',
  '$t8', '$t9', '$k0', '$k1', '$gp', '$sp', '$fp', '$ra',
]

const R_FUNCT = {
  0x20: { name: 'add', alu: 'add' },
  0x22: { name: 'sub', alu: 'sub' },
  0x24: { name: 'and', alu: 'and' },
  0x25: { name: 'or', alu: 'or' },
  0x2a: { name: 'slt', alu: 'slt' },
  0x2b: { name: 'sltu', alu: 'sltu' },
}

const OPCODES = {
  0x02: { name: 'j', format: 'J' },
  0x04: { name: 'beq', format: 'I', alu: 'sub' },
  0x08: { name: 'addi', format: 'I', alu: 'add' },
  0x0a: { name: 'slti', format: 'I', alu: 'slt' },
  0x0b: { name: 'sltiu', format: 'I', alu: 'sltu' },
  0x0f: { name: 'lui', format: 'I', alu: 'lui' },
  0x23: { name: 'lw', format: 'I', alu: 'add' },
  0x2b: { name: 'sw', format: 'I', alu: 'add' },
}

// Control unit outputs. 'X' means don't care.
const CONTROL = {
  R: { RegDst: 1, ALUSrc: 0, MemtoReg: 0, RegWrite: 1, MemRead: 0, MemWrite: 0, Branch: 0, Jump: 0 },
  lw: { RegDst: 0, ALUSrc: 1, MemtoReg: 1, RegWrite: 1, MemRead: 1, MemWrite: 0, Branch: 0, Jump: 0 },
  sw: { RegDst: 'X', ALUSrc: 1, MemtoReg: 'X', RegWrite: 0, MemRead: 0, MemWrite: 1, Branch: 0, Jump: 0 },
  beq: { RegDst: 'X', ALUSrc: 0, MemtoReg: 'X', RegWrite: 0, MemRead: 0, MemWrite: 0, Branch: 1, Jump: 0 },
  imm: { RegDst: 0, ALUSrc: 1, MemtoReg: 0, RegWrite: 1, MemRead: 0, MemWrite: 0, Branch: 0, Jump: 0 },
  j: { RegDst: 'X', ALUSrc: 'X', MemtoReg: 'X', RegWrite: 0, MemRead: 0, MemWrite: 0, Branch: 0, Jump: 1 },
}

export const SIGNALS = ['RegDst', 'ALUSrc', 'MemtoReg', 'RegWrite', 'MemRead', 'MemWrite', 'Branch', 'Jump']

export const PRESETS = [
  { label: 'add', word: 0x02324020 },
  { label: 'lw', word: 0x8fa90008 },
  { label: 'sw', word: 0xafc9fffc },
  { label: 'beq', word: 0x1100fffd },
  { label: 'addi', word: 0x23bdfff0 },
  { label: 'slt', word: 0x0109502a },
  { label: 'lui', word: 0x3c081001 },
  { label: 'j', word: 0x08100006 },
]

export const hex = (n, width = 8) => '0x' + (n >>> 0).toString(16).toUpperCase().padStart(width, '0')

export function fieldsFor(format) {
  if (format === 'R')
    return [
      { key: 'op', label: 'opcode', from: 31, to: 26 },
      { key: 'rs', label: 'rs', from: 25, to: 21 },
      { key: 'rt', label: 'rt', from: 20, to: 16 },
      { key: 'rd', label: 'rd', from: 15, to: 11 },
      { key: 'shamt', label: 'shamt', from: 10, to: 6 },
      { key: 'funct', label: 'funct', from: 5, to: 0 },
    ]
  if (format === 'J')
    return [
      { key: 'op', label: 'opcode', from: 31, to: 26 },
      { key: 'target', label: 'jump target', from: 25, to: 0 },
    ]
  return [
    { key: 'op', label: 'opcode', from: 31, to: 26 },
    { key: 'rs', label: 'rs', from: 25, to: 21 },
    { key: 'rt', label: 'rt', from: 20, to: 16 },
    { key: 'offset', label: 'offset', from: 15, to: 0 },
  ]
}

export function decode(word) {
  const w = word >>> 0
  const f = {
    op: (w >>> 26) & 0x3f,
    rs: (w >>> 21) & 0x1f,
    rt: (w >>> 16) & 0x1f,
    rd: (w >>> 11) & 0x1f,
    shamt: (w >>> 6) & 0x1f,
    funct: w & 0x3f,
    offset: w & 0xffff,
    target: w & 0x3ffffff,
  }
  // Sign extension: copy bit 15 into the upper half.
  const ext = f.offset & 0x8000 ? f.offset | 0xffff0000 : f.offset
  const sext = ext | 0 // as a signed JS number
  const reg = (n) => REGISTERS[n]

  if (f.op === 0) {
    const r = R_FUNCT[f.funct]
    if (!r || f.shamt !== 0) {
      return { word: w, fields: f, format: 'R', halt: `Unsupported funct ${hex(f.funct, 2)}` }
    }
    const ops = { add: '+', sub: '−', and: '&', or: '|' }
    const effect =
      r.name === 'slt' || r.name === 'sltu'
        ? `${reg(f.rd)} ← (${reg(f.rs)} < ${reg(f.rt)}) ? 1 : 0`
        : `${reg(f.rd)} ← ${reg(f.rs)} ${ops[r.name]} ${reg(f.rt)}`
    return {
      word: w,
      fields: f,
      format: 'R',
      name: r.name,
      asm: `${r.name} ${reg(f.rd)}, ${reg(f.rs)}, ${reg(f.rt)}`,
      effect,
      control: CONTROL.R,
      alu: `funct → ${r.alu}`,
      ext,
    }
  }

  const o = OPCODES[f.op]
  if (!o) return { word: w, fields: f, format: 'I', halt: `Illegal opcode ${hex(f.op, 2)}` }

  if (o.format === 'J') {
    const addr = (f.target << 2) >>> 0
    return {
      word: w,
      fields: f,
      format: 'J',
      name: 'j',
      asm: `j ${hex(addr)}`,
      effect: `PC ← (PC+4)[31:28] | ${hex(addr)}`,
      control: CONTROL.j,
      alu: '—',
      ext,
    }
  }

  let asm
  let effect
  let control = CONTROL.imm
  switch (o.name) {
    case 'lw':
      asm = `lw ${reg(f.rt)}, ${sext}(${reg(f.rs)})`
      effect = `${reg(f.rt)} ← Mem[${reg(f.rs)} ${sext < 0 ? '−' : '+'} ${Math.abs(sext)}]`
      control = CONTROL.lw
      break
    case 'sw':
      asm = `sw ${reg(f.rt)}, ${sext}(${reg(f.rs)})`
      effect = `Mem[${reg(f.rs)} ${sext < 0 ? '−' : '+'} ${Math.abs(sext)}] ← ${reg(f.rt)}`
      control = CONTROL.sw
      break
    case 'beq':
      asm = `beq ${reg(f.rs)}, ${reg(f.rt)}, ${sext}`
      effect = `if ${reg(f.rs)} = ${reg(f.rt)}: PC ← PC + 4 ${sext < 0 ? '−' : '+'} ${Math.abs(sext) * 4}`
      control = CONTROL.beq
      break
    case 'lui':
      asm = `lui ${reg(f.rt)}, ${hex(f.offset, 4)}`
      effect = `${reg(f.rt)} ← ${hex((f.offset << 16) >>> 0)}`
      break
    default: {
      asm = `${o.name} ${reg(f.rt)}, ${reg(f.rs)}, ${sext}`
      effect =
        o.name === 'addi'
          ? `${reg(f.rt)} ← ${reg(f.rs)} ${sext < 0 ? '−' : '+'} ${Math.abs(sext)}`
          : `${reg(f.rt)} ← (${reg(f.rs)} < ${sext}) ? 1 : 0`
    }
  }
  return { word: w, fields: f, format: 'I', name: o.name, asm, effect, control, alu: o.alu, ext }
}

export function describeField(key, d) {
  const f = d.fields
  switch (key) {
    case 'op':
      return d.halt && !OPCODES[f.op] && f.op !== 0 ? `${f.op} · illegal` : f.op === 0 ? '0 · R-type' : `${f.op} · ${OPCODES[f.op]?.name ?? '?'}`
    case 'rs':
    case 'rt':
    case 'rd':
      return `${f[key]} · ${REGISTERS[f[key]]}`
    case 'shamt':
      return String(f.shamt)
    case 'funct':
      return `${hex(f.funct, 2)} · ${R_FUNCT[f.funct]?.name ?? '?'}`
    case 'offset':
      return `${hex(f.offset, 4)} → ${d.ext | 0}`
    case 'target':
      return `${hex(f.target, 7)} → ${hex((f.target << 2) >>> 0)}`
    default:
      return ''
  }
}

// Where the decoded control signals send data, in one line each: the register
// that gets written, what feeds the ALU's second input, the source of the
// write-back value, and how the next PC is chosen.
export function datapath(d) {
  if (d.halt) return null
  const f = d.fields
  const c = d.control
  const none = '—'
  return [
    { label: 'Write reg', value: c.RegWrite === 1 ? REGISTERS[c.RegDst === 1 ? f.rd : f.rt] : none },
    {
      label: 'ALU in B',
      value: c.ALUSrc === 1 ? (d.name === 'lui' ? 'imm << 16' : `imm ${d.ext | 0}`) : c.ALUSrc === 0 ? REGISTERS[f.rt] : none,
    },
    { label: 'Write data', value: c.RegWrite === 1 ? (c.MemtoReg === 1 ? 'memory' : 'ALU result') : none },
    { label: 'Next PC', value: c.Jump === 1 ? 'jump target' : c.Branch === 1 ? 'PC+4 or branch' : 'PC + 4' },
  ]
}
