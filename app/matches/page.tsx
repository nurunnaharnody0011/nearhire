"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function MatchesPage() {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
    }
  };

  checkUser();
}, []);
  useEffect(() => {
    async function fetchMatches() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      const { data: jobs } = await supabase.from("jobs").select("*");

      if (profile && jobs) {
        const matchedJobs = jobs.filter((job) => {
          const sameLocation =
            job.location?.toLowerCase() === profile.location?.toLowerCase();

          const sameCategory =
            job.category?.toLowerCase() === profile.category?.toLowerCase();

          return sameLocation || sameCategory;
        });

        setMatches(matchedJobs);
      }

      setLoading(false);
    }

    fetchMatches();
  }, []);

  if (loading) {
    return <main className="p-10">Loading matches...</main>;
  }

  return (
    <main className="p-10 max-w-3xl mx-auto">
      <p className="text-sm tracking-widest text-blue-600 font-bold">
        MATCHES
      </p>

      <h1 className="text-4xl font-bold mb-6">
        Recommended jobs for you
      </h1>

      {matches.length === 0 ? (
        <p>No matching jobs found.</p>
      ) : (
        <div className="space-y-4">
          {matches.map((job) => (
            <div key={job.id} className="border rounded-xl p-6 shadow-sm">
              <p className="text-sm uppercase text-blue-600 font-bold">
                {job.category}
              </p>

              <h2 className="text-2xl font-bold mt-2">{job.title}</h2>

              <p className="text-gray-600 mt-2">{job.description}</p>

              <div className="flex gap-4 mt-4 text-sm">
                <span>{job.location}</span>
                <span>Budget: ${job.budget}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}