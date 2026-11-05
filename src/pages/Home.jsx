import { Link } from 'react-router-dom'
import { subjects } from '../data/subjects.js'

const stats = [
  { value: '50k+', label: 'Students preparing' },
  { value: '15k+', label: 'Past questions' },
  { value: '4.8/5', label: 'Average rating' },
]

const features = [
  {
    title: 'Real past questions',
    description: 'Every question is drawn from previous UTME papers with full answers and explanations.',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    title: 'Timed mock tests',
    description: 'Sit full-length CBT simulations under real exam conditions and build your speed.',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'Performance analytics',
    description: 'See exactly which topics are costing you marks and get a study plan that fixes them.',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  },
  {
    title: 'Study anywhere',
    description: 'Practise on your phone between classes. Your progress syncs automatically.',
    icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
  },
]

const steps = [
  {
    number: '01',
    title: 'Create your free account',
    description: 'Sign up in under a minute — no card required.',
  },
  {
    number: '02',
    title: 'Practice a little every day',
    description: 'Ten focused questions a day beats cramming the night before.',
  },
  {
    number: '03',
    title: 'Walk into the hall ready',
    description: 'Know your target score, track it, and hit it on exam day.',
  },
]

function FeatureCard({ feature }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
        </svg>
      </div>
      <h3 className="mt-4 text-base font-semibold text-slate-900">{feature.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{feature.description}</p>
    </div>
  )
}

function HeroCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60">
      <div className="flex items-center justify-between text-xs font-medium text-slate-400">
        <span>UTME Practice · Physics</span>
        <span className="rounded-full bg-amber-50 px-2 py-1 text-amber-600">Question 7 of 30</span>
      </div>

      <div className="mt-4 h-1.5 w-full rounded-full bg-slate-100">
        <div className="h-1.5 w-1/4 rounded-full bg-indigo-600"></div>
      </div>

      <p className="mt-5 text-sm font-medium leading-6 text-slate-800">
        A body of mass 2 kg is acted on by a force of 10 N. What is its acceleration?
      </p>

      <ul className="mt-4 space-y-2">
        {[
          { label: 'A', text: '2 m/s²', correct: false },
          { label: 'B', text: '5 m/s²', correct: true },
          { label: 'C', text: '20 m/s²', correct: false },
          { label: 'D', text: '0.2 m/s²', correct: false },
        ].map((option) => (
          <li
            key={option.label}
            className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm ${
              option.correct
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                : 'border-slate-200 text-slate-600'
            }`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                option.correct ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {option.label}
            </span>
            {option.text}
            {option.correct && <span className="ml-auto text-xs font-semibold text-indigo-600">Correct</span>}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs text-slate-400">Explanation shown after submission</span>
        <Link
          to="/practice"
          className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
        >
          Next question
        </Link>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-3 py-1 text-xs font-semibold text-indigo-700">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600"></span>
              UTME 2026 preparation
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Pass your UTME on the{' '}
              <span className="text-indigo-600">first attempt</span>
            </h1>

            <p className="mt-4 max-w-lg text-base leading-7 text-slate-600">
              Study with real past questions, practise under exam conditions, and watch your projected
              score climb — all in one place.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/practice"
                className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
              >
                Start practising free
              </Link>
              <Link
                to="/syllabus"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                View the syllabus
              </Link>
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-slate-200 pt-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-2xl font-bold text-slate-900">{stat.value}</dt>
                  <dd className="mt-1 text-xs leading-5 text-slate-500">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-indigo-200/40 blur-3xl"></div>
            <div className="relative">
              <HeroCard />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Everything you need to hit your target score
          </h2>
          <p className="mt-3 text-slate-500">Built around the way the UTME is actually marked.</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </section>

      {/* Subjects */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Every subject you'll be tested on</h2>
              <p className="mt-2 text-sm text-slate-500">Choose your combination and start with question one.</p>
            </div>
            <Link to="/past-questions" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
              Browse all past questions →
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {subjects.map((subject) => (
              <Link
                key={subject}
                to="/past-questions"
                state={{ subject }}
                className="rounded-xl border border-slate-200 bg-white px-4 py-5 text-center text-sm font-medium text-slate-700 transition-colors hover:border-indigo-300 hover:text-indigo-700"
              >
                {subject}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">How it works</h2>
          <p className="mt-3 text-slate-500">Three steps between you and your admission letter.</p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <span className="text-sm font-bold text-indigo-600">{step.number}</span>
              <div className="mt-3 h-px w-full bg-slate-200"></div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-indigo-600 px-6 py-12 text-center sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Your target score is one practice session away
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-indigo-100">
            Join 50,000+ students preparing smarter. Free to start, no credit card needed.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/practice"
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-sm transition-colors hover:bg-indigo-50"
            >
              Start practising free
            </Link>
            <Link
              to="/past-questions"
              className="rounded-xl border border-indigo-400 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              Browse past questions
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
