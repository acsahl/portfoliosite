import GridLayout from './projects/GridLayout'
import CaseStudyLayout from './projects/CaseStudyLayout'
import FeaturedLayout from './projects/FeaturedLayout'

// Layout preview: switch with ?layout=grid | case | featured (default grid).
// Once a layout is picked, the other two and this switch get deleted.
const layouts = { grid: GridLayout, case: CaseStudyLayout, featured: FeaturedLayout }

export default function Projects() {
  const key = new URLSearchParams(window.location.search).get('layout')
  const Layout = layouts[key] ?? GridLayout
  return <Layout />
}
