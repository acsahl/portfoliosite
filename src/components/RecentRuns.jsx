import { useEffect, useState } from 'react'

const GREEN = '#1DB954'

function metersToMiles(m) { return (m / 1609.344).toFixed(2) }
function formatTime(s) {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m ${sec.toString().padStart(2,'0')}s`
}
function formatPace(seconds, meters) {
  const miles = meters / 1609.344, ps = seconds / miles
  const m = Math.floor(ps / 60), s = Math.round(ps % 60)
  return `${m}:${s.toString().padStart(2,'0')} /mi`
}
function formatDate(d) { return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }

export default function RecentRuns() {
  const [runs, setRuns] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/strava').then(r => r.json()).then(data => {
      if (data.error) throw new Error(data.error)
      setRuns(data); setLoading(false)
    }).catch(err => { setError(err.message); setLoading(false) })
  }, [])

  return (
    <section className="py-24 px-6 lg:px-12 bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="font-mono text-xs tracking-widest mb-2 text-muted">05 / RUNNING</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-ink">Recent runs.</h2>
          </div>
          <a href="https://www.strava.com/athletes/acsahl_lukose" target="_blank" rel="noopener noreferrer"
            className="text-sm text-muted hover:text-ink transition-colors">View on Strava →</a>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => <div key={i} className="card-glass rounded-2xl p-5 h-28 animate-pulse" />)}
          </div>
        )}
        {error && <div className="card-glass rounded-2xl p-6 text-sm text-muted font-mono">Could not load runs — check Strava env vars.</div>}
        {!loading && !error && runs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {runs.map(run => (
              <a key={run.id} href={run.url} target="_blank" rel="noopener noreferrer"
                className="card-glass rounded-2xl p-5 card-hover flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-ink font-medium text-sm truncate">{run.name}</span>
                  <span className="text-xs text-muted font-mono shrink-0">{formatDate(run.start_date)}</span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold" style={{ color: GREEN }}>{metersToMiles(run.distance)}</p>
                    <p className="text-xs text-muted font-mono">miles</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-ink font-mono">{formatTime(run.moving_time)}</p>
                    <p className="text-xs text-muted font-mono">{formatPace(run.moving_time, run.distance)}</p>
                  </div>
                </div>
                {run.total_elevation_gain > 0 && (
                  <p className="text-xs text-muted font-mono">↑ {Math.round(run.total_elevation_gain * 3.281)}ft gain</p>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
