'use client'

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

export default function SupportPage() {

  const sectionsRef = useRef<HTMLDivElement[]>([])

  const setRef = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el)
    }
  }

  // 👇 Typing effect
  const fullText = "Support CSTR"
  const [text, setText] = useState("")

  useEffect(() => {
    let i = 0

    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1))
      i++

      if (i === fullText.length) clearInterval(interval)
    }, 90)

    return () => clearInterval(interval)
  }, [])

  // reveal sections as you scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0")
          }
        })
      },
      { threshold: 0.2 }
    )

    sectionsRef.current.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 py-16 px-4">
      <div className="max-w-4xl mx-auto">

        {/* ✨ Typing effect heading */}
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
          {text}
          <span className="animate-pulse">|</span>
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
          Every contribution directly strengthens events, research, innovation and
          student development at NITK. Choose how you’d like to support below.
        </p>

        {/* SECTION 1 */}
        <section
          ref={setRef}
          className="opacity-0 translate-y-6 transition-all duration-700 mb-10 p-6 rounded-2xl border bg-gray-50 dark:bg-slate-800"
        >
          <h2 className="text-2xl font-semibold mb-2">🎓 Student Support</h2>
          <p className="text-sm mb-4 text-gray-600 dark:text-gray-300">
            Help students with competitions, scholarships, learning resources and mentoring.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded">
            Contribute
          </button>
        </section>

        {/* SECTION 2 */}
        <section
          ref={setRef}
          className="opacity-0 translate-y-6 transition-all duration-700 mb-10 p-6 rounded-2xl border bg-gray-50 dark:bg-slate-800"
        >
          <h2 className="text-2xl font-semibold mb-2">🛠️ Events & Workshops</h2>
          <p className="text-sm mb-4 text-gray-600 dark:text-gray-300">
            Fund hands-on workshops, expert talks, hackathons and industrial visits.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded">
            Contribute
          </button>
        </section>

        {/* SECTION 3 */}
        <section
          ref={setRef}
          className="opacity-0 translate-y-6 transition-all duration-700 mb-10 p-6 rounded-2xl border bg-gray-50 dark:bg-slate-800"
        >
          <h2 className="text-2xl font-semibold mb-2">🔬 Research & Projects</h2>
          <p className="text-sm mb-4 text-gray-600 dark:text-gray-300">
            Support impactful research, prototypes and real-world engineering projects.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded">
            Contribute
          </button>
        </section>

        {/* FAQ */}
        <div className="mt-14 space-y-4">
          <details className="border rounded-lg p-4 bg-gray-50 dark:bg-slate-800">
            <summary className="cursor-pointer font-medium">
              Where does my support go?
            </summary>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Funds are strictly used for student activities, events, research and learning.
            </p>
          </details>

          <details className="border rounded-lg p-4 bg-gray-50 dark:bg-slate-800">
            <summary className="cursor-pointer font-medium">
              Can I sponsor a specific activity?
            </summary>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Yes — reach out to us and we’ll coordinate with you.
            </p>
          </details>
        </div>

        {/* CONTACT CTA */}
        <div className="mt-12 p-6 rounded-2xl border bg-gradient-to-r from-blue-600 to-teal-500 text-white">
          <h3 className="text-xl font-semibold mb-2">Have questions?</h3>
          <p className="mb-4 text-sm opacity-90">
            We’d love to talk about collaboration, sponsorships or ideas.
          </p>

          <Link href="/contact">
            <span className="inline-block bg-white text-gray-900 px-5 py-2 rounded font-medium">
              Contact Us
            </span>
          </Link>
        </div>
      </div>
    </main>
  )
}
