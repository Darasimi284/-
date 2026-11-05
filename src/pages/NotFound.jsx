import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center sm:px-6">
      <span className="text-6xl font-extrabold text-indigo-600">404</span>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">This page doesn't exist</h1>
      <p className="mt-2 text-slate-500">
        The link may be broken, or the page may have moved.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
      >
        Back to home
      </Link>
    </div>
  )
}
