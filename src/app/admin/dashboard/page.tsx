'use client'

import { useEffect, useState } from 'react'
import { useTheme } from '@/lib/theme-provider'
import Link from 'next/link'

interface DashboardStats {
  totalUsers: number
  totalMessages: number
  users: any[]
  messages: any[]
}

export default function AdminDashboard() {
  const { theme } = useTheme()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch user and message stats (requires admin auth)
        const userRes = await fetch('http://localhost:5000/api/auth/stats', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        
        if (!userRes.ok) throw new Error('Unauthorized')
        
        const userData = await userRes.json()
        setStats(userData.data)
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-white transition-colors duration-300 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor users and messages</p>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg">Loading dashboard...</p>
          </div>
        ) : stats ? (
          <>
            {/* Stats Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {/* Users Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-8 rounded-lg border border-blue-200 dark:border-blue-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Total Users</h2>
                  <div className="text-4xl font-bold text-primary">{stats.totalUsers}</div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">Registered users who signed up</p>
              </div>

              {/* Messages Card */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-8 rounded-lg border border-green-200 dark:border-green-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Messages Received</h2>
                  <div className="text-4xl font-bold text-accent">{stats.totalMessages}</div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">Contact form submissions</p>
              </div>
            </div>

            {/* Users List */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Recent Users</h2>
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100 dark:bg-slate-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold">Signed Up</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                    {stats.users.length > 0 ? (
                      stats.users.map((user: any) => (
                        <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition">
                          <td className="px-6 py-4 text-sm">{user.email}</td>
                          <td className="px-6 py-4 text-sm">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="px-6 py-4 text-center text-gray-500">
                          No users yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Messages List */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Form Messages</h2>
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
                <div className="divide-y divide-gray-200 dark:divide-slate-700">
                  {stats.messages.length > 0 ? (
                    stats.messages.map((msg: any) => (
                      <div key={msg._id} className="p-6 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold">{msg.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{msg.email}</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            {new Date(msg.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="text-sm mb-2"><strong>Subject:</strong> {msg.subject}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{msg.message}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      No messages yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : null}

        {/* Back Link */}
        <div className="mt-8">
          <Link href="/" className="text-primary dark:text-secondary hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
