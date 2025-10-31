"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dashboardLink, setDashboardLink] = useState(null);
  const router = useRouter();

  // ✅ Detect role from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userRole = localStorage.getItem("role");
      if (userRole === "student") setDashboardLink("/attendance");
      else if (userRole === "teacher") setDashboardLink("/uploadAttendance");
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleDashboardClick = () => {
    if (dashboardLink) router.push(dashboardLink);
    else alert("Please login first!");
  };

  return (
    <nav className="px-4 sm:px-8 py-4 bg-white z-10 sticky top-0 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex gap-2 items-center">
            <span className="text-lg font-bold">Orion Academy</span>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4 lg:space-x-8 text-sm font-medium">
          <Link href="/about" className="hover:text-gray-600">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-gray-600">
            Contact Us
          </Link>
          <Link href="/signup" className="hover:text-gray-600">
            Signup
          </Link>
          {dashboardLink && (
            <button
              onClick={handleDashboardClick}
              className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800 transition"
            >
              Dashboard
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md">
          <div className="flex flex-col space-y-4 p-4 text-sm font-medium">
            <Link href="/about" className="hover:text-gray-600">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-gray-600">
              Contact Us
            </Link>
            <Link href="/signup" className="hover:text-gray-600">
              Signup
            </Link>
            {dashboardLink && (
              <button
                onClick={handleDashboardClick}
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition text-left"
              >
                Dashboard
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
