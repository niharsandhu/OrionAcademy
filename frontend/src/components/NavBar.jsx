"use client";

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="px-4 sm:px-8 py-4 bg-white z-10 sticky top-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex gap-2 items-center">
            <span className="text-lg font-bold">Orion Academy</span>
          </Link>
        </div>
        <div className="hidden md:flex space-x-4 lg:space-x-8 text-sm font-medium">
          <a href="/about" className="hover:text-gray-600">
            About Us
          </a>
          <a href="/contact" className="hover:text-gray-600">
            Contact Us
          </a>
          <a href="/signup" className="hover:text-gray-600">
            Signup
          </a>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md">
          <div className="flex flex-col space-y-4 p-4 text-sm font-medium">
            <a href="/about" className="hover:text-gray-600">
              About Us
            </a>
            <a href="/contact" className="hover:text-gray-600">
              Contact Us
            </a>
            <a href="/signup" className="hover:text-gray-600">
              Signup
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar

