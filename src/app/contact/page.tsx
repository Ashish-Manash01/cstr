'use client'

import { useState } from 'react'
import { useTheme } from '@/lib/theme-provider'
import api from '@/lib/api'

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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Send message to backend
      const response = await api.post('/messages', formData)
      
      if (response.data.success) {
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setSubmitted(false)
        }, 3000)
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary dark:from-blue-900 dark:to-yellow-900 opacity-10"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">We'd love to hear from you. Drop us a message anytime!</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
              
              {submitted ? (
                <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 text-green-800 dark:text-green-200 px-4 py-3 rounded-lg mb-6">
                  ✓ {submitted} Message received! We'll get back to you soon.
                </div>
              ) : null}

              {error && (
                <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg mb-6">
                  ✗ {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary dark:focus:ring-secondary outline-none transition"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary dark:focus:ring-secondary outline-none transition"
                    placeholder="your@email.com"
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
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary dark:focus:ring-secondary outline-none transition"
                    placeholder="Subject"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary dark:focus:ring-secondary outline-none transition"
                    placeholder="Your message..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-secondary dark:from-blue-600 dark:to-yellow-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Office Location */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-lg border-l-4 border-primary hover:shadow-lg transition">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  📍 Office Location
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>CSTR Office</strong>
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Department of Chemical Engineering<br />
                  National Institute of Technology Karnataka (NITK)<br />
                  Surathkal, Mangalore - 575025<br />
                  Karnataka, India
                </p>
              </div>

              {/* Contact Details */}
              <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-lg border-l-4 border-accent hover:shadow-lg transition">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  ✉️ Contact Details
                </h3>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    <strong>Email:</strong><br />
                    <a href="mailto:cstr@nitk.edu.in" className="text-primary dark:text-secondary hover:underline">
                      cstr@nitk.edu.in
                    </a>
                  </p>
                  <p>
                    <strong>Office Hours:</strong><br />
                    Monday - Friday: 10:00 AM - 5:00 PM
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-purple-50 dark:bg-purple-900/20 p-8 rounded-lg border-l-4 border-purple-600 hover:shadow-lg transition">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  🔗 Connect With Us
                </h3>
                <div className="space-y-3">
                  <a href="https://www.linkedin.com/company/cstr-nitk/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition">
                    <span className="mr-3">🔗</span> LinkedIn Company
                  </a>
                  <a href="https://www.youtube.com/@CSTR_NITK" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition">
                    <span className="mr-3">📺</span> YouTube Channel
                  </a>
                  <a href="mailto:cstr@nitk.edu.in" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition">
                    <span className="mr-3">✉️</span> Email
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-8 rounded-lg border-l-4 border-secondary hover:shadow-lg transition">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  🔗 Quick Links
                </h3>
                <div className="space-y-2">
                  <a href="https://www.nitk.ac.in/" target="_blank" rel="noopener noreferrer" className="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition">
                    → NITK Surathkal
                  </a>
                  <a href="https://chemical.nitk.ac.in/" target="_blank" rel="noopener noreferrer" className="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition">
                    → Chemical Engineering Department
                  </a>
                  <a href="/members" className="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition">
                    → Meet Our Team
                  </a>
                  <a href="/" className="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition">
                    → Back to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">Find Us On The Map</h2>
          <div className="bg-gray-200 dark:bg-slate-700 rounded-lg overflow-hidden shadow-lg h-96">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.4625599999997!2d74.79269!3d13.18056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbdeb88e6e6e6e7%3A0x3bbdeb88e6e6e6e7!2sNational%20Institute%20of%20Technology%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                q: "How can I become a member of CSTR?",
                a: "You can join CSTR by filling out the membership form on our website or contacting us directly at cstr@nitk.ac.in. We welcome all students from any department!"
              },
              {
                q: "What are the membership benefits?",
                a: "Members get access to exclusive events, workshops, networking opportunities, research projects, and industry connections. Plus, priority registration for competitions!"
              },
              {
                q: "Do I need to be from Chemical Engineering department?",
                a: "No! While CSTR is primarily for Chemical Engineering students, we welcome interested students from all disciplines to participate in our events."
              },
              {
                q: "How often are events organized?",
                a: "We organize events regularly - typically 2-3 events per month including seminars, workshops, competitions, and networking sessions."
              },
              {
                q: "Can companies reach out for recruiting?",
                a: "Absolutely! We have strong industry partnerships. Companies can contact us at cstr@nitk.ac.in for recruitment drives and internship programs."
              },
              {
                q: "How can I contribute to CSTR?",
                a: "We welcome contributions in various forms - organizing events, conducting research, writing articles, designing, or simply spreading the word about CSTR!"
              }
            ].map((faq, index) => (
              <details key={index} className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-gray-200 dark:border-slate-700 cursor-pointer hover:shadow-lg transition">
                <summary className="font-bold text-lg text-gray-900 dark:text-white">
                  {faq.q}
                </summary>
                <p className="text-gray-700 dark:text-gray-300 mt-4">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
