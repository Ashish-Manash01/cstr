'use client'

import { useEffect, useState } from 'react'

interface Event {
  title: string
  description: string
  category: string
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [showComingSoon, setShowComingSoon] = useState(false)

  const categories = ['all', 'seminar', 'workshop', 'competition', 'networking', 'conference']

  // Static events from document
  const staticEvents: Event[] = [
    { title: "Chem-E-Athon", description: "Solve chemical engineering-based tasks in a race against time.", category: "competition" },
    { title: "Chem-TechTalk Series", description: "Guest lectures from industry and academia.", category: "seminar" },
    { title: "Chem-E-Drive", description: "Design vehicles powered entirely by chemical reactions.", category: "competition" },
    { title: "CHEM-IQ", description: "Quiz competition focused on chemical engineering concepts.", category: "competition" },
    { title: "ChemPitch", description: "Pitch innovative chemical engineering solutions and ideas.", category: "conference" },
    { title: "ChemExpress", description: "Short insightful talks on advanced tech.", category: "seminar" },
    { title: "ChemBlueprint", description: "Design process flow diagrams and plant layouts.", category: "workshop" },
    { title: "ChemBridge Sessions", description: "Sessions bridging academia and industry.", category: "networking" },
    { title: "ChemReconnect", description: "Reconnecting alumni with students.", category: "networking" },
    { title: "In-Lab Battles", description: "Creative lab experiment challenges.", category: "workshop" },
    { title: "Chem-Hunt", description: "Treasure hunt filled with chemical puzzles.", category: "competition" },
    { title: "Wizardry of Chemical Engineering", description: "Magic show powered by science.", category: "seminar" },
  ]

  useEffect(() => {
    setTimeout(() => {
      setEvents(staticEvents)
      setLoading(false)
    }, 400)
  }, [])

  useEffect(() => {
    if (selectedCategory === 'all') setFilteredEvents(events)
    else setFilteredEvents(events.filter(e => e.category === selectedCategory))
  }, [events, selectedCategory])

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      seminar: '🎤',
      workshop: '🛠️',
      competition: '🏆',
      networking: '🤝',
      conference: '🏢'
    }
    return icons[category] || '📅'
  }

  // 🎨 CATEGORY-BASED BACKGROUND DESIGNS
  const getCategoryBackground = (category: string) => {
    switch (category) {
      case 'seminar':
        return 'from-blue-500 via-indigo-600 to-blue-800'
      case 'workshop':
        return 'from-green-500 via-emerald-600 to-green-800'
      case 'competition':
        return 'from-purple-600 via-fuchsia-600 to-purple-900'
      case 'networking':
        return 'from-yellow-400 via-amber-500 to-orange-600'
      case 'conference':
        return 'from-red-500 via-rose-600 to-red-800'
      default:
        return 'from-gray-400 via-gray-500 to-gray-700'
    }
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100">

      {/* HERO */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-10"></div>

        <div className="max-w-4xl mx-auto relative">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Events</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Discover seminars, workshops, competitions and more
          </p>
        </div>
      </section>

      {/* FILTER */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Filter by Category</h2>

          <div className="flex flex-wrap gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-lg font-medium transition hover:scale-105 ${
                  selectedCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-slate-700 border'
                }`}
              >
                {cat === 'all' ? '📅 All Events' : `${getCategoryIcon(cat)} ${cat}`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">

          {loading ? (
            <div className="text-center py-10">Loading events…</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {filteredEvents.map((event, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">

                  {/* AI-style header */}
                  <div className={`h-44 relative bg-gradient-to-br ${getCategoryBackground(event.category)}`}>
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,white,transparent)]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-7xl drop-shadow-2xl">{getCategoryIcon(event.category)}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>

                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {event.description}
                    </p>

                    <button
                      onClick={() => setShowComingSoon(true)}
                      className="w-full bg-gray-900 dark:bg-slate-700 text-white py-2 rounded-lg hover:opacity-90 transition"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* POPUP */}
      {showComingSoon && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl max-w-md text-center">
            <h2 className="text-3xl font-bold mb-4">🚧 Coming Soon</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Event details and registration will be available shortly.
            </p>
            <button
              onClick={() => setShowComingSoon(false)}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:scale-105 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
