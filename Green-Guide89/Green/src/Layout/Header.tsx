import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaBloggerB,
  FaInfoCircle,
  FaLeaf,
  FaPhone,
} from "react-icons/fa";
import {
  FaHome,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaSeedling,
  FaUserShield,
} from "react-icons/fa";
import greenPlants from "../assets/greenPlants.png";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    setIsLoggedIn(!!token);
    setIsAdmin(userRole === "admin");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <header
  className="bg-gradient-to-r from-teal-100 via-white to-teal-100 text-gray-800 shadow-lg py-4"
  aria-label="Main header"
>
  <div className="container mx-auto flex flex-wrap justify-between items-center px-6">
    {/* Logo Section */}
    <div className="flex items-center space-x-3">
      <img
        src={greenPlants}
        alt="Green Guide Logo"
        className="h-12 w-auto"
      />
      <h1 className="text-2xl font-semibold text-teal-600 tracking-wide">
        Green Guide
      </h1>
    </div>

    {/* Hamburger Menu for Small Screens */}
    <button
      className="lg:hidden text-teal-600 focus:outline-none"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      aria-label="Toggle navigation menu"
      aria-expanded={isMenuOpen ? "true" : "false"}
    >
      <svg
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>

    {/* Navigation Menu */}
    <nav
      className={`lg:flex lg:space-x-4 mt-4 lg:mt-0 ${
        isMenuOpen ? "block" : "hidden"
      } lg:block`}
      aria-label="Primary navigation"
    >
      {[
        { href: "/", label: "Home", icon: FaHome },
        { href: "/gardens", label: "Gardens", icon: FaLeaf },
        { href: "/plant", label: "Plant", icon: FaSeedling },
        { href: "/calender", label: "Calendar", icon: FaCalendarAlt },
        { href: "/post", label: "Post", icon: FaBloggerB },
        { href: "/blog", label: "Blog", icon: FaBloggerB },
        { href: "/about", label: "About", icon: FaInfoCircle },
        { href: "/contact", label: "Contact Us", icon: FaPhone },
      ].map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="flex items-center text-sm font-medium text-gray-700 hover:text-teal-600 transition px-3 py-1"
        >
          <link.icon className="mr-2 text-lg" aria-hidden="true" />
          {link.label}
        </a>
      ))}
    </nav>

    {/* Authentication Links */}
    <div className="flex space-x-3 mt-4 md:mt-0">
      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="flex items-center bg-teal-600 text-white py-2 px-4 rounded-full hover:bg-teal-700 transition text-sm"
          aria-label="Logout"
        >
          <FaSignOutAlt className="mr-2 text-lg" aria-hidden="true" />
          Logout
        </button>
      ) : (
        <>
          <a
            href="/login"
            className="flex items-center bg-white text-teal-600 py-2 px-4 border border-teal-600 rounded-full hover:bg-teal-50 transition text-sm"
            aria-label="Sign In"
          >
            <FaSignInAlt className="mr-2 text-lg" aria-hidden="true" />
            Sign In
          </a>
          <a
            href="/register"
            className="flex items-center bg-teal-600 text-white py-2 px-4 rounded-full hover:bg-teal-700 transition text-sm"
            aria-label="Register"
          >
            <FaUserPlus className="mr-2 text-lg" aria-hidden="true" />
            Register
          </a>
          {!isAdmin && (
            <a
              href="/adminlogin"
              className="flex items-center bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 transition text-sm"
              aria-label="Admin Login"
            >
              <FaUserShield className="mr-2 text-lg" aria-hidden="true" />
              Admin Login
            </a>
          )}
        </>
      )}
    </div>
  </div>

  <div className="border-t border-gray-300 mt-4" aria-hidden="true"></div>
</header>

  );
};

export default Header;
