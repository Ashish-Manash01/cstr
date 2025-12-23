export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 dark:bg-slate-950 text-gray-300 dark:text-gray-400 py-12 border-t border-gray-800 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="https://media.licdn.com/dms/image/v2/D560BAQGWGQldY51hLg/company-logo_200_200/B56ZsDfr4cIcAI-/0/1765290197202/cstr_nitk_logo?e=1767225600&v=beta&t=imMVUeR4RLYRdDIEwmGKyq6lg8uozdjkcOsQKzCeONw" alt="CSTR Logo" className="h-12 w-12 object-contain" />
              <h3 className="text-white dark:text-gray-100 font-bold text-lg">CSTR</h3>
            </div>
            <p className="text-sm mb-4">Chemical Engineering Forum for Science Technology & Research</p>
            <div className="space-y-2 text-xs">
              <p><a href="https://www.nitk.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">NITK Surathkal</a></p>
              <p><a href="https://chemical.nitk.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">Dept. of Chemical Eng.</a></p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white dark:text-gray-100 font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary transition">Home</a></li>
              <li><a href="#" className="hover:text-primary transition">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition">Events</a></li>
              <li><a href="#" className="hover:text-primary transition">Members</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white dark:text-gray-100 font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary transition">Research Papers</a></li>
              <li><a href="#" className="hover:text-primary transition">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition">Gallery</a></li>
              <li><a href="#" className="hover:text-primary transition">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white dark:text-gray-100 font-bold mb-4">Get In Touch</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: <a href="mailto:cstr@nitk.edu.in" className="hover:text-primary transition">cstr@nitk.edu.in</a></li>
              <li>Location: NITK Surathkal</li>
              <li className="mt-4"><a href="https://www.nitk.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition text-xs">www.nitk.ac.in</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-white dark:text-gray-100 font-bold mb-4">Follow Us</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://www.linkedin.com/company/cstr-nitk/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">🔗 LinkedIn</a></li>
              <li><a href="https://www.youtube.com/@CSTR_NITK" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">📺 YouTube</a></li>
              <li><a href="https://www.instagram.com/cstr.nitk/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition">📷 Instagram</a></li>
              <li><a href="mailto:cstr@nitk.edu.in" className="hover:text-primary transition">✉️ Email Us</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 dark:border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">&copy; {currentYear} CSTR - NITK Dept. of Chemical Engineering. All rights reserved.</p>
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
