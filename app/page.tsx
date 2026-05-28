import Link from "next/link";

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 leading-7">{description}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="max-w-7xl mx-auto px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-blue-400 font-bold tracking-[0.3em] mb-6">
            HYPERLOCAL JOB MATCHING
          </p>

          <h1 className="text-6xl font-extrabold leading-tight mb-8">
            Find local jobs and workers faster with{" "}
            <span className="text-blue-500">NearHire</span>
          </h1>

          <p className="text-gray-300 text-xl leading-8 mb-10">
            NearHire connects nearby workers and employers for quick local
            opportunities like cleaning, restaurant shifts, delivery, design,
            plumbing and more.
          </p>

          <div className="flex gap-5">
            <Link
              href="/jobs"
              className="bg-blue-600 px-7 py-4 rounded-xl font-bold hover:bg-blue-700 transition"
            >
              Browse Jobs
            </Link>

            <Link
              href="/signup"
              className="border border-zinc-600 px-7 py-4 rounded-xl font-bold hover:border-white transition"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl">
          <img
            src="/hero.jpg"
            alt="Local workers and hirers"
            className="w-full h-[420px] object-cover"
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 pb-24">
        <h2 className="text-4xl font-bold mb-10">What NearHire does</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            title="Post Local Jobs"
            description="Hirers can quickly post jobs with title, category, location and budget."
          />

          <FeatureCard
            title="Browse Opportunities"
            description="Workers can explore available jobs and find nearby work without long applications."
          />

          <FeatureCard
            title="Simple Matching"
            description="NearHire recommends jobs based on location and category to keep matching fast and relevant."
          />
        </div>
      </section>
    </main>
  );
}