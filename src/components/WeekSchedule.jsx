import { useState } from 'react'
import { subjects } from '../data/subjects.js'
import { useSchedule } from '../hooks/useSchedule.js'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function WeekSchedule() {
  const { entries, add, toggle, remove, clear, completed } = useSchedule()
  const [subject, setSubject] = useState(subjects[0])
  const [day, setDay] = useState('Monday')
  const [time, setTime] = useState('18:00')

  const progress = entries.length ? Math.round((completed / entries.length) * 100) : 0

  function addEntry(e) {
    e.preventDefault()
    add({ subject, day, time })
  }

  return (
    <section>
      {/* Summary row */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900">This week</h2>
          <p className="mt-1 text-sm text-slate-500">
            {entries.length === 0
              ? 'Add your first study slot below — it saves automatically in this browser.'
              : `${completed} of ${entries.length} sessions completed${progress ? ` · ${progress}%` : ''}`}
          </p>
        </div>
        {entries.length > 0 && (
          <button
            type="button"
            onClick={clear}
            className="text-xs font-semibold text-slate-400 hover:text-red-500"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Progress bar */}
      {entries.length > 0 && (
        <div className="mt-4 h-2 w-full rounded-full bg-slate-100">
          <div
            className="h-2 rounded-full bg-indigo-600 transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* Manual entry box */}
      <form
        onSubmit={addEntry}
        className="mt-6 flex flex-wrap items-end gap-3 rounded-2xl border border-slate-200 bg-white p-4"
      >
        <label className="flex flex-col gap-1 text-xs font-semibold text-slate-500">
          Subject
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal text-slate-700 focus:border-indigo-500 focus:outline-none"
          >
            {subjects.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-semibold text-slate-500">
          Day
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal text-slate-700 focus:border-indigo-500 focus:outline-none"
          >
            {DAYS.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-xs font-semibold text-slate-500">
          Time
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal text-slate-700 focus:border-indigo-500 focus:outline-none"
          />
        </label>

        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Add session
        </button>
      </form>

      {/* Week grid — swipeable row on mobile, full grid on desktop */}
      <div className="mt-6 flex gap-3 overflow-x-auto pb-3 lg:grid lg:grid-cols-7 lg:overflow-visible lg:pb-0">
        {DAYS.map((d) => {
          const dayEntries = entries.filter((entry) => entry.day === d)
          return (
            <div
              key={d}
              className="min-h-48 w-44 shrink-0 rounded-2xl border border-slate-200 bg-white p-3 lg:min-h-40 lg:w-auto"
            >
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-400">
                {d.slice(0, 3)}
              </h3>

              <div className="mt-2 space-y-2">
                {dayEntries.length === 0 && <p className="text-xs text-slate-300">—</p>}
                {dayEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className={`group rounded-lg border px-2.5 py-2 ${
                      entry.done ? 'border-green-200 bg-green-50' : 'border-slate-100 bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span
                        className={`text-xs font-semibold ${
                          entry.done ? 'text-green-700 line-through' : 'text-slate-700'
                        }`}
                      >
                        {entry.subject}
                      </span>
                      <button
                        type="button"
                        onClick={() => remove(entry.id)}
                        aria-label={`Remove ${entry.subject} on ${d}`}
                        className="text-slate-300 opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">{entry.time}</span>
                      <button
                        type="button"
                        onClick={() => toggle(entry.id)}
                        className={`text-[10px] font-semibold ${
                          entry.done ? 'text-green-600' : 'text-slate-400 hover:text-indigo-600'
                        }`}
                      >
                        {entry.done ? '✓ Done' : 'Mark done'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {entries.length === 0 && (
        <p className="mt-4 text-xs text-slate-400">
          Tip: keep it realistic — three or four focused slots a week beats an impossible plan.
        </p>
      )}
    </section>
  )
}
