"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Profile = {
  email?: string | null;
  role?: string | null;
  location?: string | null;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("email, role, location")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error loading profile:", error);
        setProfile({
          email: user.email ?? "",
          role: "User",
          location: "Not set",
        });
      } else {
        setProfile({
          email: data?.email ?? user.email ?? "",
          role: data?.role ?? "User",
          location: data?.location ?? "Not set",
        });
      }

      setLoading(false);
    };

    loadProfile();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Profile
          </p>
          <h1 className="text-3xl font-bold md:text-4xl">Your account overview</h1>
          <p className="text-slate-600">
            View your current profile details from Supabase.
          </p>
        </header>

        {loading ? (
          <section className="rounded-3xl bg-white p-8 text-center text-slate-500 shadow-sm ring-1 ring-slate-200">
            Loading profile...
          </section>
        ) : !profile ? (
          <section className="rounded-3xl bg-white p-8 text-center text-slate-500 shadow-sm ring-1 ring-slate-200">
            You need to be logged in to view your profile.
          </section>
        ) : (
          <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-xl font-bold text-indigo-700">
                {profile.email?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{profile.email}</h2>
                <p className="text-sm text-slate-500">Supabase profile</p>
              </div>
            </div>

            <dl className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">Email</dt>
                <dd className="mt-1 text-base font-semibold text-slate-900">{profile.email || "—"}</dd>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">Role</dt>
                <dd className="mt-1 text-base font-semibold text-slate-900">{profile.role || "—"}</dd>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <dt className="text-xs uppercase tracking-[0.18em] text-slate-500">Location</dt>
                <dd className="mt-1 text-base font-semibold text-slate-900">{profile.location || "—"}</dd>
              </div>
            </dl>
          </section>
        )}
      </div>
    </main>
  );
}