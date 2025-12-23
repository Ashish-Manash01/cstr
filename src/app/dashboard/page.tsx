'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'

interface User {
  id: string
  name: string
  email: string
  role: string
  department?: string
  year?: number
  bio?: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push('/auth/login')
          return
        }

        const response = await api.get('/auth/me')
        if (response.data.success) {
          setUser(response.data.data)
          setFormData({
            name: response.data.data.name,
            bio: response.data.data.bio || '',
          })
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
        router.push('/auth/login')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await api.put('/auth/me', formData)
      if (response.data.success) {
        setUser(response.data.data)
        setEditing(false)
      }
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto text-center">Loading...</div>
      </main>
    )
  }

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-primary">Welcome, {user.name}!</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>

          {/* User Info */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 text-sm">Name</p>
                <p className="text-xl font-semibold">{user.name}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Email</p>
                <p className="text-xl font-semibold">{user.email}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Role</p>
                <p className="text-xl font-semibold capitalize">{user.role}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Department</p>
                <p className="text-xl font-semibold">{user.department || 'N/A'}</p>
              </div>
              {user.year && (
                <div>
                  <p className="text-gray-600 text-sm">Year</p>
                  <p className="text-xl font-semibold">{user.year}</p>
                </div>
              )}
            </div>
          </div>

          {/* Edit Profile */}
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
            >
              Edit Profile
            </button>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-4 bg-gray-50 rounded-lg p-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:opacity-90 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-bold text-primary mb-4">Quick Links</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/events" className="bg-blue-50 border-l-4 border-primary p-4 rounded hover:shadow-md transition">
                <h3 className="font-semibold text-primary">View Events</h3>
                <p className="text-sm text-gray-600">Check upcoming events</p>
              </a>
              <a href="/members" className="bg-yellow-50 border-l-4 border-secondary p-4 rounded hover:shadow-md transition">
                <h3 className="font-semibold text-secondary">Members</h3>
                <p className="text-sm text-gray-600">View club members</p>
              </a>
              <a href="/about" className="bg-green-50 border-l-4 border-accent p-4 rounded hover:shadow-md transition">
                <h3 className="font-semibold text-accent">About CSTR</h3>
                <p className="text-sm text-gray-600">Learn about the club</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
