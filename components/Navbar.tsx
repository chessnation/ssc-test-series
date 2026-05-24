"use client";

import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {

  const {
    darkMode,
    toggleDarkMode,
  } = useTheme();

  return (

    <nav className="bg-blue-700 text-white p-6">

      <div className="flex flex-wrap gap-3 justify-center md:justify-between items-center">

        <h1 className="text-3xl font-bold">
          SSC Master
        </h1>

        <div className="flex gap-3 flex-wrap">

          <a
            href="/"
            className="bg-white text-blue-700 px-4 py-2 rounded-xl font-bold hover:bg-yellow-300 transition-all duration-300"
          >
            Home
          </a>

          <a
            href="/tests"
            className="bg-white text-blue-700 px-4 py-2 rounded-xl font-bold hover:bg-yellow-300 transition-all duration-300"
          >
            Tests
          </a>

          <a
            href="/premium"
            className="bg-white text-blue-700 px-4 py-2 rounded-xl font-bold hover:bg-yellow-300 transition-all duration-300"
          >
            Premium
          </a>

          <a
            href="/leaderboard"
            className="bg-white text-blue-700 px-4 py-2 rounded-xl font-bold hover:bg-yellow-300 transition-all duration-300"
          >
            Leaderboard
          </a>

          <a
            href="/dashboard"
            className="bg-white text-blue-700 px-4 py-2 rounded-xl font-bold hover:bg-yellow-300 transition-all duration-300"
          >
            Dashboard
          </a>

          <a
            href="/profile"
            className="bg-white text-blue-700 px-4 py-2 rounded-xl font-bold hover:bg-yellow-300 transition-all duration-300"
          >
            Profile
          </a>

          <button
            onClick={toggleDarkMode}
            className="bg-yellow-400 text-black px-5 py-2 rounded-xl font-bold hover:scale-105 transition-all duration-300"
          >

            {darkMode
              ? "☀️ Light"
              : "🌙 Dark"}

          </button>

        </div>

      </div>

    </nav>

  );

}