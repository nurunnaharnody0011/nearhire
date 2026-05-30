"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      return;
    }

    //alert("Login successful!");
    window.location.href = "/dashboard";
  };

  return (
    <main className="p-10 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Login</h1>

      <div className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
{error && (
  <p className="text-red-500 text-sm">
    {error}
  </p>
)}
        <button
          onClick={handleLogin}
          className="bg-black text-white p-3 rounded"
        >
          Login
        </button>
        <p className="mt-4 text-center text-sm text-gray-400">
  Don't have an account?{" "}
  <a
    href="/signup"
    className="text-blue-500 hover:text-blue-400 font-semibold"
  >
    Sign Up
  </a>
</p>
      </div>
    </main>
  );
}