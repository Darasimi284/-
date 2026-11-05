import { useEffect, useState } from 'react'

const STORAGE_KEY = 'jambprep-timetable-v1'

function loadEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function useSchedule() {
  const [entries, setEntries] = useState(loadEntries)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
    } catch {
      // storage unavailable — schedule still works for this session
    }
  }, [entries])

  function add({ subject, day, time }) {
    setEntries((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        subject,
        day,
        time,
        done: false,
      },
    ])
  }

  function toggle(id) {
    setEntries((prev) => prev.map((entry) => (entry.id === id ? { ...entry, done: !entry.done } : entry)))
  }

  function remove(id) {
    setEntries((prev) => prev.filter((entry) => entry.id !== id))
  }

  function clear() {
    setEntries([])
  }

  const completed = entries.filter((entry) => entry.done).length

  return { entries, add, toggle, remove, clear, completed }
}
