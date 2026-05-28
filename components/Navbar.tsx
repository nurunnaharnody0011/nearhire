"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const linkStyle =
    "font-semibold text-sm uppercase tracking-wide hover:text-blue-500 transition";

  return (
    <nav className="flex items-center gap-8 px-8 py-5 bg-black text-white border-b border-zinc-800">
      <Link href="/" className="text-2xl font-extrabold">
        NearHire
      </Link>

      <Link href="/jobs" className={linkStyle}>Jobs</Link>

      {user && <Link href="/post-job" className={linkStyle}>Post Job</Link>}
      {user && <Link href="/matches" className={linkStyle}>Matches</Link>}
      {user && <Link href="/profile" className={linkStyle}>Profile</Link>}

      {!user && <Link href="/login" className={linkStyle}>Login</Link>}
      {!user && (
        <Link
          href="/signup"
          className="ml-auto bg-blue-600 px-5 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Sign Up
        </Link>
      )}

      {user && (
        <button
          onClick={handleLogout}
          className="ml-auto bg-white text-black px-5 py-2 rounded-lg font-bold hover:bg-gray-200 transition"
        >
          Logout
        </button>
      )}
    </nav>
  );
}