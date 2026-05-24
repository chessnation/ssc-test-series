"use client";

import { useTheme } from "@/context/ThemeContext";

const premiumTests = [
  {
    title: "SSC CGL Full Test 1",
    questions: 100,
    duration: "60 Min",
    locked: true,
  },
  {
    title: "SSC CGL Full Test 2",
    questions: 100,
    duration: "60 Min",
    locked: true,
  },
  {
    title: "SSC CHSL Full Test 1",
    questions: 100,
    duration: "60 Min",
    locked: true,
  },
  {
    title: "SSC CHSL Full Test 2",
    questions: 100,
    duration: "60 Min",
    locked: true,
  },
];

export default function PremiumPage() {

  const { darkMode } =
    useTheme();

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

          PREMIUM ACCESS

        </div>

        <h1 className="text-4xl md:text-6xl font-bold mt-6">

          Unlock Full SSC Test Series

        </h1>

        <p className="mt-6 text-xl max-w-3xl mx-auto">

          Get access to premium mock tests,
          full-length exams, detailed analytics
          and rank prediction.

        </p>

      </section>

      {/* PRICING */}

      <section className="mt-16">

        <div className="grid md:grid-cols-3 gap-8">

          {/* BASIC */}

          <div
            className={
              darkMode
                ? "bg-gray-900 rounded-3xl p-10 shadow-xl"
                : "bg-white rounded-3xl p-10 shadow-xl"
            }
          >

            <h2 className="text-3xl font-bold">

              Basic

            </h2>

            <p className="text-5xl font-bold mt-6 text-blue-700">

              ₹99

            </p>

            <ul className="mt-8 space-y-4 text-lg">

              <li>
                ✅ 10 Mock Tests
              </li>

              <li>
                ✅ Basic Analytics
              </li>

              <li>
                ✅ Rank System
              </li>

            </ul>

            <button className="w-full mt-10 bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300">

              Buy Now

            </button>

          </div>

          {/* PRO */}

          <div className="bg-blue-700 text-white rounded-3xl p-10 shadow-2xl scale-105">

            <div className="bg-yellow-400 text-black inline-block px-4 py-2 rounded-full font-bold">

              MOST POPULAR

            </div>

            <h2 className="text-3xl font-bold mt-6">

              Pro

            </h2>

            <p className="text-5xl font-bold mt-6">

              ₹299

            </p>

            <ul className="mt-8 space-y-4 text-lg">

              <li>
                ✅ Unlimited Tests
              </li>

              <li>
                ✅ Full Analytics
              </li>

              <li>
                ✅ All SSC Exams
              </li>

              <li>
                ✅ Premium Support
              </li>

            </ul>

            <button className="w-full mt-10 bg-yellow-400 text-black py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300">

              Buy Pro

            </button>

          </div>

          {/* ADVANCE */}

          <div
            className={
              darkMode
                ? "bg-gray-900 rounded-3xl p-10 shadow-xl"
                : "bg-white rounded-3xl p-10 shadow-xl"
            }
          >

            <h2 className="text-3xl font-bold">

              Advance

            </h2>

            <p className="text-5xl font-bold mt-6 text-blue-700">

              ₹499

            </p>

            <ul className="mt-8 space-y-4 text-lg">

              <li>
                ✅ Live Tests
              </li>

              <li>
                ✅ AI Analytics
              </li>

              <li>
                ✅ Mentorship
              </li>

              <li>
                ✅ Rank Booster
              </li>

            </ul>

            <button className="w-full mt-10 bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300">

              Buy Advance

            </button>

          </div>

        </div>

      </section>

      {/* PREMIUM TESTS */}

      <section className="mt-20">

        <h2 className="text-4xl font-bold text-center">

          Premium Mock Tests

        </h2>

        <div className="grid md:grid-cols-2 gap-8 mt-12">

          {premiumTests.map(
            (
              test,
              index
            ) => (

              <div
                key={index}
                className={
                  darkMode
                    ? "bg-gray-900 rounded-3xl p-8 shadow-xl"
                    : "bg-white rounded-3xl p-8 shadow-xl"
                }
              >

                <div className="flex justify-between items-center">

                  <h3 className="text-2xl font-bold">

                    {test.title}

                  </h3>

                  <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">

                    🔒 Locked

                  </div>

                </div>

                <div className="mt-8 space-y-4 text-lg">

                  <p>
                    📘 Questions:
                    {" "}
                    {test.questions}
                  </p>

                  <p>
                    ⏰ Duration:
                    {" "}
                    {test.duration}
                  </p>

                  <p>
                    📊 Full SSC Pattern
                  </p>

                </div>

                <button className="w-full mt-10 bg-yellow-400 text-black py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300">

                  Unlock Premium

                </button>

              </div>

            )
          )}

        </div>

      </section>

    </main>

  );

}