import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/hero.png'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/practice', label: 'Practice' },
  { to: '/past-questions', label: 'Past Questions' },
  { to: '/syllabus', label: 'Syllabus' },
  { to: '/timetable', label: 'Timetable' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-indigo-50 text-indigo-700'
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src={logo} alt="" className="h-8 w-8" />
          <span className="text-lg font-bold tracking-tight text-slate-900">
            JAMB<span className="text-indigo-600">Prep</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/practice"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
          >
            Start free practice
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="space-y-1 border-t border-slate-200 px-4 py-3 md:hidden">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={linkClass} onClick={() => setOpen(false)}>
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/practice"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Start free practice
          </Link>
        </nav>
      )}
    </header>
  )
}
