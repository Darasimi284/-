import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSchedule } from '../hooks/useSchedule.js'

// Estimated UTME window — confirm the official dates at jamb.gov.ng
const EXAM_DATE = new Date('2027-04-24T08:00:00')

const MILESTONES = [
  { label: 'UTME registration opens', date: '1 Feb 2027' },
  { label: 'Registration closes', date: '2 Mar 2027' },
  { label: 'Mock UTME', date: '12 Mar 2027' },
  { label: 'Main UTME exam', date: '24 – 30 Apr 2027' },
  { label: 'Results released', date: 'Within 14 days of exam' },
]

function useCountdown(target) {
  const [remaining, setRemaining] = useState(() => target.getTime() - Date.now())

  useEffect(() => {
    const id = setInterval(() => setRemaining(target.getTime() - Date.now()), 1000)
    return () => clearInterval(id)
  }, [target])

  const clamped = Math.max(0, remaining)
  return {
    days: Math.floor(clamped / 86400000),
    hours: Math.floor((clamped % 86400000) / 3600000),
    minutes: Math.floor((clamped % 3600000) / 60000),
    seconds: Math.floor((clamped % 60000) / 1000),
    past: remaining <= 0,
  }
}

function pad(n) {
  return String(n).padStart(2, '0')
}

export default function Timetable() {
  const countdown = useCountdown(EXAM_DATE)
  const { entries, completed } = useSchedule()

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <span className="text-sm font-semibold text-indigo-600">Timetable</span>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
        Exam countdown & key dates
      </h1>

      {/* -------- Countdown -------- */}
      <section className="mt-8 overflow-hidden rounded-3xl bg-indigo-600 px-6 py-8 text-white sm:px-10">
        <p className="text-sm font-semibold text-indigo-100">UTME main exam · 24 April 2027</p>

        {countdown.past ? (
          <p className="mt-4 text-2xl font-bold">The exam window has arrived — good luck!</p>
        ) : (
          <div className="mt-5 grid max-w-xl grid-cols-4 gap-3 sm:gap-4">
            {[
              { value: countdown.days, label: 'days' },
              { value: countdown.hours, label: 'hours' },
              { value: countdown.minutes, label: 'mins' },
              { value: countdown.seconds, label: 'secs' },
            ].map((unit) => (
              <div
                key={unit.label}
                className="rounded-2xl bg-white/10 px-2 py-4 text-center backdrop-blur"
              >
                <div className="text-3xl font-extrabold tabular-nums sm:text-4xl">
                  {pad(unit.value)}
                </div>
                <div className="mt-1 text-[11px] font-medium uppercase tracking-wide text-indigo-200">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="mt-5 text-xs text-indigo-200">
          Dates are indicative and for planning only — always confirm the official schedule on
          jamb.gov.ng.
        </p>
      </section>

      {/* -------- Key dates -------- */}
      <section className="mt-10">
        <h2 className="text-lg font-bold text-slate-900">Key dates</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {MILESTONES.map((item, i) => (
            <div
              key={item.label}
              className={`flex items-center justify-between px-5 py-3.5 text-sm ${
                i !== 0 ? 'border-t border-slate-100' : ''
              }`}
            >
              <span
                className={
                  item.label === 'Main UTME exam' ? 'font-semibold text-slate-900' : 'text-slate-600'
                }
              >
                {item.label}
              </span>
              <span className="font-medium text-slate-500">{item.date}</span>
            </div>
          ))}
        </div>
      </section>

      {/* -------- Weekly schedule CTA -------- */}
      <section className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">My weekly study schedule</h2>
          <p className="mt-1 text-sm text-slate-500">
            {entries.length === 0
              ? 'No sessions planned yet — open the schedule to add your first one.'
              : `${entries.length} session${entries.length !== 1 ? 's' : ''} planned · ${completed} completed`}
          </p>
        </div>
        <Link
          to="/schedule"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
        >
          Open weekly schedule →
        </Link>
      </section>
    </div>
  )
}
