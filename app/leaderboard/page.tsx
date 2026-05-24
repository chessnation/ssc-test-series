"use client";

import { useTheme } from "@/context/ThemeContext";

import {
  useEffect,
  useState,
} from "react";

import {
  getLeaderboard,
} from "@/firebase/results";

export default function LeaderboardPage() {

  const { darkMode } =
    useTheme();

  const [
    leaderboardData,
    setLeaderboardData,
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {

    async function loadLeaderboard() {

      const data =
        await getLeaderboard();

      setLeaderboardData(data);

      setLoading(false);

    }

    loadLeaderboard();

  }, []);

  if (loading) {

    return (

      <main className="min-h-screen flex items-center justify-center text-3xl font-bold">

        Loading Leaderboard...

      </main>

    );

  }

  return (

    <main
      className={
        darkMode
          ? "min-h-screen bg-black text-white p-6 md:p-10"
          : "min-h-screen bg-gray-100 text-black p-6 md:p-10"
      }
    >

      {/* HERO */}

      <section className="text-center">

        <div className="inline-block bg-yellow-400 text-black px-6 py-2 rounded-full font-bold">

          🏆 SSC TOPPERS

        </div>

        <h1 className="text-4xl md:text-6xl font-bold mt-6">

          Student Leaderboard

        </h1>

        <p className="mt-6 text-xl max-w-3xl mx-auto">

          Compete with thousands of SSC aspirants
          and improve your national rank.

        </p>

      </section>

      {/* TOP 3 */}

      <section className="mt-20">

        <div className="grid md:grid-cols-3 gap-8">

          {leaderboardData
            .slice(0, 3)
            .map(
              (
                student,
                index
              ) => (

                <div
                  key={index}
                  className={
                    index === 0
                      ? "bg-yellow-400 text-black rounded-3xl p-10 shadow-2xl text-center scale-105"
                      : darkMode
                      ? "bg-gray-900 rounded-3xl p-10 shadow-xl text-center"
                      : "bg-white rounded-3xl p-10 shadow-xl text-center"
                  }
                >

                  <div className="text-6xl">

                    {index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : "🥉"}

                  </div>

                  <h2 className="text-3xl font-bold mt-6">

                    {student.email}

                  </h2>

                  <p className="text-5xl font-bold mt-6">

                    {student.score}

                  </p>

                  <p className="mt-4 text-xl">

                    Rank:
                    {" "}
                    #{index + 1}

                  </p>

                  <p className="mt-2 text-lg">

                    Tests Attempted:
                    {" "}
                    1

                  </p>

                </div>

              )
            )}

        </div>

      </section>

      {/* FULL LEADERBOARD */}

      <section className="mt-20">

        <div
          className={
            darkMode
              ? "bg-gray-900 rounded-3xl shadow-xl overflow-hidden"
              : "bg-white rounded-3xl shadow-xl overflow-hidden"
          }
        >

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-blue-700 text-white">

                <tr>

                  <th className="p-6 text-left">

                    Rank

                  </th>

                  <th className="p-6 text-left">

                    Student

                  </th>

                  <th className="p-6 text-left">

                    Score

                  </th>

                  <th className="p-6 text-left">

                    Tests

                  </th>

                </tr>

              </thead>

              <tbody>

                {leaderboardData.map(
                  (
                    student,
                    index
                  ) => (

                    <tr
                      key={index}
                      className={
                        darkMode
                          ? "border-b border-gray-800 hover:bg-gray-800 transition-all duration-300"
                          : "border-b hover:bg-gray-100 transition-all duration-300"
                      }
                    >

                      <td className="p-6 font-bold text-xl">

                        #{index + 1}

                      </td>

                      <td className="p-6 text-lg font-bold break-all">

                        {student.email}

                      </td>

                      <td className="p-6 text-lg">

                        {student.score}

                      </td>

                      <td className="p-6 text-lg">

                        1

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

      </section>

    </main>

  );

}