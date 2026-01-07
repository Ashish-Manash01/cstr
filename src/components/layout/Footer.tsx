export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-slate-950 text-gray-300 pt-16 pb-10 overflow-hidden">

      {/* WATERMARK */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[180px] md:text-[260px] font-extrabold text-slate-800/20 select-none pointer-events-none leading-none tracking-tighter">
        CSTR
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">

        {/* LEFT — LOGO + INFO */}
        <div>
          <div className="mb-6">
            <img
              src="/apple-touch-icon.png"
              alt="CSTR Logo"
              className="h-20 w-20 object-contain"
            />
          </div>

          <p className="text-sm leading-relaxed mb-4">
            A student-driven chemical engineering forum fostering
            research, collaboration, and innovation at NITK.
          </p>

          <p className="text-sm mb-2 font-mono">
            cstr@nitk.edu.in
          </p>

          <p className="text-sm">
            Faculty Advisors: <br />
            Dr. Keyur Raval • Dr. Hari Prasad Dasari • Dr. Chinta Sankar Rao
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mt-4 text-lg">
            <a href="https://www.linkedin.com/company/cstr-nitk" target="_blank" className="hover:text-white">
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a href="https://www.instagram.com/cstr.nitk" target="_blank" className="hover:text-white">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://www.youtube.com/@CSTR_NITK" target="_blank" className="hover:text-white">
              <i className="fa-brands fa-youtube"></i>
            </a>
            <a href="mailto:cstr@nitk.edu.in" className="hover:text-white">
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="font-semibold mb-4 text-gray-200">QUICK LINKS</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/events" className="hover:text-white">Events</a></li>
            <li><a href="/members" className="hover:text-white">Members</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* OUR INITIATIVES — now clickable placeholders */}
        <div>
          <h4 className="font-semibold mb-4 text-gray-200">OUR INITIATIVES</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/initiatives/workshops" className="hover:text-white">Workshops & Talks</a></li>
            <li><a href="/initiatives/research" className="hover:text-white">Research Assistance</a></li>
            <li><a href="/initiatives/industry" className="hover:text-white">Industry Interactions</a></li>
            <li><a href="/initiatives/projects" className="hover:text-white">Student Projects</a></li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h4 className="font-semibold mb-4 text-gray-200">
            SUBSCRIBE TO NEWSLETTER
          </h4>

          <div className="flex gap-2">
            <input
              disabled
              placeholder="Coming soon!"
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-gray-400"
            />
            <button
              disabled
              className="px-4 py-2 border border-slate-600 rounded-lg text-gray-400"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-gray-400 relative z-10">
        © {year} CSTR — Department of Chemical Engineering, NITK
      </div>
    </footer>
  )
}
