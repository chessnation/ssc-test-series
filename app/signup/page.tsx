"use client";

import { useState } from "react";

import {
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "@/firebase/config";

export default function SignupPage() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  async function handleSignup() {

    try {

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Account Created Successfully 🎉");

    } catch (error: any) {

      alert(error.message);

    }

  }

  return (

    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-5">

      <div className="bg-white p-8 rounded-3xl shadow w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-700">
          Student Signup
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full mt-6 p-3 border rounded-xl"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full mt-4 p-3 border rounded-xl"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full mt-6 bg-blue-700 text-white p-3 rounded-xl font-bold"
        >
          Create Account
        </button>

      </div>

    </main>

  );
}