import { biologyQuestions } from './biology.js'
import { chemistryQuestions } from './chemistry.js'
import { englishQuestions } from './english.js'
import { mathematicsQuestions } from './mathematics.js'
import { physicsQuestions } from './physics.js'

export const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]

export const questions = [
  ...englishQuestions,
  ...mathematicsQuestions,
  ...physicsQuestions,
  ...chemistryQuestions,
  ...biologyQuestions,
]

export function getYearsFor(subject) {
  return [...new Set(questions.filter((q) => q.subject === subject).map((q) => q.year))].sort()
}
