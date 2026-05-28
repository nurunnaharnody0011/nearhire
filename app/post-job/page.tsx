"use client";

import { useEffect,useState } from "react";
import { supabase } from "@/lib/supabase";


export default function PostJobPage() {
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
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    budget: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert("You must be logged in to post a job.");
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase.from("jobs").insert([
      {
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category.trim(),
        location: form.location.trim(),
        budget: (form.budget),
        hirer_id: user.id,
      },
    ]);

    if (error) {
      alert(error.message || "Failed to save the job posting.");
      setIsSubmitting(false);
      return;
    }

    alert("Job posted successfully!");
    setForm({
      title: "",
      description: "",
      category: "",
      location: "",
      budget: "",
    });
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Post a job
          </p>
          <h1 className="text-3xl font-bold md:text-4xl">Create a new job listing</h1>
          <p className="text-slate-600">
            Fill in the details below and save it to your jobs table.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Title
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-base outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              placeholder="e.g. Frontend Developer"
            />
          </label>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={5}
              className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-base outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              placeholder="Describe the role, expectations, and deliverables"
            />
          </label>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Category
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-base outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                placeholder="Design, Development, Marketing"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Location
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                required
                className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-base outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                placeholder="Remote / New York"
              />
            </label>
          </div>

          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Budget
            <input
              name="budget"
              type="number"
              min="0"
              step="0.01"
              value={form.budget}
              onChange={handleChange}
              required
              className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-base outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              placeholder="500"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
          >
            {isSubmitting ? "Posting job..." : "Post job"}
          </button>
        </form>
      </div>
    </main>
  );
}