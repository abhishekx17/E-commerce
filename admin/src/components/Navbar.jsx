import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {
  return (
   <nav className="h-14 sm:h-16 px-3 sm:px-8 flex items-center justify-between border-b border-gray-200 bg-white">
  <img
    src={assets.logo}
    alt="Velora"
    className="h-8 sm:h-12 w-auto object-contain max-w-[120px] sm:max-w-none"
  />

  <button
    onClick={() => setToken("")}
    className="bg-slate-600 hover:bg-slate-700 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition"
  >
    Logout
  </button>
</nav>
  )
}

export default Navbar