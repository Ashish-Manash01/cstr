'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/lib/theme-provider'
import api from '@/lib/api'

export default function UploadMemberPhotos() {
  const { theme } = useTheme()
  const router = useRouter()
  const [members, setMembers] = useState<any[]>([])
  const [selectedMember, setSelectedMember] = useState<string>('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleFetchMembers = async () => {
    try {
      const response = await api.get('/members')
      if (response.data.success) {
        setMembers(response.data.data)
      }
    } catch (error) {
      setMessage('Failed to fetch members')
      console.error(error)
    }
  }

  const handleUpdateImage = async () => {
    if (!selectedMember || !imageUrl) {
      setMessage('Please select a member and enter an image URL')
      return
    }

    setLoading(true)
    try {
      const response = await api.put(`/members/${selectedMember}`, {
        profileImage: imageUrl
      })
      
      if (response.data.success) {
        setMessage('✅ Photo updated successfully!')
        setImageUrl('')
        setSelectedMember('')
        setTimeout(() => setMessage(''), 3000)
      }
    } catch (error) {
      setMessage('Failed to update photo')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-white transition-colors duration-300 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Upload Member Photos</h1>

        {message && (
          <div className={`p-4 rounded-lg mb-6 ${message.includes('✅') ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'}`}>
            {message}
          </div>
        )}

        <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg space-y-6">
          {/* Step 1: Fetch Members */}
          <div>
            <button
              onClick={handleFetchMembers}
              className="w-full bg-primary dark:bg-blue-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition"
            >
              Load Members
            </button>
          </div>

          {/* Step 2: Select Member */}
          {members.length > 0 && (
            <div>
              <label className="block text-sm font-medium mb-2">Select Member:</label>
              <select
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
              >
                <option value="">Choose a member...</option>
                {members.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Step 3: Enter Image URL */}
          {selectedMember && (
            <div>
              <label className="block text-sm font-medium mb-2">Image URL:</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none"
              />
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                💡 Tips to get image URL:
              </p>
              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1 mt-1 ml-4">
                <li>• Right-click image on LinkedIn → Copy image link</li>
                <li>• Or upload to Imgur.com and copy link</li>
                <li>• Or use Cloudinary free account</li>
              </ul>
            </div>
          )}

          {/* Step 4: Preview */}
          {imageUrl && (
            <div>
              <label className="block text-sm font-medium mb-2">Preview:</label>
              <img
                src={imageUrl}
                alt="Preview"
                className="w-48 h-48 object-cover rounded-lg mx-auto border-2 border-primary"
              />
            </div>
          )}

          {/* Step 5: Submit */}
          {selectedMember && imageUrl && (
            <button
              onClick={handleUpdateImage}
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-secondary dark:from-blue-600 dark:to-yellow-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition disabled:opacity-50"
            >
              {loading ? 'Updating...' : '✅ Update Photo'}
            </button>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h2 className="font-bold mb-3">How to Add Photos:</h2>
          <ol className="space-y-2 text-sm">
            <li>1. Click "Load Members" to see all team members</li>
            <li>2. Select a member from the dropdown</li>
            <li>3. Get image URL (see tips above)</li>
            <li>4. Preview the image</li>
            <li>5. Click "Update Photo"</li>
          </ol>
        </div>
      </div>
    </main>
  )
}
