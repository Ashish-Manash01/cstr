'use client'

import { useEffect, useState } from "react"
import Link from "next/link"

export default function Home() {

  // typing effect
  const fullText =
    "Chemical Engineering Forum for Science Technology & Research"

  const [text, setText] = useState("")

  useEffect(() => {
    let i = 0
    const typing = setInterval(() => {
      setText(fullText.slice(0, i + 1))
      i++
      if (i === fullText.length) clearInterval(typing)
    }, 55)

    return () => clearInterval(typing)
  }, [])

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">

      {/* HERO */}
      <section className="relative py-32 text-white overflow-hidden">

        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://media.licdn.com/dms/image/v2/D5622AQFbxfaFchHcxA/feedshare-shrink_2048_1536/B56Zjko2ZhHkAw-/0/1756182951326?e=1769040000&v=beta&t=-OGPhLKey0fUm4CYmoCs3Qe8b9VPFIR8HXC2FQoOTSY"
            alt="CSTR Background"
            className="w-full h-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-blue-800/70 to-blue-700/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">

          <div className="mb-4">
            <p className="text-sm font-semibold mb-2">
              National Institute of Technology Karnataka (NITK)
            </p>

            <p className="text-sm mb-4">
              Department of Chemical Engineering
            </p>
          </div>

          <h1 className="text-6xl font-bold mb-4">
            CSTR
          </h1>

          <h2 className="text-3xl font-semibold mb-6">
            {text}
            <span className="animate-pulse">|</span>
          </h2>

          <p className="text-xl mb-8 max-w-2xl">
            Igniting the Future of Chemical Engineering at NITK Surathkal
          </p>

          {/* Get Involved → EVENTS PAGE */}
          <Link
            href="/events"
            className="bg-yellow-400 dark:bg-yellow-500 text-gray-900 font-bold py-4 px-10 rounded-lg hover:shadow-2xl hover:shadow-yellow-400/60 transition transform hover:scale-110 border-2 border-white/20 hover:border-white/50"
          >
            🚀 Get Involved
          </Link>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center text-primary dark:text-blue-400">
            About CSTR
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border-l-4 border-primary">
              <h3 className="text-2xl font-semibold mb-4 text-primary dark:text-blue-400">
                🎯 Our Vision
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                CSTR is a platform dedicated to fostering innovation, research, and professional development
                in chemical engineering. We bridge the gap between academia and industry, providing our members
                with opportunities for mentorship, networking, and growth.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border-l-4 border-secondary">
              <h3 className="text-2xl font-semibold mb-4 text-secondary dark:text-yellow-400">
                💡 Our Mission
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To create an inclusive community where chemical engineers can collaborate, innovate, and
                contribute to technological advancement. We believe in fostering excellence through knowledge
                sharing, research initiatives, and industry partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-primary dark:text-blue-400">
            What We Offer
          </h2>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-8 rounded-xl border-t-4 border-primary shadow-lg">
            <div className="text-5xl mb-4">🤝</div>
            <h3 className="text-xl font-bold mb-3 text-primary dark:text-blue-300">Mentorship</h3>
            <p>Connect with industry experts and experienced seniors</p>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/30 p-8 rounded-xl border-t-4 border-secondary shadow-lg">
            <div className="text-5xl mb-4">🎓</div>
            <h3 className="text-xl font-bold mb-3 text-secondary dark:text-yellow-300">Guest Lectures</h3>
            <p>Learn from renowned professionals in the field</p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/30 p-8 rounded-xl border-t-4 border-accent shadow-lg">
            <div className="text-5xl mb-4">🔬</div>
            <h3 className="text-xl font-bold mb-3 text-accent dark:text-green-300">Research Projects</h3>
            <p>Collaborate on cutting-edge research initiatives</p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/30 p-8 rounded-xl border-t-4 border-purple-600 shadow-lg">
            <div className="text-5xl mb-4">🌐</div>
            <h3 className="text-xl font-bold mb-3 text-purple-600 dark:text-purple-300">Networking</h3>
            <p>Build connections with peers and professionals</p>
          </div>
        </div>
      </div>
      </section>

      {/* UPCOMING EVENTS (FULLY RESTORED) */}
      <section className="py-16 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-4xl font-bold mb-12 text-center text-primary dark:text-blue-400">
            Upcoming Events
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border-t-4 border-primary">
              <div className="bg-gradient-to-r from-primary to-blue-600 text-white p-4 rounded-lg mb-4 font-bold text-lg">
                📅 JAN 15
              </div>
              <h3 className="text-xl font-bold mb-3">Industry Seminar</h3>
              <p className="mb-4">
                Learn about the latest trends in chemical engineering
              </p>
              <a className="text-primary dark:text-blue-400 font-semibold">
                Learn more →
              </a>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border-t-4 border-secondary">
              <div className="bg-gradient-to-r from-secondary to-yellow-600 text-white p-4 rounded-lg mb-4 font-bold text-lg">
                📅 JAN 22
              </div>
              <h3 className="text-xl font-bold mb-3">Research Workshop</h3>
              <p className="mb-4">
                Hands-on workshop on research methodologies
              </p>
              <a className="text-primary dark:text-blue-400 font-semibold">
                Learn more →
              </a>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border-t-4 border-accent">
              <div className="bg-gradient-to-r from-accent to-green-600 text-white p-4 rounded-lg mb-4 font-bold text-lg">
                📅 FEB 05
              </div>
              <h3 className="text-xl font-bold mb-3">Networking Social</h3>
              <p className="mb-4">
                Connect with fellow members and professionals
              </p>
              <a className="text-primary dark:text-blue-400 font-semibold">
                Learn more →
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* REGISTER CTA */}
      <section className="bg-gradient-to-r from-primary to-secondary dark:from-blue-900 dark:to-yellow-900 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">
            Join CSTR Today
          </h2>

          <p className="text-xl mb-8">
            Become part of a vibrant community dedicated to advancing chemical engineering
          </p>

          <Link
            href="/support"
            className="bg-white dark:bg-slate-800 text-primary dark:text-yellow-400 font-bold py-3 px-8 rounded-lg hover:scale-105 hover:shadow-xl transition"
          >
            Register Now
          </Link>
        </div>
      </section>

    </main>
  )
}
