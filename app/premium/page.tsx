"use client";

import {
  useTheme,
} from "@/context/ThemeContext";

declare global {

  interface Window {

    Razorpay: any;

  }

}

export default function PremiumPage() {

  const { darkMode } =
    useTheme();

  function handlePayment() {

    const options = {

      key:
        "rzp_live_StiH9HsM3naUQq",

      amount:
        29900,

      currency:
        "INR",

      name:
        "SSC Master",

      description:
        "Premium SSC Test Series",

      image:
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",

      handler:
        function (
          response: any
        ) {

          alert(
            "Payment Successful 🚀"
          );

          console.log(
            response
          );

        },

      theme: {

        color:
          "#2563eb",

      },

    };

    const razorpay =
      new window.Razorpay(
        options
      );

    razorpay.open();

  }

  return (

    <main
      className={
        darkMode
          ? "min-h-screen bg-black text-white p-6 md:p-10"
          : "min-h-screen bg-gray-100 text-black p-6 md:p-10"
      }
    >

      <section className="text-center">

        <h1 className="text-5xl md:text-7xl font-bold text-blue-700">

          Premium SSC Test Series

        </h1>

        <p className="mt-6 text-xl max-w-3xl mx-auto">

          Unlock full-length SSC CGL & CHSL mock tests,
          detailed analytics, rank boosters and premium practice sets.

        </p>

      </section>

      <div className="max-w-4xl mx-auto mt-20">

        <div
          className={
            darkMode
              ? "bg-gray-900 p-10 rounded-3xl shadow-2xl border border-yellow-400"
              : "bg-white p-10 rounded-3xl shadow-2xl border border-yellow-400"
          }
        >

          <div className="text-center">

            <div className="text-7xl">

              👑

            </div>

            <h2 className="text-4xl font-bold mt-6">

              SSC Premium Pass

            </h2>

            <p className="mt-6 text-6xl font-bold text-blue-700">

              ₹299

            </p>

            <p className="mt-3 text-lg">

              One Time Payment

            </p>

          </div>

          <div className="grid gap-5 mt-12">

            <div className="bg-green-600 text-white p-5 rounded-2xl font-bold">

              ✅ Full Mock Tests

            </div>

            <div className="bg-green-600 text-white p-5 rounded-2xl font-bold">

              ✅ Premium Questions

            </div>

            <div className="bg-green-600 text-white p-5 rounded-2xl font-bold">

              ✅ Advanced Analytics

            </div>

            <div className="bg-green-600 text-white p-5 rounded-2xl font-bold">

              ✅ Rank Prediction

            </div>

            <div className="bg-green-600 text-white p-5 rounded-2xl font-bold">

              ✅ Unlimited Access

            </div>

          </div>

          <button
            onClick={
              handlePayment
            }
            className="w-full mt-12 bg-yellow-400 text-black p-5 rounded-2xl text-2xl font-bold hover:scale-105 transition-all duration-300"
          >

            Buy Premium Now 🚀

          </button>

        </div>

      </div>

    </main>

  );

}