"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [role, setRole] = useState("");

  useEffect(() => {
    async function getUserRole() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();

        if (!error && data) {
          setRole(data.role);
        }
      }
    }

    getUserRole();
  }, []);
 const cardStyle ="group bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 p-7 rounded-3xl shadow-xl hover:border-blue-500 hover:-translate-y-1 transition duration-300";
  return (
    <main className="min-h-screen bg-black text-white px-8 py-16">
      <section className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-extrabold mb-6">
          Welcome to NearHire
        </h1>

<p className="text-gray-300 text-lg mb-10">
  {role === "hirer"
    ? "Manage your hiring activity and connect with local talent."
    : "Discover opportunities and find jobs near your location."}
</p>
        <div className="grid md:grid-cols-3 gap-6">
          {role === "hirer" && (
  <Link href="/post-job" className={cardStyle}>
  <div className="text-3xl mb-4">📢</div>

  <h2 className="text-2xl font-bold mb-3">
    Post a Job
  </h2>

  <p className="text-gray-400 leading-7">
    Create and publish a new opportunity for local talent.
  </p>

  <p className="mt-6 text-blue-400 font-semibold group-hover:translate-x-1 transition">
    Post now →
  </p>
</Link>
)}
<Link href="/jobs" className={cardStyle}>
  <div className="text-3xl mb-4">🔎</div>

  <h2 className="text-2xl font-bold mb-3">
    Browse Jobs
  </h2>

  <p className="text-gray-400 leading-7">
    Explore local job opportunities near your location.
  </p>

  <p className="mt-6 text-blue-400 font-semibold group-hover:translate-x-1 transition">
    Explore jobs →
  </p>
</Link>
          {role === "worker" && (
          <Link href="/matches" className={cardStyle}>
  <div className="text-3xl mb-4">🎯</div>

  <h2 className="text-2xl font-bold mb-3">
    View Matches
  </h2>

  <p className="text-gray-400 leading-7">
    See jobs matched to your profile and preferences.
  </p>

  <p className="mt-6 text-blue-400 font-semibold group-hover:translate-x-1 transition">
    View matches →
  </p>
</Link> )}
        </div>
      </section>
    </main>
  );
}