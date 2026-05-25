"use client";

import { useTheme } from "@/context/ThemeContext";

export default function Home() {

  const { darkMode } =
    useTheme();

  return (

    <main
      className={
        darkMode
          ? "min-h-screen bg-black text-white transition-all duration-300"
          : "min-h-screen bg-gray-100 text-black transition-all duration-300"
      }
    >

      {/* TOP BUTTONS */}

      <div className="flex justify-end gap-4 p-6 flex-wrap">

        <a
          href="/admin"
          className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold"
        >
          Admin
        </a>

        <a
          href="/dashboard"
          className="bg-blue-700 text-white px-4 py-2 rounded-xl font-bold"
        >
          Dashboard
        </a>

      </div>

      {/* HERO */}

      <section className="p-10 text-center">

        <h2 className="text-3xl md:text-5xl font-bold leading-tight">

          Crack SSC CGL & CHSL
          <br />
          With Real Mock Tests

        </h2>

        <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto">

          Practice free mock tests,
          track your progress,
          compete with students and
          improve daily.

        </p>

        <div className="mt-8 flex gap-4 justify-center flex-wrap">

          <a
            href="/tests"
            className="bg-yellow-400 text-black px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300"
          >
            Start Free Tests
          </a>

          <a
            href="/premium"
            className="bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300"
          >
            Explore Premium
          </a>

        </div>

      </section>

      {/* STATS */}

      <section className="p-6 md:p-12">

        <div className="grid md:grid-cols-3 gap-6">

          {[
            {
              number: "500+",
              text: "Practice Questions",
            },
            {
              number: "50+",
              text: "Mock Tests",
            },
            {
              number: "1000+",
              text: "Students Preparing",
            },
          ].map((item, index) => (

            <div
              key={index}
              className={
                darkMode
                  ? "bg-gray-900 p-8 rounded-3xl shadow-xl text-center hover:scale-105 transition-all duration-300"
                  : "bg-white p-8 rounded-3xl shadow-xl text-center hover:scale-105 transition-all duration-300"
              }
            >

              <h3 className="text-5xl font-bold text-blue-700">

                {item.number}

              </h3>

              <p
                className={
                  darkMode
                    ? "mt-3 text-xl text-gray-300"
                    : "mt-3 text-xl text-gray-700"
                }
              >

                {item.text}

              </p>

            </div>

          ))}

        </div>

      </section>

      {/* FEATURES */}

      <section className="p-6 md:p-12">

        <h2 className="text-4xl font-bold text-center text-blue-700">

          Why Students Love SSC Master

        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          {[
            {
              title: "Real Exam Interface",
              desc:
                "Practice exactly like real SSC exams with timer and instant results.",
            },
            {
              title: "Leaderboard System",
              desc:
                "Compete with students and improve rankings daily.",
            },
            {
              title: "Detailed Analytics",
              desc:
                "Track your progress and improve weak subjects.",
            },
          ].map((feature, index) => (

            <div
              key={index}
              className={
                darkMode
                  ? "bg-gray-900 p-8 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300"
                  : "bg-white p-8 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300"
              }
            >

              <h3 className="text-2xl font-bold">

                {feature.title}

              </h3>

              <p
                className={
                  darkMode
                    ? "mt-4 text-gray-300"
                    : "mt-4 text-gray-700"
                }
              >

                {feature.desc}

              </p>

            </div>

          ))}

        </div>

      </section>

    </main>

  );

}