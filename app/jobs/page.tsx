"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Job = {
  id: string;
  title: string;
  category: string;
  location: string;
  budget: number | string;
  description?: string;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("jobs")
        .select("id, title, category, location, budget, description")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      } else {
        setJobs((data as Job[]) ?? []);
      }

      setLoading(false);
    };

    fetchJobs();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Browse jobs
          </p>
          <h1 className="text-3xl font-bold md:text-4xl">Available job listings</h1>
          <p className="text-slate-600">
            Explore current opportunities posted by employers in your network.
          </p>
        </header>

        {loading ? (
          <div className="rounded-3xl bg-white p-8 text-center text-slate-500 shadow-sm ring-1 ring-slate-200">
            Loading jobs...
          </div>
        ) : jobs.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center text-slate-500 shadow-sm ring-1 ring-slate-200">
            No jobs found.
          </div>
        ) : (
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {jobs.map((job) => (
              <article
                key={job.id}
                className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-700">
                    {job.category || "General"}
                  </span>
                  <span className="text-sm font-semibold text-emerald-600">
                    ${Number(job.budget ?? 0).toLocaleString()}
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-slate-900">{job.title}</h2>
                <p className="mt-3 text-sm text-slate-600 line-clamp-3">
                  {job.description || "No description provided yet."}
                </p>

                <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-600">
                  <span className="rounded-full bg-slate-100 px-3 py-1">{job.location}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1">Budget: ${Number(job.budget ?? 0).toLocaleString()}</span>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}