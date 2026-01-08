"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Home() {
  const fullText =
    "Chemical Engineering Forum for Science Technology & Research"

  const [text, setText] = useState("")

  // Image Carousel State (only two images in public)
  const [index, setIndex] = useState(0)
  const aboutImages = ["/department.webp", "/faculty.webp"]

  useEffect(() => {
    let i = 0
    const typing = setInterval(() => {
      setText(fullText.slice(0, i + 1))
      i++
      if (i === fullText.length) clearInterval(typing)
    }, 55)

    return () => clearInterval(typing)
  }, [])

  const nextImage = () =>
    setIndex((prev) => (prev + 1) % aboutImages.length)

  const prevImage = () =>
    setIndex((prev) => (prev - 1 + aboutImages.length) % aboutImages.length)

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      {/* add padding so navbar doesn't cover content */}
      <div className="pt-24">

        {/* HERO SECTION */}
        <section className="relative min-h-screen hero-rings flex items-center justify-center text-center overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 z-10">

            {/* Glowing logo */}
            <div className="mx-auto mb-10 w-56 h-56 md:w-64 md:h-64 rounded-full bg-white dark:bg-slate-900 border border-blue-400/40 dark:border-blue-500/40 flex items-center justify-center logo-glow shadow-2xl">
              <img
                src="/apple-touch-icon.png"
                alt="CSTR Logo"
                className="w-36 h-36 md:w-40 md:h-40 object-contain drop-shadow-lg"
              />
            </div>

            {/* Typing */}
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 dark:text-blue-200 leading-relaxed min-h-[4rem]">
              {text}
              <span className="animate-pulse border-r-2 border-blue-500 ml-1" />
            </h2>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-gray-50 dark:to-slate-900" />
        </section>

        {/* COMPANIES ROTATION */}
        <section className="py-16 bg-gray-50 dark:bg-slate-900">
          <div className="max-w-6xl mx-auto px-6 text-center">

            <h2 className="text-3xl md:text-4xl font-bold mb-10">
              <span className="text-slate-800 dark:text-white">
                Our alumni are currently
              </span>
              <span className="text-blue-600 dark:text-blue-400 ml-2 relative after:block after:w-16 after:h-[3px] after:bg-blue-600 dark:after:bg-blue-400 after:mt-2 after:rounded-full inline-block">
                at
              </span>
            </h2>

            <div className="relative w-full overflow-hidden rounded-full border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-950 py-10 shadow-xl">
              <div className="logo-track flex items-center gap-16 whitespace-nowrap animate-[scroll_18s_linear_infinite]">
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
                  "https://upload.wikimedia.org/wikipedia/en/thumb/b/b2/Hindustan_Unilever_Logo.svg/2560px-Hindustan_Unilever_Logo.svg.png"
                ].map((logo, i) => (
                  <img
                    key={i}
                    src={logo}
                    className="h-10 md:h-12 object-contain opacity-80 hover:opacity-100 transition"
                    alt="Company"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="py-24 bg-gray-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-6">

            <h2 className="text-4xl md:text-5xl font-bold text-center mb-3">
              About Us
            </h2>

            <div className="w-28 h-[3px] mx-auto bg-gray-900 dark:bg-gray-200 rounded-full mb-8" />

            <p className="text-center text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-14 leading-relaxed">
              Welcome to the Professional Association for Chemical Engineering at NITK Surathkal.
            </p>

            <div className="grid md:grid-cols-2 gap-10 items-start">

              {/* Image carousel */}
              <div className="relative w-full h-[420px] md:h-[520px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-slate-700 bg-slate-200">

                <img
                  src={aboutImages[index]}
                  className="w-full h-full object-cover transition-all duration-[1800ms] ease-in-out"
                  alt="About CSTR"
                />

                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-800/80 p-3 rounded-xl shadow hover:scale-105 transition"
                >
                  ◀
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-800/80 p-3 rounded-xl shadow hover:scale-105 transition"
                >
                  ▶
                </button>
              </div>

              {/* Vision & Mission */}
              <div className="space-y-8">
                <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    CSTR is a platform dedicated to fostering innovation, research, and professional development in chemical engineering. We bridge the gap between academia and industry, providing opportunities for mentorship, networking, and growth.
                  </p>
                </div>

                <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    To create an inclusive community where chemical engineers collaborate, innovate, and contribute to technological advancement.
                    <br /><br />
                    To foster real-world learning through industry interactions, research activities, and student-driven projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OUR INITIATIVES */}
        <section className="relative py-24 overflow-hidden bg-white dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px6">

            <h2 className="text-5xl font-bold text-center mb-3">
              Our Initiatives
            </h2>

            <div className="w-24 h-[3px] mx-auto bg-gray-900 dark:bg-gray-100 rounded-full mb-14" />

            <div className="grid md:grid-cols-2 gap-10">
              {[
                {
                  title: "Workshops & Talks",
                  link: "/initiatives/workshops",
                  text:
                    "Interactive technical talks, software training and learning sessions guided by faculty and seniors."
                },
                {
                  title: "Research Assistance",
                  link: "/initiatives/research",
                  text:
                    "Support with research topics, paper writing, simulations, data interpretation and publication guidance."
                },
                {
                  title: "Industry Interactions",
                  link: "/initiatives/industry",
                  text:
                    "Sessions with professionals, alumni panels and exposure to real-world industrial practices."
                },
                {
                  title: "Student Projects",
                  link: "/initiatives/projects",
                  text:
                    "Guided mini-projects and collaborative problem-solving inspired by real challenges."
                }
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.link}
                  className="group block bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-2xl p-10 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition"
                >
                  <h3 className="text-3xl font-semibold mb-4">
                    {item.title}
                  </h3>

                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {item.text}
                  </p>

                  <div className="mt-6 h-[2px] w-0 group-hover:w-full transition-all duration-700 bg-gradient-to-r from-blue-400 to-purple-400" />
                </Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}
