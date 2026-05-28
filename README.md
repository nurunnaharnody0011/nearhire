This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started
[NearHire](https://nearhire-iota.vercel.app/)

Project Overview

NearHire is a simple hyperlocal job matching platform.

It helps:

* Hirers post local jobs
* Workers find nearby opportunities

The platform focuses on simple and fast local job matching.

Features

* User signup and login
* Profile page
* Post jobs
* Browse jobs
* Search and filter jobs
* Match jobs by location/category
* Protected routes
* Responsive navigation bar

#Tech Stack

Frontend:

* Next.js
* React
* Tailwind CSS

Backend:

* Supabase

Database:

* PostgreSQL (Supabase)

Authentication:

* Supabase Auth

⸻

Database Tables

profiles

Stores user profile information.

Fields:

* id
* name
* email
* role
* location
* category

⸻

jobs

Stores posted jobs.

Fields:

* id
* hirer_id
* title
* description
* category
* location
* budget

⸻

notifications

Stores notifications.

Fields:

* id
* worker_id
* job_id
* message

⸻

Matching Logic

NearHire uses a simple matching system.

Jobs are matched based on:

* location
* category

If a worker profile matches a job location or category, the job appears in the matches page.

⸻

Setup Instructions

1. Clone the repository
2. Install packages

npm install

3. Create .env.local

Add:

NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

4. Run the project

npm run dev

⸻

AI Usage

GitHub Copilot and ChatGPT were used for:

* UI generation
* debugging help
* feature implementation ideas

All generated code was reviewed and tested manually.

⸻

Limitations

* No real-time chat
* No advanced matching algorithm
* No payment system
* No image upload

⸻

Future Improvements

* Real-time notifications
* Better matching system
* Chat between hirers and workers
* Mobile app
* Better dashboard analytics

⸻

Conclusion

NearHire is a simple MVP for local job matching.

The project demonstrates:

* authentication
* database integration
* protected routes
* CRUD operations
* simple recommendation logic


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.





Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
