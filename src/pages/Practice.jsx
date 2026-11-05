import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { questions as bank } from '../data/questions/index.js'
import { quizSubjects } from '../data/subjects.js'

const LETTERS = ['A', 'B', 'C', 'D']
const COUNTS = [5, 10, 20, 45]
const MODES = [
  {
    id: 'instant',
    title: 'Instant feedback',
    description: 'See the correct answer and explanation right after each question.',
  },
  {
    id: 'end',
    title: 'Results at the end',
    description: 'Answer everything first, then get your score and full review.',
  },
  {
    id: 'timed',
    title: 'Timed mock (exam conditions)',
    description: 'Countdown timer — one minute per question, no feedback until you submit.',
  },
]

function shuffle(list) {
  const arr = [...list]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function pad(n) {
  return String(n).padStart(2, '0')
}

function formatTime(totalSeconds) {
  return `${Math.floor(totalSeconds / 60)}:${pad(totalSeconds % 60)}`
}

function scoreMessage(pct) {
  if (pct >= 70) return { text: 'Excellent — you are on track for a high score.', tone: 'text-green-600' }
  if (pct >= 50) return { text: 'Good effort — review the missed questions and try again.', tone: 'text-indigo-600' }
  return { text: 'Keep practising — go through the explanations below first.', tone: 'text-amber-600' }
}

function Passage({ text }) {
  if (!text) return null
  return (
    <div className="mb-4 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        Passage
      </span>
      {text}
    </div>
  )
}

export default function Practice() {
  const location = useLocation()

  const [screen, setScreen] = useState('setup')
  const [subject, setSubject] = useState(location.state?.subject ?? null)
  const [count, setCount] = useState(10)
  const [mode, setMode] = useState('instant')

  const [quiz, setQuiz] = useState([])
  const [answers, setAnswers] = useState([])
  const [index, setIndex] = useState(0)
  const [revealed, setRevealed] = useState(false)

  const [timeLeft, setTimeLeft] = useState(0)
  const [expired, setExpired] = useState(false)
  const [deadline, setDeadline] = useState(null)

  const current = quiz[index]
  const score = quiz.reduce((sum, q, i) => sum + (answers[i] === q.answer ? 1 : 0), 0)
  const pct = quiz.length ? Math.round((score / quiz.length) * 100) : 0

  // Countdown tick (timed mock only) — setState happens in the timer callback, not the effect body
  useEffect(() => {
    if (screen !== 'quiz' || mode !== 'timed' || !deadline) return undefined
    const id = setInterval(() => {
      setTimeLeft(Math.max(0, Math.round((deadline - Date.now()) / 1000)))
    }, 1000)
    return () => clearInterval(id)
  }, [screen, mode, deadline])

  // Auto-submit when time is up
  useEffect(() => {
    if (screen !== 'quiz' || mode !== 'timed' || !deadline) return undefined
    const id = setTimeout(() => {
      setExpired(true)
      setScreen('results')
      window.scrollTo({ top: 0 })
    }, Math.max(0, deadline - Date.now()))
    return () => clearTimeout(id)
  }, [screen, mode, deadline])

  function startQuiz() {
    if (!subject) return
    const pool = shuffle(bank.filter((q) => q.subject === subject)).slice(0, count)
    setQuiz(pool)
    setAnswers(Array(pool.length).fill(null))
    setIndex(0)
    setRevealed(false)
    setExpired(false)
    setTimeLeft(count * 60)
    setDeadline(Date.now() + count * 60 * 1000)
    setScreen('quiz')
    window.scrollTo({ top: 0 })
  }

  function choose(optionIndex) {
    if (mode === 'instant') {
      if (revealed) return
      setAnswers((prev) => {
        const next = [...prev]
        next[index] = optionIndex
        return next
      })
      setRevealed(true)
      return
    }
    if (answers[index] !== null) return
    setAnswers((prev) => {
      const next = [...prev]
      next[index] = optionIndex
      return next
    })
  }

  function next() {
    if (index === quiz.length - 1) {
      setScreen('results')
    } else {
      setIndex(index + 1)
      setRevealed(false)
    }
    window.scrollTo({ top: 0 })
  }

  function restart() {
    setScreen('setup')
    setQuiz([])
    setAnswers([])
    setIndex(0)
    setRevealed(false)
    setExpired(false)
    setDeadline(null)
    window.scrollTo({ top: 0 })
  }

  // ---------------- Setup ----------------
  if (screen === 'setup') {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <span className="text-sm font-semibold text-indigo-600">Practice</span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Set up your quiz</h1>
        <p className="mt-2 text-slate-500">
          Pick a subject, number of questions, and how you want to be graded.
        </p>

        {/* Subject */}
        <h2 className="mt-8 text-sm font-semibold text-slate-900">1. Subject</h2>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {quizSubjects.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setSubject(name)}
              className={`rounded-xl border p-4 text-sm font-semibold transition-colors ${
                subject === name
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Count */}
        <h2 className="mt-8 text-sm font-semibold text-slate-900">2. Number of questions</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          {COUNTS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setCount(n)}
              className={`rounded-xl border px-5 py-2.5 text-sm font-semibold transition-colors ${
                count === n
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              {n === 45 ? 'Full paper (45)' : `${n} questions`}
            </button>
          ))}
        </div>

        {/* Mode */}
        <h2 className="mt-8 text-sm font-semibold text-slate-900">3. Grading mode</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={`rounded-xl border p-4 text-left transition-colors ${
                mode === m.id
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <span
                className={`block text-sm font-semibold ${
                  mode === m.id ? 'text-indigo-700' : 'text-slate-900'
                }`}
              >
                {m.title}
              </span>
              <span className="mt-1 block text-xs leading-5 text-slate-500">{m.description}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={startQuiz}
            disabled={!subject}
            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {subject
              ? mode === 'timed'
                ? `Start timed mock · ${count} min`
                : `Start ${count === 45 ? 'full paper' : `${count}-question quiz`}`
              : 'Choose a subject first'}
          </button>
          <Link to="/" className="text-sm font-semibold text-slate-500 hover:text-slate-700">
            Cancel
          </Link>
        </div>
      </div>
    )
  }

  // ---------------- Quiz ----------------
  if (screen === 'quiz') {
    const selected = answers[index]
    const showFeedback = mode === 'instant' && revealed
    const modeLabel =
      mode === 'instant' ? 'Instant feedback' : mode === 'timed' ? 'Timed mock' : 'Results at the end'
    const timerTone =
      timeLeft <= 60
        ? 'bg-red-100 text-red-600 animate-pulse'
        : timeLeft <= 300
          ? 'bg-amber-100 text-amber-700'
          : 'bg-slate-100 text-slate-600'

    return (
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-slate-500">
          <span>
            {subject} · {modeLabel}
          </span>
          <span className="flex items-center gap-3">
            {mode === 'timed' && (
              <span className={`rounded-full px-2.5 py-1 font-bold tabular-nums ${timerTone}`}>
                ⏱ {formatTime(timeLeft)}
              </span>
            )}
            <button type="button" onClick={restart} className="text-slate-400 hover:text-slate-600">
              Quit quiz
            </button>
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-900">
            Question {index + 1} of {quiz.length}
          </span>
          <span className="text-slate-500">Score {score}</span>
        </div>

        <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
          <div
            className="h-2 rounded-full bg-indigo-600 transition-all"
            style={{ width: `${((index + 1) / quiz.length) * 100}%` }}
          ></div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <Passage text={current.passage} />
          <p className="text-sm font-medium leading-7 text-slate-800">{current.question}</p>

          <ul className="mt-5 space-y-2.5">
            {current.options.map((opt, oi) => {
              const isSelected = selected === oi
              const isAnswer = current.answer === oi
              let cls = 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              let badge = 'bg-slate-100 text-slate-500'

              if (showFeedback) {
                if (isAnswer) {
                  cls = 'border-green-500 bg-green-50 text-green-800'
                  badge = 'bg-green-600 text-white'
                } else if (isSelected) {
                  cls = 'border-red-400 bg-red-50 text-red-700'
                  badge = 'bg-red-500 text-white'
                } else {
                  cls = 'border-slate-200 bg-white text-slate-400'
                }
              } else if (isSelected) {
                cls = 'border-indigo-600 bg-indigo-50 text-indigo-700'
                badge = 'bg-indigo-600 text-white'
              }

              return (
                <li key={oi}>
                  <button
                    type="button"
                    onClick={() => choose(oi)}
                    disabled={mode === 'instant' ? revealed : answers[index] !== null}
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${cls} disabled:cursor-default`}
                  >
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${badge}`}
                    >
                      {LETTERS[oi]}
                    </span>
                    {opt}
                    {showFeedback && isAnswer && (
                      <span className="ml-auto text-xs font-semibold text-green-600">Correct</span>
                    )}
                    {showFeedback && isSelected && !isAnswer && (
                      <span className="ml-auto text-xs font-semibold text-red-500">Your answer</span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>

          {showFeedback && (
            <div className="mt-5 rounded-xl bg-indigo-50 px-4 py-3 text-sm leading-6 text-indigo-900">
              <span className="font-semibold">Explanation: </span>
              {current.explanation}
            </div>
          )}

          {mode === 'end' && selected === null && (
            <p className="mt-4 text-xs text-slate-400">
              Select an answer to continue — no feedback until the end.
            </p>
          )}
          {mode === 'timed' && (
            <p className="mt-4 text-xs text-slate-400">
              Exam conditions — you will see your score and explanations after submitting.
            </p>
          )}

          <div className="mt-6 flex justify-end">
            {(mode === 'instant' ? revealed : selected !== null) && (
              <button
                type="button"
                onClick={next}
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                {index === quiz.length - 1 ? 'See results' : 'Next question'}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ---------------- Results ----------------
  const message = scoreMessage(pct)

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <span className="text-sm font-semibold text-indigo-600">Results</span>

      {expired && (
        <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700">
          Time's up — your answers were auto-submitted.
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-end gap-4">
        <span className="text-5xl font-extrabold tracking-tight text-slate-900">
          {score}
          <span className="text-3xl text-slate-400">/{quiz.length}</span>
        </span>
        <span className="text-2xl font-bold text-indigo-600">{pct}%</span>
      </div>
      <p className={`mt-2 text-sm font-medium ${message.tone}`}>{message.text}</p>

      <h2 className="mt-10 text-sm font-semibold text-slate-900">Review your answers</h2>
      <ol className="mt-4 space-y-4">
        {quiz.map((q, i) => {
          const correct = answers[i] === q.answer
          return (
            <li key={q.id} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium leading-6 text-slate-800">
                  <span className="mr-2 text-slate-400">{i + 1}.</span>
                  {q.question}
                </p>
                <span
                  className={`shrink-0 rounded-full px-2 py-1 text-xs font-semibold ${
                    correct ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
                  }`}
                >
                  {correct ? 'Correct' : 'Wrong'}
                </span>
              </div>

              {!correct && (
                <div className="mt-3 space-y-1 text-sm">
                  <p className="text-red-600">
                    Your answer: {answers[i] !== null ? `${LETTERS[answers[i]]} · ${q.options[answers[i]]}` : '— not answered'}
                  </p>
                  <p className="text-green-700">
                    Correct: {LETTERS[q.answer]} · {q.options[q.answer]}
                  </p>
                </div>
              )}

              <div className="mt-3 rounded-xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
                <span className="font-semibold text-slate-700">Explanation: </span>
                {q.explanation}
              </div>
            </li>
          )
        })}
      </ol>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={startQuiz}
          className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Try another {subject} quiz
        </button>
        <button
          type="button"
          onClick={restart}
          className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Change subject or settings
        </button>
        <Link
          to="/"
          className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-700"
        >
          Back home
        </Link>
      </div>
    </div>
  )
}
