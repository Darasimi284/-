import { Link } from 'react-router-dom'
import logo from '../assets/hero.png'

const year = new Date().getFullYear()

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'Practice', to: '/practice' },
      { label: 'Past Questions', to: '/past-questions' },
      { label: 'Syllabus', to: '/syllabus' },
      { label: 'Timetable', to: '/timetable' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Study tips', to: '/syllabus' },
      { label: 'Exam format', to: '/syllabus' },
      { label: 'FAQ', to: '/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/' },
      { label: 'Contact', to: '/' },
      { label: 'Privacy', to: '/' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="" className="h-8 w-8" />
              <span className="text-lg font-bold text-slate-900">
                JAMB<span className="text-indigo-600">Prep</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Practice real UTME questions, take timed mock tests, and track your score until exam day.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-slate-900">{column.title}</h3>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-slate-500 hover:text-indigo-600">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-400">
          © {year} JAMBPrep. Not affiliated with JAMB.
        </div>
      </div>
    </footer>
  )
}
