'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Event {
  title: string
  description: string
  category: string
  image: string
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  const categories = ['all', 'seminar', 'workshop', 'competition', 'networking', 'conference']

  const staticEvents: Event[] = [
    {
      title: "Chem-E-Athon",
      description: "Solve chemical engineering-based tasks in a race against time.",
      category: "competition",
      image: "https://images.unsplash.com/photo-1509223197845-458d87318791"
    },
    {
      title: "Chem-TechTalk Series",
      description: "Guest lectures from industry and academia.",
      category: "seminar",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
    },
    {
      title: "Chem-E-Drive",
      description: "Design vehicles powered entirely by chemical reactions.",
      category: "competition",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c"
    },
    {
      title: "CHEM-IQ",
      description: "Quiz competition focused on chemical engineering concepts.",
      category: "competition",
      image: "https://images.unsplash.com/photo-1509223197845-458d87318791"
    },
    {
      title: "ChemPitch",
      description: "Pitch innovative chemical engineering solutions and ideas.",
      category: "conference",
      image: "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2"
    },
    {
      title: "ChemExpress",
      description: "Short insightful talks on advanced tech.",
      category: "seminar",
      image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7"
    },
    {
      title: "ChemBlueprint",
      description: "Design process flow diagrams and plant layouts.",
      category: "workshop",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba"
    },
    {
      title: "ChemBridge Sessions",
      description: "Sessions bridging academia and industry.",
      category: "networking",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
    },
    {
      title: "ChemReconnect",
      description: "Reconnecting alumni with students.",
      category: "networking",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692"
    },
    {
      title: "In-Lab Battles",
      description: "Creative lab experiment challenges.",
      category: "workshop",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
    },
    {
      title: "Chem-Hunt",
      description: "Treasure hunt filled with chemical puzzles.",
      category: "competition",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba"
    },
    {
      title: "Wizardry of Chemical Engineering",
      description: "Magic show powered by science.",
      category: "seminar",
      image: "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2"
    },
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

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100">

      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-10"></div>

        <div className="max-w-4xl mx-auto relative">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Events</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Discover seminars, workshops, competitions and more
          </p>
        </div>
      </section>

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
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-10">Loading events…</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden flex flex-col"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-48 w-full object-cover"
                  />

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">
                      {event.description}
                    </p>

                    <Link
                      href="/initiatives/workshops"
                      className="w-full block text-center bg-gray-900 dark:bg-slate-700 text-white py-2 rounded-lg hover:opacity-90 transition mt-auto"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
