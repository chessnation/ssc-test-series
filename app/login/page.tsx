"use client";

import {
  useState,
} from "react";

import { useRouter }
from "next/navigation";

import { useTheme }
from "@/context/ThemeContext";

import {
  login,
  signup,
} from "@/firebase/auth";

export default function LoginPage() {

  const { darkMode } =
    useTheme();

  const router =
    useRouter();

  const [email,
    setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const [isSignup,
    setIsSignup] =
    useState(false);

  async function handleAuth() {

    if (
      !email ||
      !password
    ) {

      alert(
        "Please fill all fields"
      );

      return;

    }

    setLoading(true);

    const user =
      isSignup
        ? await signup(
            email,
            password
          )
        : await login(
            email,
            password
          );

    setLoading(false);

    if (user) {

      alert(
        isSignup
          ? "Account Created"
          : "Login Successful"
      );

      router.push(
        "/dashboard"
      );

    }
    else {

      alert(
        "Authentication Failed"
      );

    }

  }

  return (

    <main
      className={
        darkMode
          ? "min-h-screen bg-black text-white flex items-center justify-center p-6"
          : "min-h-screen bg-gray-100 text-black flex items-center justify-center p-6"
      }
    >

      <div
        className={
          darkMode
            ? "bg-gray-900 p-10 rounded-3xl shadow-xl w-full max-w-md"
            : "bg-white p-10 rounded-3xl shadow-xl w-full max-w-md"
        }
      >

        <h1 className="text-4xl font-bold text-center text-blue-700">

          {isSignup
            ? "Create Account"
            : "Student Login"}

        </h1>

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          className="w-full mt-10 p-4 rounded-2xl border text-black"
        />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="w-full mt-5 p-4 rounded-2xl border text-black"
        />

        {/* BUTTON */}

        <button
          onClick={handleAuth}
          disabled={loading}
          className="w-full mt-8 bg-blue-700 text-white py-4 rounded-2xl font-bold text-lg"
        >

          {loading
            ? "Please wait..."
            : isSignup
            ? "Create Account"
            : "Login"}

        </button>

        {/* SWITCH */}

        <button
          onClick={() =>
            setIsSignup(
              !isSignup
            )
          }
          className="w-full mt-6 text-blue-700 font-bold"
        >

          {isSignup
            ? "Already have account? Login"
            : "Create New Account"}

        </button>

      </div>

    </main>

  );

}