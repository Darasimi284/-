import { Link } from 'react-router-dom'
import WeekSchedule from '../components/WeekSchedule.jsx'

export default function Schedule() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between gap-3">
        <Link
          to="/timetable"
          className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
        >
          ← Back to timetable
        </Link>
        <span className="text-xs text-slate-400">Saved in this browser</span>
      </div>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
        Weekly study schedule
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
        Fill your timetable manually using the box below — pick a subject, day and time, then add
        the session. Swipe the week sideways on your phone.
      </p>

      <div className="mt-8 flex-1">
        <WeekSchedule />
      </div>
    </div>
  )
}
