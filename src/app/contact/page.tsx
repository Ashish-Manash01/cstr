'use client'

import { useState } from 'react'
import { useTheme } from '@/lib/theme-provider'

export default function Contact() {
  const { theme } = useTheme()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (data.success) {
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setSubmitted(false), 3000)
      } else setError('Failed to send message.')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100">

      {/* HERO */}
      <section className="py-20 px-4 border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-4">Get in touch</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We’d love to hear from you.
          </p>
        </div>
      </section>

      {/* MAIN */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[3fr_2fr] gap-12 items-start">

          {/* FORM */}
          <div className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-2xl p-10 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>

            {submitted && (
              <div className="mb-6 rounded-lg border border-green-500 bg-green-50 dark:bg-green-900/20 p-4">
                Message received. We’ll get back to you soon.
              </div>
            )}

            {error && (
              <div className="mb-6 rounded-lg border border-red-500 bg-red-50 dark:bg-red-900/20 p-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-semibold bg-primary text-white hover:opacity-90 transition"
              >
                {loading ? 'Sending…' : 'Send message'}
              </button>
            </form>
          </div>

          {/* INFO COLUMN */}
          <div className="space-y-8">

            {/* OFFICE */}
            <div className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Office location</h3>

              <a
                href="https://www.google.co.in/maps/dir//2Q6W%2BCGX+Department+of+Chemical+Engineering,+NH+66,+Srinivasnagar,+Surathkal,+Mangaluru,+Karnataka+575025"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-primary hover:underline leading-relaxed"
              >
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  CSTR Office
                </span><br />
                Department of Chemical Engineering<br />
                National Institute of Technology Karnataka (NITK)<br />
                Surathkal, Mangalore – 575025<br />
                Karnataka, India
              </a>
            </div>

            {/* CONTACT */}
            <div className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Contact details</h3>

              <p className="mb-3">
                <strong>Email:</strong><br />
                <a href="mailto:cstr@nitk.edu.in" className="text-primary hover:underline">
                  cstr@nitk.edu.in
                </a>
              </p>

              <p>
                <strong>Office hours:</strong><br />
                Monday – Friday: 10:00 AM – 5:00 PM
              </p>
            </div>

            {/* QUICK LINKS */}
            <div className="bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-4">Quick links</h3>

              <div className="space-y-2">
                <a
                  href="https://www.nitk.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary hover:underline"
                >
                  NITK Surathkal
                </a>

                <a
                  href="https://chemical.nitk.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary hover:underline"
                >
                  Chemical Engineering Department
                </a>

                <a href="/members" className="block text-primary hover:underline">
                  Meet our team
                </a>

                <a href="/" className="block text-primary hover:underline">
                  Back to home
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 🌊 WATER WAVE SECTION */}
      <section className="relative overflow-hidden">
        <div className="h-24 bg-gradient-to-b from-transparent to-blue-200 dark:to-slate-800"></div>

        <div className="wave absolute bottom-0 left-0 w-full h-20"></div>

        <style jsx>{`
          .wave {
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.29,22.43,103.78,29.75,158,17.39C230,48,284,14,339,6.61c54-7.55,110,5.29,162,22.49,63,20.87,127,46.31,190,39.17C776,61,838,25,902,13.19c43-7.75,87-5.49,131,2.92V0Z' opacity='.25' fill='%234f46e5'/%3E%3Cpath d='M0,0V15.81C47.42,36.86,103.8,47.63,158,39.27,230,27.36,284-1.3,339,0.4c54,1.67,110,25.68,162,39.48,63,16.73,127,21.22,190,6.31,84-19.86,146-68.14,210-81.25,43-8.87,87-6.66,131,1.74V0Z' opacity='.5' fill='%234f46e5'/%3E%3Cpath d='M0,0V5.63C47.35,30,103.77,54.14,158,51.55,230,47.71,284,14,339,6.41c54-7.48,110,8.51,162,25.7,63,20.9,127,42.45,190,36.65,84-8.48,146-55.21,210-70.3,43-9.87,87-9.75,131-3.76V0Z' fill='%234f46e5'/%3E%3C/svg%3E");
            background-size: 200% 100%;
            animation: waveMove 8s linear infinite;
          }

          @keyframes waveMove {
            0% { background-position-x: 0; }
            100% { background-position-x: -200%; }
          }
        `}</style>
      </section>
    </main>
  )
}
