# Job Finder

An AI-powered job application assistant that scrapes job listings from [Useme](https://useme.com), uses OpenAI to evaluate and generate tailored offers, and sends them automatically — all from a single Next.js dashboard.

## Features

- **Scrape** job listings from Useme based on configured categories and filters
- **Verify** scraped jobs with AI to determine which ones are worth applying to
- **Generate** personalised offer texts using OpenAI
- **Send** offers directly to Useme through browser automation (Puppeteer)
- **Dashboard** — a web UI to manage the entire pipeline, view jobs, and trigger each step manually

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| UI | [PrimeReact](https://primereact.org) + PrimeFlex |
| Database | PostgreSQL via [Prisma ORM](https://www.prisma.io) |
| AI | [OpenAI API](https://platform.openai.com) |
| Scraping | [Puppeteer](https://pptr.dev) |
| Language | TypeScript |

## Prerequisites

- Node.js 20+
- PostgreSQL database
- OpenAI API key
- Useme account credentials

## Getting Started

### 1. Clone and install dependencies

```bash
git clone https://github.com/Brunoiooo/job-finder.git
cd job-finder
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `OPENAI_API_KEY` | Your OpenAI API key |
| `OPENAI_API_MODEL` | *(optional)* Model to use, defaults to `gpt-3.5-turbo` |
| `USEME_EMAIL` | Your Useme login email |
| `USEME_PASSWORD` | Your Useme login password |
| `USEME_PAYMENT` | Minimum payment threshold (PLN) for job filtering |
| `USEME_WORK_DAYS` | Estimated delivery days shown in offers |
| `DEBUG` | *(optional)* Set to `1` to enable verbose logging |

### 3. Set up the database

```bash
npx prisma migrate deploy
npx prisma generate
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the dashboard.

## Usage

The dashboard exposes four main actions:

1. **Scrap Useme** — Crawls Useme job categories and saves new listings to the database.
2. **Verify Offers** — Sends each unprocessed job to OpenAI to decide whether it's a good fit (based on your configured prompts).
3. **Generate Offers** — Uses OpenAI to write a personalised application message for every verified job.
4. **Send Offers** — Logs into Useme via Puppeteer and submits the generated offers.

You can also manage per-source prompts and ignore-list rules from the **Prompts** page (`/prompts`).

## Project Structure

```
src/
├── app/                # Next.js App Router pages
│   ├── page.tsx        # Main dashboard
│   └── prompts/        # Prompt management page
├── actions/            # Next.js Server Actions (one per pipeline step)
├── components/         # React UI components
├── services/
│   ├── scraper/        # Puppeteer-based Useme scraper
│   ├── generateOffer/  # OpenAI offer generation
│   ├── verifyOffer/    # OpenAI job verification
│   └── sendOffer/      # Puppeteer-based offer submission
└── lib/                # Shared utilities
prisma/
└── schema.prisma       # Database schema (Job, Prompt, IgnorePrompt, …)
```

## Available Scripts

```bash
npm run dev      # Start development server (Turbopack)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Database Schema

The main models are:

- **Job** — a scraped listing with its URL, AI-generated summary, offer text, and send/ignore status.
- **Prompt** — ordered prompt fragments sent to OpenAI per source (e.g. Useme).
- **IgnorePrompt** — prompt rules that tell the AI which jobs to skip.
- **UsemeCategories** — Useme category URLs to scrape.
