# EcoSave AI

A frontend prototype for tracking household water and electricity consumption.

EcoSave AI brings consumption data, reports, alerts, and recommendations into one dashboard. The current version focuses on the user interface and application flow, while backend persistence, real authentication, and AI-assisted recommendations are planned for later development.

**Live Demo:** https://eco-save-ai.vercel.app

## Current Features

- Water and electricity consumption dashboard
- Weekly and monthly usage charts
- Estimated savings and Eco Score
- Daily consumption data entry
- Reports and usage comparisons
- Recommendations interface
- Alerts interface
- Login and registration flow
- Responsive desktop and mobile navigation
- Production deployment on Vercel

## Demo Notes

The current authentication flow is simulated on the client side and is not connected to a real authentication service yet.

Consumption entries are stored only during the current session and are not persisted to a database.

The recommendations and AI-related content currently use sample data. A real AI recommendation engine is planned for a later stage.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts
- Radix UI
- Lucide React
- Vercel

## Project Structure

- `app/` — application entry point and global styles
- `components/screens/` — dashboard, reports, data entry, alerts, recommendations, login and registration
- `components/layout/` — shared layout and navigation
- `components/ui/` — reusable UI components
- `contexts/` — client-side navigation and authentication state

## Run Locally

```bash
git clone https://github.com/saifMAS/EcoSave-AI.git
cd EcoSave-AI
npm install
npm run dev
