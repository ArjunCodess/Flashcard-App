import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`block py-2 px-3 rounded md:p-0 transition-colors duration-200 ease-in-out ${
        isActive ? "text-blue-600 dark:text-blue-500" : "text-gray-500 dark:text-gray-400"
      } hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500`}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm rounded-lg m-4 dark:bg-gray-800 transition-colors duration-200 ease-in-out">
      <div className="w-full mx-auto max-w-screen-xl p-4">
        <div className="flex flex-wrap items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flashcard App</span>
          </Link>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
            </svg>
          </button>
          <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/list">Flashcard List</NavLink></li>
              <li><NavLink to="/test">Test Yourself</NavLink></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}