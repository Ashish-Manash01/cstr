'use client'

import { useTheme } from '@/lib/theme-provider'
import Link from "next/link"


export default function About() {
  const { theme } = useTheme()

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary dark:from-blue-900 dark:to-yellow-900 opacity-10"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About CSTR</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">Chemical Engineering Forum for Science Technology & Research</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white dark:bg-slate-700 p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <h2 className="text-3xl font-bold mb-4 text-primary">Our Mission</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                CSTR aims to foster a vibrant community of chemical engineering students and professionals dedicated to advancing scientific knowledge and technological innovation.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>✓ Promote research and innovation in chemical engineering</li>
                <li>✓ Facilitate knowledge sharing and professional development</li>
                <li>✓ Bridge academia and industry for practical insights</li>
                <li>✓ Create networking opportunities for students and professionals</li>
              </ul>
            </div>

            {/* Vision */}
            <div className="bg-white dark:bg-slate-700 p-8 rounded-lg shadow-lg hover:shadow-xl transition">
              <h2 className="text-3xl font-bold mb-4 text-secondary">Our Vision</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                To become a leading platform for chemical engineering excellence, driving technological advancement and creating positive impact on society through research, innovation, and collaboration.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>✓ Excellence in technical knowledge and skills</li>
                <li>✓ Innovation and entrepreneurship in chemical processes</li>
                <li>✓ Sustainable and ethical engineering practices</li>
                <li>✓ Global perspective on chemical engineering challenges</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why CSTR */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Why Join CSTR?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-lg border-l-4 border-primary hover:transform hover:scale-105 transition">
              <div className="text-4xl mb-4">🔬</div>
              <h3 className="text-xl font-bold mb-3">Research & Innovation</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Access cutting-edge research projects and collaborate on innovative solutions to real-world chemical engineering challenges.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-lg border-l-4 border-accent hover:transform hover:scale-105 transition">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-3">Networking</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Connect with industry experts, professionals, and fellow students. Build relationships that last throughout your career.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-purple-50 dark:bg-purple-900/20 p-8 rounded-lg border-l-4 border-purple-600 hover:transform hover:scale-105 transition">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-3">Learning & Development</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Attend workshops, seminars, and training sessions to enhance your technical knowledge and professional skills.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-8 rounded-lg border-l-4 border-secondary hover:transform hover:scale-105 transition">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-3">Competitions & Events</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Participate in exciting technical competitions, case studies, and team challenges that test your skills and creativity.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-lg border-l-4 border-red-600 hover:transform hover:scale-105 transition">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-bold mb-3">Career Growth</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Get exposed to industry internships, placements, and career opportunities through our extensive network.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-lg border-l-4 border-indigo-600 hover:transform hover:scale-105 transition">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-bold mb-3">Sustainability</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Focus on sustainable chemical engineering practices and solutions for a better environmental future.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-secondary dark:from-blue-900 dark:to-yellow-900">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Join CSTR Today!</h2>
          <p className="text-xl mb-8 opacity-90">
            Be part of a vibrant community of innovators, researchers, and industry professionals.
          </p>
          <Link
            href="/support"
            className="inline-block bg-white dark:bg-slate-900 text-primary dark:text-secondary px-8 py-3 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition"
          > 
            Become a Member
          </Link>
        </div>
      </section>
    </main>
  )
}
