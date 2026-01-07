export default function Page() {
  return (
    <main className="min-h-screen bg-slate-950 text-gray-200 flex items-center justify-center px-4">
      <div className="max-w-2xl text-center">

        {/* Icon */}
        <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center animate-pulse">
          <svg
            className="w-8 h-8 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Coming Soon
        </h1>

        {/* Description */}
        <p className="text-gray-400 mb-8 leading-relaxed">
          We’re building something exciting here for CSTR — resources,
          events and initiatives designed to support the Chemical Engineering
          community at NITK.
        </p>



        {/* Back button */}
        <a
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition"
        >
          Back to Home
        </a>
      </div>
    </main>
  )
}
