"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight, ChevronRight, ShieldCheck, ExternalLink } from "lucide-react"

export default function SupportPage() {
  const [text, setText] = useState("")
  const [isTypingDone, setIsTypingDone] = useState(false)
  const fullText = "Support CSTR"

  useEffect(() => {
    let i = 0
    const typing = setInterval(() => {
      setText(fullText.slice(0, i + 1))
      i++
      if (i === fullText.length) {
        clearInterval(typing)
        setIsTypingDone(true)
      }
    }, 80)
    return () => clearInterval(typing)
  }, [])

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-28 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <header className="mb-24">
          <h1 className="text-6xl md:text-7xl font-semibold tracking-tight mb-8">
            {text}
            <span className={`inline-block w-[3px] h-12 md:h-16 ml-2 bg-blue-600 align-middle ${isTypingDone ? 'animate-none opacity-0' : 'animate-pulse'}`}></span>
          </h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={isTypingDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed"
          >
            Advancing chemical engineering excellence at NITK. Strategic investments 
            facilitate high-impact research, technical infrastructure, and 
            industry-academic synergy.
          </motion.p>
        </header>

        {/* SUPPORT TIERS */}
        <div className="grid gap-8">
          {[
            {
              title: "Student Development",
              desc: "Funding for international competitions, merit-based scholarships, and travel grants for research presentations.",
              accent: "border-t-blue-600"
            },
            {
              title: "Technical Infrastructure",
              desc: "Direct investment in laboratory consumables, process simulation software, and research prototype hardware.",
              accent: "border-t-slate-400"
            },
            {
              title: "Knowledge Exchange",
              desc: "Sponsoring guest lectures from industry veterans, industrial site visits, and national technical symposia.",
              accent: "border-t-slate-800 dark:border-t-slate-200"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isTypingDone ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className={`p-12 bg-slate-50/50 dark:bg-slate-900/30 border-t-4 ${item.accent} border-x border-b border-slate-100 dark:border-slate-800 rounded-b-3xl group transition-all duration-500 shadow-sm hover:shadow-md`}
            >
              <div className="flex justify-between items-center">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-3xl font-bold tracking-tight">{item.title}</h3>
                    <span className="px-3 py-1 bg-slate-200 dark:bg-slate-800 text-[10px] font-bold uppercase tracking-widest rounded-md text-slate-500">Coming Soon</span>
                  </div>
                  <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
                    {item.desc}
                  </p>
                  
                  {/* FUNCTIONAL LINK TO IRIS */}
                  <a 
                    href="https://iris.nitk.ac.in/donation_portal" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-lg font-bold text-blue-600 hover:text-blue-500 transition-all border-b-2 border-transparent hover:border-blue-500 pb-1"
                  >
                    Donate via IRIS Portal 
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GOVERNANCE */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isTypingDone ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 1 }}
          className="mt-32 pt-20 border-t border-slate-100 dark:border-slate-900"
        >
          <h2 className="text-base font-bold uppercase tracking-[0.3em] text-slate-400 mb-12 flex items-center gap-3">
            <ShieldCheck size={20} /> Governance & Transparency
          </h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h4 className="text-2xl font-bold mb-5">Fund Allocation</h4>
              <p className="text-lg text-slate-500 leading-relaxed">
                All contributions are strictly managed through NITK's official audit process, 
                ensuring 100% of external funds are utilized for student-led research 
                and educational logistics.
              </p>
            </div>
            <div>
              <h4 className="text-2xl font-bold mb-5">Official Channels</h4>
              <p className="text-lg text-slate-500 leading-relaxed">
                While our internal tracking system is under development, all financial 
                transactions are securely processed through the integrated IRIS 
                Donation Portal.
              </p>
            </div>
          </div>
        </motion.div>

        {/* FOOTER CTA */}
        <motion.footer 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isTypingDone ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-32 p-16 rounded-[2.5rem] bg-slate-900 text-white flex flex-col md:flex-row justify-between items-center gap-12"
        >
          <div>
            <h3 className="text-4xl font-bold mb-4 tracking-tight">Partner with CSTR</h3>
            <p className="text-xl text-slate-400">Formal sponsorship proposals and impact reports.</p>
          </div>
          <Link 
            href="/contact" 
            className="px-12 py-6 bg-blue-600 hover:bg-blue-500 rounded-2xl text-xl font-bold flex items-center gap-3 transition-all shadow-xl"
          >
            Contact Administration <ArrowUpRight size={24} />
          </Link>
        </motion.footer>

      </div>
    </main>
  )
}