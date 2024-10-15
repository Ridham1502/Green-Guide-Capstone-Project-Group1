import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white text-black p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-1">
        <a href="/greenguide" className="hover:text-green transition px-4 py-2">Green Guide</a>
          <a
            href="/"
            className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Plant Catalog
          </a>
          <a href="/mygarden" className="hover:text-green transition px-4 py-2">Mygarden</a>
          <a href="/community" className="hover:text-green transition px-4 py-2">Community</a>
          {/*<a href="/mygarden" className="hover:text-green transition px-4 py-2">My Garden</a>*/}
          <a href="/pricing" className="hover:text-green transition px-4 py-2">Pricing</a>
          <a href="/contact" className="hover:text-green transition px-4 py-2">Contact</a>
        </nav>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-2 md:mt-0">
          <a
            href="/signin"
            className="bg-white text-black py-2 px-4 border border-gray-300 rounded-xl hover:bg-gray-200 transition"
          >
            Sign In
          </a>
          <a
            href="/register"
            className="bg-black text-white py-2 px-4 rounded-xl hover:bg-gray-700 transition"
          >
            Register
          </a>
        </div>
      </div>
      <div className="border-t border-gray-300 mt-2"></div>
    </header>
  );
};

export default Header;
