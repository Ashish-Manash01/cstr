export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 dark:bg-slate-950 text-gray-300 dark:text-gray-400 py-14 border-t border-gray-800 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4">

        {/* GRID */}
        <div className="grid md:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/android-chrome-512x512.png" alt="CSTR Logo" className="h-12 w-12 object-contain" />
              <h3 className="text-white font-bold text-lg">CSTR</h3>
            </div>

            <p className="text-sm mb-4">
              Chemical Engineering Forum for Science Technology & Research
            </p>

            <div className="space-y-2 text-xs">
              <p>
                <a href="https://www.nitk.ac.in/" target="_blank" className="hover:text-primary transition">
                  NITK Surathkal
                </a>
              </p>
              <p>
                <a href="https://chemical.nitk.ac.in/" target="_blank" className="hover:text-primary transition">
                  Dept. of Chemical Eng.
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary transition">Home</a></li>
              <li><a href="#" className="hover:text-primary transition">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition">Events</a></li>
              <li><a href="#" className="hover:text-primary transition">Members</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary transition">Research Papers</a></li>
              <li><a href="#" className="hover:text-primary transition">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition">Gallery</a></li>
              <li><a href="#" className="hover:text-primary transition">FAQ</a></li>
            </ul>
          </div>

          {/* Follow Us — NEW STYLE */}
          <div>
            <h4 className="text-white font-bold mb-4">Follow Us</h4>

            <div className="flex items-center gap-4">

              <a
                href="https://www.linkedin.com/company/cstr-nitk/posts/?feedView=all"
                target="_blank"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition"
              >
                <i className="fa-brands fa-linkedin text-white text-lg"></i>
              </a>

              <a
                href="https://www.youtube.com/@CSTR_NITK"
                target="_blank"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition"
              >
                <i className="fa-brands fa-youtube text-white text-lg"></i>
              </a>

              <a
                href="https://www.instagram.com/cstr.nitk/"
                target="_blank"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition"
              >
                <i className="fa-brands fa-instagram text-white text-lg"></i>
              </a>

              <a
                href="mailto:cstr@nitk.edu.in"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition"
              >
                <i className="fa-solid fa-envelope text-white text-lg"></i>
              </a>

            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © {currentYear} CSTR - NITK Dept. of Chemical Engineering. All rights reserved.
            </p>

            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary transition text-sm">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition text-sm">Terms of Service</a>
              <a href="#" className="hover:text-primary transition text-sm">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
