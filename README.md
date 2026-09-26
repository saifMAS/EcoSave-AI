# EcoSave AI

A frontend prototype for monitoring household water and electricity consumption.

EcoSave AI brings consumption data, reports, alerts, and recommendations into one dashboard. The current version focuses on the user interface and application flow, with backend persistence and AI-assisted recommendations planned for later development.

**Live demo:** https://eco-save-ai.vercel.app

## What works today

- Water and electricity consumption dashboard
- Weekly and monthly usage charts
- Estimated savings and Eco Score
- Daily consumption data entry
- Reports and usage comparisons
- Recommendations interface
- Alerts interface
- Login and registration flow
- Responsive navigation for desktop and mobile
- Production deployment on Vercel

## Demo notes

The current authentication flow is a frontend prototype and is not connected to a real authentication service yet.

Consumption data entered through the application is stored only in the current client session and is not persisted to a database.

The AI recommendations and predictions shown in the current build use sample data. A real AI recommendation engine is planned for a later stage.

## Tech stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts
- Radix UI
- Lucide React
- Vercel

## Project structure

The application uses a screen-based frontend architecture.

- `app/` — application entry point and global styles
- `components/screens/` — dashboard, reports, data entry, alerts, recommendations, login and registration
- `components/layout/` — shared application layout and navigation
- `components/ui/` — reusable UI components
- `contexts/` — client-side navigation and authentication state

## Running locally

```bash
git clone https://github.com/saifMAS/EcoSave-AI.git
cd EcoSave-AI
npm install
npm run dev
