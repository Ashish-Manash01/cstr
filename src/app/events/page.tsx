'use client'

import { useEffect, useState } from 'react'
import { useTheme } from '@/lib/theme-provider'
import api from '@/lib/api'

interface Event {
  _id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  category: string
  image?: string
  maxCapacity?: number
  attendees?: string[]
}

export default function Events() {
  const { theme } = useTheme()
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  const categories = ['all', 'seminar', 'workshop', 'competition', 'networking', 'conference']

  useEffect(() => {
    fetchEvents()
  }, [])

  useEffect(() => {
    filterEvents()
  }, [events, selectedCategory])

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events')
      setEvents(response.data || [])
    } catch (error) {
      console.error('Error fetching events:', error)
      setEvents([])
    } finally {
      setLoading(false)
    }
  }

  const filterEvents = () => {
    if (selectedCategory === 'all') {
      setFilteredEvents(events)
    } else {
      setFilteredEvents(events.filter(event => event.category === selectedCategory))
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      seminar: 'blue',
      workshop: 'green',
      competition: 'purple',
      networking: 'yellow',
      conference: 'red'
    }
    return colors[category] || 'gray'
  }

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      seminar: '🎤',
      workshop: '🛠️',
      competition: '🏆',
      networking: '🤝',
      conference: '🏢'
    }
    return icons[category] || '📅'
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary dark:from-blue-900 dark:to-yellow-900 opacity-10"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Events</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">Discover and join our exciting events, seminars, workshops, and competitions</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-4 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Filter by Category</h2>
          <div className="flex flex-wrap gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-lg font-medium transition transform hover:scale-105 ${
                  selectedCategory === cat
                    ? 'bg-primary dark:bg-blue-600 text-white'
                    : 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-600 hover:shadow-lg'
                }`}
              >
                {cat === 'all' ? '📅 All Events' : getCategoryIcon(cat) + ' ' + cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">Loading events...</p>
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map(event => (
                <div
                  key={event._id}
                  className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:transform hover:scale-105 transition duration-300"
                >
                  {/* Event Image */}
                  <div className="h-48 bg-gradient-to-br from-primary to-secondary dark:from-blue-600 dark:to-yellow-600 flex items-center justify-center">
                    <span className="text-6xl">{getCategoryIcon(event.category)}</span>
                  </div>

                  {/* Event Details */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold text-white bg-${getCategoryColor(event.category)}-500`}>
                        {event.category}
                      </span>
                      <span className="text-2xl">{getCategoryIcon(event.category)}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{event.title}</h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    {/* Event Meta */}
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 mb-4">
                      <div className="flex items-center">
                        <span className="mr-2">📅</span>
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      {event.time && (
                        <div className="flex items-center">
                          <span className="mr-2">⏰</span>
                          <span>{event.time}</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <span className="mr-2">📍</span>
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                      {event.attendees && (
                        <div className="flex items-center">
                          <span className="mr-2">👥</span>
                          <span>{event.attendees.length} attending</span>
                        </div>
                      )}
                    </div>

                    {/* Register Button */}
                    <button className="w-full bg-gradient-to-r from-primary to-secondary dark:from-blue-600 dark:to-yellow-600 text-white font-bold py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-slate-800 rounded-lg">
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">No events found in this category</p>
              <button
                onClick={() => setSelectedCategory('all')}
                className="inline-block px-6 py-2 bg-primary dark:bg-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition"
              >
                View All Events
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Events Info */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-6">📢 Stay Updated!</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-3">Subscribe to Our Newsletter</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Never miss an event! Subscribe to get updates about upcoming seminars, workshops, and competitions.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
                  />
                  <button className="px-6 py-2 bg-primary dark:bg-blue-600 text-white font-bold rounded-lg hover:shadow-lg transition">
                    Subscribe
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3">Quick Links</h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li><a href="/members" className="hover:text-primary transition">→ Meet Our Team</a></li>
                  <li><a href="/about" className="hover:text-primary transition">→ About CSTR</a></li>
                  <li><a href="/contact" className="hover:text-primary transition">→ Contact Us</a></li>
                  <li><a href="https://chemical.nitk.ac.in/" className="hover:text-primary transition">→ Department Website</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">📸 Past Events Highlights</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-gray-100 dark:bg-slate-800 h-48 rounded-lg flex items-center justify-center hover:shadow-lg transition">
                <div className="text-center">
                  <span className="text-5xl mb-2 block">📷</span>
                  <p className="text-gray-600 dark:text-gray-400">Event #{item} Photo</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
