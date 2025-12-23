'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'

interface Member {
  _id?: string
  name: string
  role: string
  category: 'leadership' | 'admin' | 'technical' | 'events' | 'general'
  linkedIn: string
  profileImage?: string
  bio?: string
  department?: string
}

export default function AdminMembersPage() {
  const router = useRouter()
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Member>({
    name: '',
    role: '',
    category: 'general',
    linkedIn: '',
    profileImage: '',
    bio: '',
    department: '',
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/auth/login')
      return
    }
    fetchMembers()
  }, [router])

  const fetchMembers = async () => {
    try {
      const response = await api.get('/members')
      if (response.data.success) {
        setMembers(response.data.data)
      }
    } catch (error) {
      console.error('Failed to fetch members:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingId) {
        // Update
        const response = await api.put(`/members/${editingId}`, formData)
        if (response.data.success) {
          setMembers(members.map(m => m._id === editingId ? response.data.data : m))
          setEditingId(null)
        }
      } else {
        // Create
        const response = await api.post('/members', formData)
        if (response.data.success) {
          setMembers([...members, response.data.data])
        }
      }
      resetForm()
      setShowForm(false)
    } catch (error) {
      console.error('Failed to save member:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this member?')) {
      try {
        const response = await api.delete(`/members/${id}`)
        if (response.data.success) {
          setMembers(members.filter(m => m._id !== id))
        }
      } catch (error) {
        console.error('Failed to delete member:', error)
      }
    }
  }

  const handleEdit = (member: Member) => {
    setFormData(member)
    setEditingId(member._id || null)
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      role: '',
      category: 'general',
      linkedIn: '',
      profileImage: '',
      bio: '',
      department: '',
    })
    setEditingId(null)
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Manage Members</h1>
          <button
            onClick={() => {
              resetForm()
              setShowForm(!showForm)
            }}
            className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition"
          >
            {showForm ? 'Cancel' : 'Add Member'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit Member' : 'Add New Member'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
                <input
                  type="text"
                  placeholder="Role (e.g., President, Secretary)"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                >
                  <option value="leadership">Leadership</option>
                  <option value="admin">Admin Core</option>
                  <option value="technical">Technical Team</option>
                  <option value="events">Events Team</option>
                  <option value="general">General Members</option>
                </select>

                <input
                  type="text"
                  placeholder="Department (e.g., Chemical Engineering)"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                />
              </div>

              <input
                type="url"
                placeholder="LinkedIn URL"
                value={formData.linkedIn}
                onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />

              <input
                type="url"
                placeholder="Profile Image URL (optional)"
                value={formData.profileImage}
                onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />

              <textarea
                placeholder="Bio (optional)"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition"
                >
                  {editingId ? 'Update' : 'Add'} Member
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetForm()
                    setShowForm(false)
                  }}
                  className="bg-gray-300 text-gray-700 font-bold py-2 px-6 rounded-lg hover:opacity-90 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Members List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Department</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">{member.name}</td>
                  <td className="px-6 py-4">{member.role}</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {member.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">{member.department || '-'}</td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(member)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member._id!)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {members.length === 0 && (
            <div className="text-center py-12 text-gray-600">
              No members yet. Add one to get started!
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
