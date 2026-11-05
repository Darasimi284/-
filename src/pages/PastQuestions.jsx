import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getYearsFor, questions as bank, years } from '../data/questions/index.js'
import { quizSubjects, subjects } from '../data/subjects.js'

const LETTERS = ['A', 'B', 'C', 'D']

export default function PastQuestions() {
  const location = useLocation()
  const [subject, setSubject] = useState(location.state?.subject ?? null)
  const [year, setYear] = useState(null) // null = all years
  const [revealed, setRevealed] = useState({})

  const available = subject ? bank.filter((q) => q.subject === subject) : []
  const shown = year === null ? available : available.filter((q) => q.year === year)
  const availableYears = subject ? getYearsFor(subject) : []

  function toggleReveal(id) {
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function pickSubject(name) {
    setSubject(name)
    setYear(null)
    setRevealed({})
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function clearSubject() {
    setSubject(null)
    setYear(null)
    setRevealed({})
  }

  // ---------- Step 1: choose a subject ----------
  if (!subject) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <span className="text-sm font-semibold text-indigo-600">Past Questions</span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
          UTME past questions by subject
        </h1>
        <p className="mt-3 max-w-2xl text-slate-500">
          Pick a subject to browse questions by year with full answers and explanations.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {subjects.map((name) => {
            const hasQuestions = quizSubjects.includes(name)
            const count = bank.filter((q) => q.subject === name).length
            return (
              <button
                key={name}
                type="button"
                onClick={() => hasQuestions && pickSubject(name)}
                disabled={!hasQuestions}
                className={`rounded-xl border p-5 text-left transition-colors ${
                  hasQuestions
                    ? 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm'
                    : 'cursor-not-allowed border-slate-100 bg-slate-50'
                }`}
              >
                <span
                  className={`block text-sm font-semibold ${
                    hasQuestions ? 'text-slate-900' : 'text-slate-400'
                  }`}
                >
                  {name}
                </span>
                <span className={`mt-1 block text-xs ${hasQuestions ? 'text-indigo-600' : 'text-slate-400'}`}>
                  {hasQuestions ? `${count} questions` : 'Coming soon'}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // ---------- Step 2: browse questions for a subject ----------
  const hasQuiz = quizSubjects.includes(subject)

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <button
        type="button"
        onClick={clearSubject}
        className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
      >
        ← All subjects
      </button>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-sm font-semibold text-indigo-600">{subject}</span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {available.length} past questions
          </h1>
        </div>
        {hasQuiz && (
          <Link
            to="/practice"
            state={{ subject }}
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            Quiz me on this subject
          </Link>
        )}
      </div>

      {/* Year filter */}
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setYear(null)}
          className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
            year === null
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All years
        </button>
        {availableYears.map((y) => (
          <button
            key={y}
            type="button"
            onClick={() => setYear(y)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              year === y
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {y}
          </button>
        ))}
      </div>

      {/* Question list */}
      <ol className="mt-8 space-y-5">
        {shown.map((q, i) => {
          const isRevealed = revealed[q.id]
          return (
            <li key={q.id} className="rounded-2xl border border-slate-200 bg-white p-5">
              {q.passage && (
                <div className="mb-4 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                    Passage
                  </span>
                  {q.passage}
                </div>
              )}
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium leading-6 text-slate-800">
                  <span className="mr-2 text-slate-400">{i + 1}.</span>
                  {q.question}
                </p>
                <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500">
                  {q.year}
                </span>
              </div>

              <ul className="mt-4 space-y-2">
                {q.options.map((opt, oi) => {
                  const correct = oi === q.answer
                  return (
                    <li
                      key={oi}
                      className={`flex items-center gap-3 rounded-xl border px-3 py-2 text-sm ${
                        isRevealed && correct
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                          isRevealed && correct
                            ? 'bg-green-600 text-white'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {LETTERS[oi]}
                      </span>
                      {opt}
                      {isRevealed && correct && (
                        <span className="ml-auto text-xs font-semibold text-green-600">Correct answer</span>
                      )}
                    </li>
                  )
                })}
              </ul>

              {isRevealed && (
                <div className="mt-4 rounded-xl bg-indigo-50 px-4 py-3 text-sm leading-6 text-indigo-900">
                  <span className="font-semibold">Explanation: </span>
                  {q.explanation}
                </div>
              )}

              <button
                type="button"
                onClick={() => toggleReveal(q.id)}
                className={`mt-4 text-xs font-semibold ${isRevealed ? 'text-slate-500' : 'text-indigo-600 hover:text-indigo-700'}`}
              >
                {isRevealed ? 'Hide answer' : 'Show answer & explanation'}
              </button>
            </li>
          )
        })}
      </ol>

      {shown.length === 0 && (
        <p className="mt-8 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
          No questions for {subject} in {year}. Try another year.
        </p>
      )}

      <p className="mt-8 text-xs text-slate-400">
        Practice questions are original and modelled on the UTME format ({years[0]}–{years[years.length - 1]}).
      </p>
    </div>
  )
}
