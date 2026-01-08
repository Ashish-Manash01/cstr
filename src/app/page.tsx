"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import Link from "next/link"

// Floating particles component
const FloatingParticles = () => {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          }}
          animate={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

// Animated rings around logo
const AnimatedRings = () => {
  return (
    <>
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-blue-400/20"
          style={{
            width: `${280 + i * 60}px`,
            height: `${280 + i * 60}px`,
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: i % 2 === 0 ? 360 : -360,
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5,
          }}
        />
      ))}
      {/* Orbiting dots */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformOrigin: `${160 + i * 40}px center`,
          }}
        />
      ))}
    </>
  )
}

// Scroll-triggered section wrapper
const AnimatedSection = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.section
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  )
}

export default function Home() {
  const fullText = "Chemical Engineering Forum for Science Technology & Research"
  const [text, setText] = useState("")
  const [index, setIndex] = useState(0)
  const aboutImages = ["/department.webp", "/faculty.webp"]
  
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

  useEffect(() => {
    let i = 0
    const typing = setInterval(() => {
      setText(fullText.slice(0, i + 1))
      i++
      if (i === fullText.length) clearInterval(typing)
    }, 45)
    return () => clearInterval(typing)
  }, [])

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % aboutImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextImage = () => setIndex((prev) => (prev + 1) % aboutImages.length)
  const prevImage = () => setIndex((prev) => (prev - 1 + aboutImages.length) % aboutImages.length)

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 overflow-x-hidden">
      <div className="pt-24">

        {/* ═══════════════════════════════════════════════════════════
            HERO SECTION - Enhanced with particles & animated rings
        ═══════════════════════════════════════════════════════════ */}
        <motion.section
          className="relative min-h-screen hero-rings flex items-center justify-center text-center overflow-hidden"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <FloatingParticles />
          
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent animate-pulse-slow" />
          
          <div className="max-w-5xl mx-auto px-4 z-10">
            
            {/* Logo container with animated rings */}
            <div className="relative mx-auto mb-12 flex items-center justify-center">
              <AnimatedRings />
              
              {/* Main logo - ENLARGED */}
              <motion.div
                className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-white dark:bg-slate-900 border-2 border-blue-400/50 dark:border-blue-500/50 flex items-center justify-center logo-glow shadow-2xl z-10"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  duration: 1.5,
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 60px rgba(59, 130, 246, 0.6)",
                }}
              >
                <motion.img
                  src="/apple-touch-icon.png"
                  alt="CSTR Logo"
                  className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain drop-shadow-2xl"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
            </div>

            {/* Typing text - LOGO COLOR (Blue) */}
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-relaxed min-h-[6rem]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-blue-600 dark:text-blue-400">
                {text}
              </span>
              <motion.span
                className="inline-block w-1 h-10 md:h-12 bg-blue-500 ml-2 rounded-full"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </motion.h2>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-gray-50 dark:to-slate-900" />
        </motion.section>

        {/* ═══════════════════════════════════════════════════════════
            COMPANIES ROTATION - Enhanced marquee
        ═══════════════════════════════════════════════════════════ */}
        <AnimatedSection className="py-20 bg-gray-50 dark:bg-slate-900 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
          
          <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
            {/* HEADING - Black/White only */}
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-12 text-slate-800 dark:text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our alumni are currently working at
            </motion.h2>

            <div className="relative w-full overflow-hidden rounded-3xl border border-gray-200 dark:border-slate-700 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm py-12 shadow-2xl">
              <div className="logo-track-wrapper">
                <div className="logo-track flex items-center gap-20">
                  {/* COLORFUL LOGOS - No grayscale */}
                  {[
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Exxon_Mobil_Logo.svg/2560px-Exxon_Mobil_Logo.svg.png",
                    "https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Reliance_Industries.svg/1280px-Reliance_Industries.svg.png",
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/SAP_2011_logo.svg/2560px-SAP_2011_logo.svg.png",
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Bharat_Petroleum_logo.svg/960px-Bharat_Petroleum_logo.svg.png",
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Honeywell_logo.svg/2560px-Honeywell_logo.svg.png",
                    "https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/Hindustan_Petroleum_Logo.svg/960px-Hindustan_Petroleum_Logo.svg.png",
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/AXISBank_Logo.svg/2560px-AXISBank_Logo.svg.png",
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Chevron_Logo.svg/960px-Chevron_Logo.svg.png",
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Wells_Fargo_Bank.svg/960px-Wells_Fargo_Bank.svg.png",
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Goldman_Sachs_logo.svg/2560px-Goldman_Sachs_logo.svg.png",
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Amazon_2024.svg/2560px-Amazon_2024.svg.png",
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/ZS_Associates.svg/1280px-ZS_Associates.svg.png",
                    "https://upload.wikimedia.org/wikipedia/en/thumb/b/b2/Hindustan_Unilever_Logo.svg/2560px-Hindustan_Unilever_Logo.svg.png",
                  ].map((logo, i) => (
                    <motion.img
                      key={i}
                      src={logo}
                      className="h-12 md:h-16 object-contain opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-110"
                      alt="Company"
                      whileHover={{ y: -5 }}
                    />
                  ))}
                </div>
              </div>
              {/* Gradient fade edges */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10" />
            </div>
          </div>
        </AnimatedSection>

        {/* ═══════════════════════════════════════════════════════════
            ABOUT SECTION - With parallax & 3D cards
        ═══════════════════════════════════════════════════════════ */}
        <AnimatedSection className="py-28 bg-gray-50 dark:bg-slate-900 relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              {/* ABOUT US - Black/White only */}
              <h2 className="text-5xl md:text-6xl font-bold mb-4 text-slate-800 dark:text-white">
                About Us
              </h2>
              <motion.div
                className="w-32 h-1 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
              <p className="mt-8 text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Welcome to the Professional Association for Chemical Engineering at NITK Surathkal.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image carousel with 3D effect */}
              <motion.div
                className="relative w-full h-[450px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl group perspective-1000"
                whileHover={{ rotateY: 5, rotateX: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  key={index}
                  src={aboutImages[index]}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  alt="About CSTR"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {/* Navigation buttons */}
                <motion.button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-slate-800/90 p-4 rounded-full shadow-xl backdrop-blur-sm"
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                
                <motion.button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-slate-800/90 p-4 rounded-full shadow-xl backdrop-blur-sm"
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>

                {/* Dots indicator */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                  {aboutImages.map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        i === index ? "bg-white w-8" : "bg-white/50"
                      }`}
                      whileHover={{ scale: 1.2 }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Vision & Mission cards */}
              <div className="space-y-8">
                {[
                  {
                    title: "Our Vision",
                    text: "CSTR is a platform dedicated to fostering innovation, research, and professional development in chemical engineering. We bridge the gap between academia and industry, providing opportunities for mentorship, networking, and growth."
                  },
                  {
                    title: "Our Mission",
                    text: "To create an inclusive community where chemical engineers collaborate, innovate, and contribute to technological advancement. To foster real-world learning through industry interactions, research activities, and student-driven projects."
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="group relative bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-3xl p-8 shadow-xl overflow-hidden"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                  >
                    {/* Animated background gradient */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{item.title}</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                        {item.text}
                      </p>
                    </div>
                    
                    {/* Animated border */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ═══════════════════════════════════════════════════════════
            OUR INITIATIVES - Interactive cards with hover effects
        ═══════════════════════════════════════════════════════════ */}
        <AnimatedSection className="relative py-28 overflow-hidden bg-white dark:bg-slate-950">
          {/* Animated background blobs */}
          <motion.div
            className="absolute top-20 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
            animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
            animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              {/* OUR INITIATIVES - Black/White */}
              <h2 className="text-5xl md:text-6xl font-bold mb-4 text-slate-800 dark:text-white">
                Our Initiatives
              </h2>
              <motion.div
                className="w-32 h-1 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Workshops & Talks",
                  link: "/initiatives/workshops",
                  text: "Interactive technical talks, software training and learning sessions guided by faculty and seniors.",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  title: "Research Assistance",
                  link: "/initiatives/research",
                  text: "Support with research topics, paper writing, simulations, data interpretation and publication guidance.",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  title: "Industry Interactions",
                  link: "/initiatives/industry",
                  text: "Sessions with professionals, alumni panels and exposure to real-world industrial practices.",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  title: "Student Projects",
                  link: "/initiatives/projects",
                  text: "Guided mini-projects and collaborative problem-solving inspired by real challenges.",
                  gradient: "from-blue-500 to-cyan-500",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={item.link}>
                    <motion.div
                      className="group relative h-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-3xl p-10 shadow-lg overflow-hidden cursor-pointer"
                      whileHover={{
                        y: -10,
                        boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.3)",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Gradient overlay on hover */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      />
                      
                      <h3 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        {item.text}
                      </p>
                      
                      {/* Animated underline */}
                      <motion.div
                        className={`mt-6 h-1 rounded-full bg-gradient-to-r ${item.gradient}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: "30%" }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                      
                      {/* Arrow icon */}
                      <motion.div
                        className="absolute top-10 right-10 text-gray-300 dark:text-slate-700 group-hover:text-blue-500 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </motion.div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

      </div>
    </main>
  )
}
