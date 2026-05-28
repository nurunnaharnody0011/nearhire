"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <nav className="flex items-center gap-6 p-4 border-b shadow-sm">
      <Link href="/" className="font-bold text-xl">
        NearHire
      </Link>

      <Link href="/jobs">Jobs</Link>

      {user && <Link href="/post-job">Post Job</Link>}

      {user && <Link href="/matches">Matches</Link>}

      {user && <Link href="/profile">Profile</Link>}

      {!user && <Link href="/login">Login</Link>}

      {!user && <Link href="/signup">Signup</Link>}

      {user && (
        <button
          onClick={handleLogout}
          className="ml-auto bg-black text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      )}
    </nav>
  );
}