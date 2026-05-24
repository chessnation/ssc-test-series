"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter }
from "next/navigation";

import { useTheme }
from "@/context/ThemeContext";

import { useAuth }
from "@/context/AuthContext";

import {
  getUserResults,
} from "@/firebase/results";

export default function ProfilePage() {

  const { darkMode } =
    useTheme();

  const {
    user,
    loading,
  } = useAuth();

  const router =
    useRouter();

  const [results,
    setResults] =
    useState<any[]>([]);

  useEffect(() => {

    if (
      !loading &&
      !user
    ) {

      router.push(
        "/login"
      );

    }

  }, [
    user,
    loading,
    router,
  ]);

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

  if (loading) {

    return (

      <main className="min-h-screen flex items-center justify-center text-3xl font-bold">

        Loading...

      </main>

    );

  }

  const totalTests =
    results.length;

  const bestScore =
    results.length > 0
      ? Math.max(
          ...results.map(
            (item) =>
              item.score
          )
        )
      : 0;

  const averageScore =
    results.length > 0
      ? Math.round(
          results.reduce(
            (
              total,
              item
            ) =>
              total +
              item.score,
            0
          ) / results.length
        )
      : 0;

  return (

    <main
      className={
        darkMode
          ? "min-h-screen bg-black text-white p-6 md:p-10"
          : "min-h-screen bg-gray-100 text-black p-6 md:p-10"
      }
    >

      {/* TOP PROFILE */}

      <section>

        <div
          className={
            darkMode
              ? "bg-gray-900 rounded-3xl p-10 shadow-xl"
              : "bg-white rounded-3xl p-10 shadow-xl"
          }
        >

          <div className="flex flex-wrap gap-8 items-center">

            {/* AVATAR */}

            <div className="w-32 h-32 rounded-full bg-blue-700 flex items-center justify-center text-5xl font-bold text-white">

              {user?.email
                ?.charAt(0)
                .toUpperCase()}

            </div>

            {/* USER INFO */}

            <div>

              <h1 className="text-4xl font-bold">

                SSC Student

              </h1>

              <p className="mt-4 text-xl break-all">

                {user?.email}

              </p>

              <div className="flex flex-wrap gap-4 mt-6">

                <div className="bg-green-600 text-white px-5 py-2 rounded-full font-bold">

                  Active Student

                </div>

                <div className="bg-yellow-400 text-black px-5 py-2 rounded-full font-bold">

                  SSC Aspirant

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="mt-16">

        <div className="grid md:grid-cols-4 gap-6">

          <div
            className={
              darkMode
                ? "bg-gray-900 p-8 rounded-3xl shadow-xl"
                : "bg-white p-8 rounded-3xl shadow-xl"
            }
          >

            <h2 className="text-lg">

              Total Tests

            </h2>

            <p className="text-5xl font-bold mt-4 text-blue-700">

              {totalTests}

            </p>

          </div>

          <div
            className={
              darkMode
                ? "bg-gray-900 p-8 rounded-3xl shadow-xl"
                : "bg-white p-8 rounded-3xl shadow-xl"
            }
          >

            <h2 className="text-lg">

              Best Score

            </h2>

            <p className="text-5xl font-bold mt-4 text-green-600">

              {bestScore}

            </p>

          </div>

          <div
            className={
              darkMode
                ? "bg-gray-900 p-8 rounded-3xl shadow-xl"
                : "bg-white p-8 rounded-3xl shadow-xl"
            }
          >

            <h2 className="text-lg">

              Average Score

            </h2>

            <p className="text-5xl font-bold mt-4 text-yellow-400">

              {averageScore}

            </p>

          </div>

          <div
            className={
              darkMode
                ? "bg-gray-900 p-8 rounded-3xl shadow-xl"
                : "bg-white p-8 rounded-3xl shadow-xl"
            }
          >

            <h2 className="text-lg">

              National Rank

            </h2>

            <p className="text-5xl font-bold mt-4 text-red-500">

              #152

            </p>

          </div>

        </div>

      </section>

      {/* RECENT RESULTS */}

      <section className="mt-20">

        <h2 className="text-4xl font-bold">

          Recent Test Results

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
                    ? "bg-gray-900 p-8 rounded-3xl shadow-xl"
                    : "bg-white p-8 rounded-3xl shadow-xl"
                }
              >

                <div className="flex flex-wrap justify-between gap-6 items-center">

                  <div>

                    <h3 className="text-2xl font-bold">

                      SSC Mock Test

                    </h3>

                    <p className="mt-4 text-lg">

                      {item.date}

                    </p>

                  </div>

                  <div className="bg-blue-700 text-white px-8 py-4 rounded-2xl">

                    <p className="text-lg">

                      Score

                    </p>

                    <h2 className="text-3xl font-bold">

                      {item.score}

                    </h2>

                  </div>

                </div>

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
                      )}
                      %

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