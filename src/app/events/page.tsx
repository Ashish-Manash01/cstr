'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface Event {
  title: string
  description: string
  category: string
  image: string
}

/* ───────────────── Floating Particles ───────────────── */
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(18)].map((_, i) => (
      <motion.span
        key={i}
        className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
        initial={{
          x: Math.random() * 1200,
          y: Math.random() * 800,
        }}
        animate={{
          x: Math.random() * 1200,
          y: Math.random() * 800,
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 12 + Math.random() * 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    ))}
  </div>
)

/* ───────────────── Scroll Reveal Wrapper ───────────────── */
const Reveal = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  const categories = ['all', 'seminar', 'workshop', 'competition', 'networking', 'conference']

  /* ───────────── Event-specific chemical engineering images ───────────── */
  const staticEvents: Event[] = [
    {
      title: 'Chem-E-Athon',
      description: 'Solve chemical engineering problems under time pressure.',
      category: 'competition',
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    },
    {
      title: 'Chem-TechTalk Series',
      description: 'Guest lectures from industry experts and researchers.',
      category: 'seminar',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655',
    },
    {
      title: 'Chem-E-Drive',
      description: 'Reaction-powered vehicle design challenge.',
      category: 'competition',
      image: "https://images.unsplash.com/photo-1629904853716-f0bc54eea481",
    },
    {
      title: 'CHEM-IQ',
      description: 'Quiz on core chemical engineering concepts.',
      category: 'competition',
      image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933',
    },
    {
      title: 'ChemPitch',
      description: 'Pitch innovative chemical engineering ideas.',
      category: 'conference',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df',
    },
    {
      title: 'ChemExpress',
      description: 'Short talks on advanced chemical technologies.',
      category: 'seminar',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998',
    },
    {
      title: 'ChemBlueprint',
      description: 'Process flow diagrams & plant layout design.',
      category: 'workshop',
      image: 'https://images.unsplash.com/photo-1581090700227-1e37b190418e',
    },
    {
      title: 'ChemBridge Sessions',
      description: 'Bridging academia and chemical industries.',
      category: 'networking',
      image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786',
    },
    {
      title: 'ChemReconnect',
      description: 'Alumni–student interaction sessions.',
      category: 'networking',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
    },
    {
      title: 'In-Lab Battles',
      description: 'Hands-on chemical lab experiment challenges.',
      category: 'workshop',
      image: "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2",
    },
    {
      title: 'Chem-Hunt',
      description: 'Treasure hunt with chemical clues.',
      category: 'competition',
      image: 'https://images.unsplash.com/photo-1603575448878-868a20723f5d',
    },
    {
      title: 'Wizardry of Chemical Engineering',
      description: 'Science-based chemical demonstrations.',
      category: 'seminar',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655',
    },
  ]

  useEffect(() => {
    setTimeout(() => {
      setEvents(staticEvents)
      setLoading(false)
    }, 400)
  }, [])

  useEffect(() => {
    setFilteredEvents(
      selectedCategory === 'all'
        ? events
        : events.filter(e => e.category === selectedCategory)
    )
  }, [events, selectedCategory])

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 overflow-hidden">

      {/* ───────────── HERO ───────────── */}
      <section className="relative py-24 px-4 text-center">
        <FloatingParticles />

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          Events
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-gray-600 dark:text-gray-300"
        >
          Seminars · Workshops · Competitions · Networking
        </motion.p>
      </section>

      {/* ───────────── FILTERS ───────────── */}
      <section className="py-10 px-4 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-4 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-xl font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white scale-105'
                  : 'bg-white dark:bg-slate-800 border hover:scale-105'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ───────────── EVENT CARDS ───────────── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">

          {loading ? (
            <div className="text-center py-16">Loading events…</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredEvents.map((event, i) => (
                <Reveal key={i}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden flex flex-col"
                  >
                    <motion.img
                      src={event.image}
                      alt={event.title}
                      className="h-52 w-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />

                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-2xl font-bold mb-2">{event.title}</h3>

                      <p className="text-gray-600 dark:text-gray-400 mb-6 flex-1">
                        {event.description}
                      </p>

                      {/* 🔒 LEARN MORE NOT TOUCHED */}
                      <Link
                        href="/initiatives/workshops"
                        className="block text-center bg-gray-900 dark:bg-slate-700 text-white py-3 rounded-xl hover:opacity-90 transition"
                      >
                        Learn More
                      </Link>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
