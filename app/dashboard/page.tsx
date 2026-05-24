"use client";

import { useTheme } from "@/context/ThemeContext";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

import { logout } from "@/firebase/auth";

import {
  getUserResults,
} from "@/firebase/results";

export default function DashboardPage() {

  const { darkMode } =
    useTheme();

  const {
    user,
    loading,
  } = useAuth();

  const router =
    useRouter();

  // RESULTS STATE
  const [
    results,
    setResults,
  ] = useState<any[]>([]);

  // AUTH CHECK
  useEffect(() => {

    if (
      !loading &&
      !user
    ) {

      router.push("/login");

    }

  }, [
    user,
    loading,
    router,
  ]);

  // LOAD USER RESULTS
  useEffect(() => {

    async function loadResults() {

      if (user?.email) {

        const data =
          await getUserResults(
            user.email
          );

        setResults(data);

      }

    }

    loadResults();

  }, [user]);

  // LOGOUT
  async function handleLogout() {

    await logout();

    router.push("/login");

  }

  // LOADING SCREEN
  if (loading) {

    return (

      <main className="min-h-screen flex items-center justify-center text-3xl font-bold">

        Loading...

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

      {/* TOP */}

      <section>

        <div className="flex flex-wrap justify-between gap-6 items-center">

          <div>

            <h1 className="text-4xl md:text-5xl font-bold">

              Student Dashboard

            </h1>

            <p className="mt-4 text-xl">

              Welcome,
              {" "}
              {user?.email}

            </p>

          </div>

          <div className="bg-blue-700 text-white px-8 py-5 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300">

            <p className="text-lg">

              Overall Rank

            </p>

            <h2 className="text-4xl font-bold mt-2">

              #152

            </h2>

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="mt-8 bg-red-500 text-white px-6 py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300"
        >

          Logout

        </button>

      </section>

      {/* STATS */}

      <section className="mt-16">

        <div className="grid md:grid-cols-4 gap-6">

          <div
            className={
              darkMode
                ? "bg-gray-900 p-8 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300"
                : "bg-white p-8 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300"
            }
          >

            <h2 className="text-lg">

              Tests Attempted

            </h2>

            <p className="text-5xl font-bold mt-4 text-blue-700">

              {results.length}

            </p>

          </div>

          <div
            className={
              darkMode
                ? "bg-gray-900 p-8 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300"
                : "bg-white p-8 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300"
            }
          >

            <h2 className="text-lg">

              Average Score

            </h2>

            <p className="text-5xl font-bold mt-4 text-green-600">

              {results.length > 0
                ? Math.round(
                    results.reduce(
                      (
                        total,
                        item
                      ) =>
                        total +
                        item.score,
                      0
                    ) /
                      results.length
                  )
                : 0}

            </p>

          </div>

          <div
            className={
              darkMode
                ? "bg-gray-900 p-8 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300"
                : "bg-white p-8 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300"
            }
          >

            <h2 className="text-lg">

              Accuracy

            </h2>

            <p className="text-5xl font-bold mt-4 text-yellow-400">

              {results.length > 0
                ? Math.round(
                    results.reduce(
                      (
                        total,
                        item
                      ) =>
                        total +
                        (
                          item.correct /
                          item.total
                        ) *
                          100,
                      0
                    ) /
                      results.length
                  ) + "%"
                : "0%"}

            </p>

          </div>

          <div
            className={
              darkMode
                ? "bg-gray-900 p-8 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300"
                : "bg-white p-8 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300"
            }
          >

            <h2 className="text-lg">

              Best Score

            </h2>

            <p className="text-5xl font-bold mt-4 text-red-500">

              {results.length > 0
                ? Math.max(
                    ...results.map(
                      (
                        item
                      ) =>
                        item.score
                    )
                  )
                : 0}

            </p>

          </div>

        </div>

      </section>

      {/* HISTORY */}

      <section className="mt-20">

        <h2 className="text-4xl font-bold">

          Test History

        </h2>

        <div className="grid gap-8 mt-10">

          {results.map(
            (
              item,
              index
            ) => (

              <div
                key={index}
                className={
                  darkMode
                    ? "bg-gray-900 p-8 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300"
                    : "bg-white p-8 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300"
                }
              >

                <div className="flex flex-wrap justify-between gap-6 items-center">

                  <div>

                    <h3 className="text-2xl font-bold">

                      SSC Mock Test

                    </h3>

                    <p className="mt-3 text-lg">

                      Attempted on:
                      {" "}
                      {item.date}

                    </p>

                  </div>

                  <div className="bg-blue-700 text-white px-6 py-4 rounded-2xl">

                    <p className="text-lg">

                      Score

                    </p>

                    <h2 className="text-3xl font-bold">

                      {item.score}

                    </h2>

                  </div>

                </div>

                {/* DETAILS */}

                <div className="grid md:grid-cols-3 gap-6 mt-10">

                  <div className="bg-green-600 text-white p-6 rounded-2xl">

                    <h3 className="text-xl font-bold">

                      Correct

                    </h3>

                    <p className="text-4xl mt-4 font-bold">

                      {item.correct}

                    </p>

                  </div>

                  <div className="bg-red-500 text-white p-6 rounded-2xl">

                    <h3 className="text-xl font-bold">

                      Wrong

                    </h3>

                    <p className="text-4xl mt-4 font-bold">

                      {item.wrong}

                    </p>

                  </div>

                  <div className="bg-yellow-400 text-black p-6 rounded-2xl">

                    <h3 className="text-xl font-bold">

                      Accuracy

                    </h3>

                    <p className="text-4xl mt-4 font-bold">

                      {Math.round(
                        (
                          item.correct /
                          item.total
                        ) * 100
                      ) + "%"}

                    </p>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </section>

    </main>

  );

}