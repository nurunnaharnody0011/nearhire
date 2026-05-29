"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("worker");
  const [location, setLocation] = useState("");

  const handleSignup = async () => {
    // Create auth user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    // Save profile data
    const user = data.user;

    if (user) {
      await supabase.from("profiles").insert({
        id: user.id,
        name,
        email,
        role,
        location,
      });

      alert("Signup successful!");
      window.location.href = "/profile";
    }
  };

  return (
    <main className="p-10 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Signup
      </h1>

      <div className="flex flex-col gap-4">

        <input
          type="text"
          placeholder="Name"
          className="border p-3 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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



  <select
  className="border p-3 rounded bg-black text-white"
  value={role}
  onChange={(e) => setRole(e.target.value)}
>
  <option value="worker" className="text-black">
    Worker
  </option>
  <option value="hirer" className="text-black">
    Hirer
  </option>
</select>


        <input
          type="text"
          placeholder="Location"
          className="border p-3 rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="bg-black text-white p-3 rounded"
        >
          Sign Up
        </button>
<p className="mt-4 text-center text-sm text-gray-400">
  Already have an account?{" "}
  <a href="/login" className="text-blue-500 font-semibold">
    Login
  </a>
</p>
      </div>
    </main>
  );
}