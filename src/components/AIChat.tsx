'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! 👋 I\'m CSTR AI Assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Simple AI responses
  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes('hello') || message.includes('hi')) {
      return 'Hey there! 👋 Welcome to CSTR. How can I assist you?'
    }
    if (message.includes('about') || message.includes('what is cstr')) {
      return 'CSTR stands for Chemical Engineering Forum for Science Technology & Research. We\'re a student club at NITK focused on innovation and research! 🔬'
    }
    if (message.includes('event') || message.includes('meeting')) {
      return 'We organize regular events, workshops, and seminars. Check out our Events page for upcoming activities! 📅'
    }
    if (message.includes('member') || message.includes('team')) {
      return 'Our team consists of passionate students and faculty advisors. Visit the Members page to meet everyone! 👥'
    }
    if (message.includes('join') || message.includes('membership')) {
      return 'Interested in joining? Head over to the Contact page and let us know! We\'d love to have you on board 🚀'
    }
    if (message.includes('contact')) {
      return 'You can reach us through the Contact page or email us at cstr@nitk.edu.in. Feel free to get in touch! 💌'
    }
    if (message.includes('project') || message.includes('research')) {
      return 'We work on various research projects in chemical engineering. Check our About page to learn more! 📚'
    }
    if (message.includes('thanks') || message.includes('thank')) {
      return 'You\'re welcome! 😊 Feel free to ask anything else!'
    }
    
    return 'That\'s a great question! For more details, feel free to reach out through our Contact page or visit the website. How else can I help? 🤔'
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(input),
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 500)
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary to-secondary dark:from-blue-600 dark:to-yellow-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-300 z-40 flex items-center justify-center text-2xl"
        title="Chat with AI"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-96 bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-gray-200 dark:border-slate-700 flex flex-col z-40">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary dark:from-blue-600 dark:to-yellow-600 text-white px-6 py-4 rounded-t-lg">
            <h3 className="font-bold text-lg">🤖 CSTR AI Assistant</h3>
            <p className="text-sm opacity-90">Always here to help!</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 dark:border-slate-700 p-4 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none text-sm"
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition font-semibold"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  )
}
