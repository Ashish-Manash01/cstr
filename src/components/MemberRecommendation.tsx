'use client'

import { useEffect, useState } from 'react'
import api from '@/lib/api'

interface Member {
  _id: string
  name: string
  role: string
  category: string
  linkedIn: string
  profileImage?: string
}

export default function MemberRecommendation() {
  const [recommendedMembers, setRecommendedMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: '🎯 All Members', value: '' },
    { id: 'leadership', label: '🎓 Faculty', value: 'leadership' },
    { id: 'admin', label: '⚙️ Admin Core', value: 'admin' },
    { id: 'technical', label: '💻 Technical', value: 'technical' },
    { id: 'events', label: '🎉 Events', value: 'events' },
  ]

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true)
        let url = '/members'
        if (selectedCategory !== 'all') {
          url += `?category=${selectedCategory}`
        }
        const response = await api.get(url)
        if (response.data.success) {
          // Shuffle and pick random members
          const shuffled = response.data.data.sort(() => Math.random() - 0.5)
          setRecommendedMembers(shuffled.slice(0, 3))
        }
      } catch (error) {
        console.error('Failed to fetch members:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMembers()
  }, [selectedCategory])

  return (
    <section className="py-12 px-4 bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-blue-900/20 dark:to-yellow-900/20 rounded-lg">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            🤖 AI-Powered Member Recommendations
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Meet team members who match your interests
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-full font-semibold transition transform hover:scale-105 ${
                selectedCategory === cat.value
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                  : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-700 hover:border-primary dark:hover:border-secondary'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Recommended Members */}
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">Loading recommendations...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {recommendedMembers.map(member => (
              <div
                key={member._id}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-lg hover:shadow-xl hover:transform hover:scale-105 transition duration-300 overflow-hidden border border-gray-100 dark:border-slate-700"
              >
                {/* Image */}
                <div className="bg-gradient-to-r from-primary to-secondary dark:from-blue-600 dark:to-yellow-600 h-48 flex items-center justify-center overflow-hidden">
                  {member.profileImage ? (
                    <img
                      src={member.profileImage}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center text-2xl font-bold text-primary dark:text-secondary">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary dark:text-secondary font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 inline-block px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded-full">
                    {member.category === 'leadership' && '🎓 Faculty'}
                    {member.category === 'admin' && '⚙️ Admin'}
                    {member.category === 'technical' && '💻 Technical'}
                    {member.category === 'events' && '🎉 Events'}
                    {member.category === 'general' && '👥 Operation Team'}
                  </p>
                  <a
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white bg-gradient-to-r from-primary to-secondary dark:from-blue-600 dark:to-yellow-600 px-3 py-1 rounded text-sm hover:shadow-lg transform hover:scale-105 transition"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                    </svg>
                    Profile
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            💡 Pro Tip: Filter by category to find members in your area of interest!
          </p>
        </div>
      </div>
    </section>
  )
}
