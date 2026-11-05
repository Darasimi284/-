import { useState } from 'react'
import { syllabus } from '../data/syllabus.js'

export default function Syllabus() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(null)

  const q = query.trim().toLowerCase()

  const filtered = syllabus
    .map((entry) => ({
      ...entry,
      topics: q
        ? entry.topics.filter(
            (topic) => topic.toLowerCase().includes(q) || entry.subject.toLowerCase().includes(q),
          )
        : entry.topics,
    }))
    .filter((entry) => entry.topics.length > 0)

  const totalTopics = syllabus.reduce((sum, entry) => sum + entry.topics.length, 0)

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <span className="text-sm font-semibold text-indigo-600">Syllabus</span>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
        The JAMB syllabus, in full
      </h1>
      <p className="mt-3 max-w-2xl text-slate-500">
        Every topic UTME can test you on, across {syllabus.length} subjects and {totalTopics}{' '}
        topics. Search for a topic or expand a subject.
      </p>

      {/* Search */}
      <div className="relative mt-8">
        <svg
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search subjects and topics…"
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {/* Accordion */}
      <div className="mt-8 space-y-3">
        {filtered.map((entry) => {
          const isOpen = q !== '' || open === entry.subject
          return (
            <div key={entry.subject} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <button
                type="button"
                onClick={() => setOpen(isOpen && !q ? null : entry.subject)}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left hover:bg-slate-50"
              >
                <span className="text-sm font-semibold text-slate-900">{entry.subject}</span>
                <span className="flex items-center gap-3">
                  <span className="text-xs font-medium text-slate-400">
                    {entry.topics.length} topic{entry.topics.length !== 1 && 's'}
                  </span>
                  <svg
                    className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              {isOpen && (
                <ol className="border-t border-slate-100 px-5 py-4">
                  {entry.topics.map((topic, i) => (
                    <li key={topic} className="flex gap-3 py-2 text-sm leading-6 text-slate-600">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[10px] font-semibold text-indigo-600">
                        {i + 1}
                      </span>
                      {topic}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
          No topics match “{query}”. Try a different keyword.
        </p>
      )}

      <p className="mt-8 text-xs text-slate-400">
        Topic list based on the official JAMB/UTME syllabus. Always confirm against the current
        year's syllabus on jamb.gov.ng.
      </p>
    </div>
  )
}
