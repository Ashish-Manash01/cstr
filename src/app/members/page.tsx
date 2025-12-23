'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { parseCSV, Member, categorizeMembersData } from '@/lib/csvParser'

interface CategorizedMembers {
  [key: string]: Member[]
}

export default function MembersPage() {
  const [categorized, setCategorized] = useState<CategorizedMembers>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const data = await parseCSV()
        const categorizedData = categorizeMembersData(data)
        setCategorized(categorizedData)
      } catch (error) {
        console.error('Failed to load members:', error)
      } finally {
        setLoading(false)
      }
    }

    loadMembers()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <p className="text-lg text-gray-700 dark:text-gray-300">Loading members...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 py-16 px-4 text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Our Team
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-2">
            Meet the {Object.values(categorized).reduce((sum, arr) => sum + arr.length, 0)} dedicated members of CSTR who are driving innovation and collaboration
          </p>
        </div>

        {/* Categorized Sections */}
        {Object.values(categorized).reduce((sum, arr) => sum + arr.length, 0) === 0 ? (
          <div className="text-center py-12 bg-gray-100 dark:bg-slate-800 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400">No members found</p>
          </div>
        ) : (
          <div className="space-y-16">
            {['Faculty', 'Core Team', 'Technical Team', 'Events Team'].map((category) => {
              const members = categorized[category as keyof typeof categorized] || []
              if (members.length === 0) return null

              return (
                <div key={category}>
                  {/* Category Header */}
                  <div className="mb-10">
                    <div className="flex items-center gap-4 mb-4">
                      <h2 className="text-4xl font-bold">{category}</h2>
                      <div className="flex-1 h-1 bg-gradient-to-r from-primary to-secondary rounded"></div>
                      <span className="text-2xl font-semibold text-primary">{members.length}</span>
                    </div>
                    <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded"></div>
                  </div>

                  {/* Members Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {members.map((member, idx) => (
                      <div
                        key={idx}
                        className="group bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 overflow-hidden border border-gray-200 dark:border-slate-700"
                      >

                        {/* Profile Image */}
                        <div className="h-72 overflow-hidden bg-gray-200 dark:bg-slate-700">
                          {member.profileImage ? (
                            <img
                              src={member.profileImage}
                              alt={member.name}
                              className="w-full h-full object-cover object-top"
                              onError={(e) => {
                                ;(e.target as HTMLImageElement).src = '/avatar.png'
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-primary">
                              {member.name.charAt(0)}
                            </div>
                          )}
                        </div>

                        {/* LinkedIn ID Below Image */}
                        {member.linkedIn && (
                          <div className="px-6 py-3 bg-blue-50 dark:bg-slate-700 border-b border-gray-200 dark:border-slate-600">
                            <p className="text-xs text-gray-600 dark:text-gray-300 font-semibold break-words">
                              LinkedIn: <a
                                href={member.linkedIn}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline font-bold"
                              >
                                {member.linkedIn.split('/').filter(p => p).pop() || 'Profile'}
                              </a>
                            </p>
                          </div>
                        )}

                        {/* Member Info */}
                        <div className="p-6 flex flex-col h-full">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                            <p className="text-primary font-semibold text-sm">{member.role}</p>
                          </div>

                          {/* LinkedIn Button */}
                          {member.linkedIn && (
                            <a
                              href={member.linkedIn}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-3 rounded-lg hover:shadow-lg transition font-semibold"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                              </svg>
                              LinkedIn
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* CTA */}
        <div className="mt-20 bg-gradient-to-br from-primary via-blue-600 to-secondary text-white rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Want to Join CSTR?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            We’re always looking for passionate students who want to make a difference.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary font-bold px-8 py-3 rounded-lg hover:scale-110 transition"
          >
            Get In Touch
          </Link>
        </div>

      </div>
    </main>
  )
}
