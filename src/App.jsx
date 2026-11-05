import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Practice from './pages/Practice.jsx'
import PastQuestions from './pages/PastQuestions.jsx'
import Syllabus from './pages/Syllabus.jsx'
import Timetable from './pages/Timetable.jsx'
import Schedule from './pages/Schedule.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="practice" element={<Practice />} />
        <Route path="past-questions" element={<PastQuestions />} />
        <Route path="syllabus" element={<Syllabus />} />
        <Route path="timetable" element={<Timetable />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
