"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState({
  name: "",
  email: "",
  password: "",
  role: "",
  location: "",
});

  const handleSignup = async () => {
    const newErrors = {
  name: "",
  email: "",
  password: "",
  role: "",
  location: "",
};

if (!name.trim()) newErrors.name = "Name is required";
if (!email.trim()) newErrors.email = "Email is required";
if (!password.trim()) newErrors.password = "Password is required";
if (!role.trim()) newErrors.role = "Please select a role";
if (!location.trim()) newErrors.location = "Location is required";

setErrors(newErrors);

const hasError = Object.values(newErrors).some((error) => error !== "");

if (hasError) {
  return;
}
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
      const { error: profileError } = await supabase.from("profiles").insert({
  id: user.id,
  name,
  email,
  role,
  location,
});

if (profileError) {
  alert(profileError.message);
  return;
}

      //alert("Signup successful!");
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
        {errors.name && !name && <p className="text-red-500 text-sm">{errors.name}</p>}

        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && !email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && !password && <p className="text-red-500 text-sm">{errors.password}</p>}



  <select
  className="border p-3 rounded bg-black text-white"
  value={role}
  onChange={(e) => setRole(e.target.value)}
>
  <option value="">Select Role</option>
  <option value="worker">Worker</option>
  <option value="employer">Employer</option>
</select>
{errors.role && !role && <p className="text-red-500 text-sm">{errors.role}</p>}


        <input
          type="text"
          placeholder="Location"
          className="border p-3 rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        {errors.location && !location && <p className="text-red-500 text-sm">{errors.location}</p>}

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