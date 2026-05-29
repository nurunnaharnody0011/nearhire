import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-16">
      <section className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-extrabold mb-6">
          Welcome to NearHire
        </h1>

        <p className="text-gray-300 text-lg mb-10">
          Manage your local job activity from one place.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <Link
            href="/post-job"
            className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-blue-500 transition"
          >
            <h2 className="text-xl font-bold mb-3">Post a Job</h2>
            <p className="text-gray-400">
              Create a new local job opportunity.
            </p>
          </Link>

          <Link
            href="/jobs"
            className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-blue-500 transition"
          >
            <h2 className="text-xl font-bold mb-3">Browse Jobs</h2>
            <p className="text-gray-400">
              Explore jobs posted by hirers.
            </p>
          </Link>

          <Link
            href="/matches"
            className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-blue-500 transition"
          >
            <h2 className="text-xl font-bold mb-3">View Matches</h2>
            <p className="text-gray-400">
              See jobs matched to your profile.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}