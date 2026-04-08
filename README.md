# Bike Networks App

A web application for exploring bicycle sharing networks worldwide. Built with Next.js 15, TypeScript, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Development](#development)
- [Build & Deploy](#build--deploy)
- [Architecture Decisions](#architecture-decisions)
- [Documentation as learning](#documentation-learning)


---

## ✨ Features

### Main View (Network List)
- 🌍 **Browse all bicycle networks** worldwide
  - Network name
  - Location (city and country)
  - Operating companies (displays multiple companies)
  - Direct link to detail view
- 📱 **Fully responsive design** (mobile, tablet, desktop)
- ⚡ **Fast loading** with Next.js Server Components
- 🎨 **Modern UI** with shadcn/ui components
- 🔗 **URL-based navigation** with proper routing

### Detail View (Network Stations)
- 🚴 **General network information**
  - Network name
  - Operating companies (multiple companies supported)
  - Location (city and country)
- 📊 **Complete stations list** with:
  - Station name
  - Number of free bikes
  - Number of empty slots
- 🔄 **Sortable table** (BONUS feature)
  - Sort by station name
  - Sort by free bikes (ascending/descending)
  - Sort by empty slots (ascending/descending)
  - 3-state sorting cycle: asc → desc → reset
- ⬅️ **Back navigation** to main view
- 🔗 **URL-accessible** detail pages

### Technical Excellence
- 🎯 **Type safety** with TypeScript throughout
- 🚀 **Performance optimized** with useMemo for expensive operations
- ♿ **Accessible design** with ARIA labels and semantic HTML
- 🎨 **Attention to detail** in styling and interactions
- 📦 **Clean state management** with React hooks
- 🌐 **SEO optimized** with dynamic metadata

---

## Tech Stack

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS

### UI Components
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible components
- **[Lucide React](https://lucide.dev/)** - Icon library


### Data Source
- **[CityBikes API](https://api.citybik.es/v2/)** - Global bike sharing data

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/juanitacalamidades/bike-networks-app.git
   cd bike-networks-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. **Create environment variables** (optional)
   ```bash
   cp .env.example .env.local
   ```
   
   Add the following to `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=https://api.citybik.es/v2
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
   ```
   Get a free Mapbox token at [mapbox.com/signup](https://account.mapbox.com/auth/signup/)

4. Run development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
bike-networks-app/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── networks/
│   │   │   └── [id]/
│   │   │       └── page.tsx     # Network detail page (stations)
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page (network list)
│   │   ├── error.tsx            # Error boundary
│   │   └── globals.css          # Global styles
│   │
│   ├── components/              # React components
│   │   ├── networks/            # Network list components
│   │   │   ├── NetworkCard.tsx
|   |   |   ├── NetworkDetailHeader.tsx
|   |   |   ├── NetworkList.tsx
|   |   |   ├── NetworksHeader.tsx
│   │   │   └── NetworksView.tsx
│   │   ├── stations/            # Station components
│   │   │   └── StationsTable.tsx
│   │   └── ui/                  # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── badge.tsx
│   │       └── ...
│   │
│   ├── lib/                     # Utilities and helpers
│   │   ├── api/                 # API clients
│   │   │   └── citybikes.ts    # CityBikes API client
│   │   └── utils.ts             # Utility functions
│   │
│   └── types/                    # TypeScript definitions
│
├── public/
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## API Reference

### CityBikes API

**Base URL:** `https://api.citybik.es/v2`

#### Get All Networks

```
GET /networks

Response:
{
  networks: [
    {
      id: "bicing",
      name: "Bicing",
      location: {
        city: "Barcelona",
        country: "ES",
        latitude: 41.3850639,
        longitude: 2.1734035
      },
      company: ["ClearChannel"]
    }
  ]
}
```

#### Get Network Details

```
GET /networks/:id

Response:
{
  network: {
    id: "bicing",
    name: "Bicing",
    stations: [
      {
        id: "1",
        name: "Gran Via Corts Catalanes",
        latitude: 41.397952,
        longitude: 2.180042,
        free_bikes: 5,
        empty_slots: 10
      }
    ]
  }
}
```

---

## Development

### Scripts

```bash
# Development server (with Turbopack)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run linter
npm run lint

```

---

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

This creates an optimized production build in `.next/`

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import in Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables
   - Deploy!


**Environment Variables:**
- Add `NEXT_PUBLIC_API_URL` in your platform's settings
- No other variables required for basic functionality

---

## 🏗️ Architecture Decisions

### Why Next.js App Router?

✅ **Server Components by default** - Better performance, less JavaScript sent to client  
✅ **Built-in data fetching** - No need for external state management libraries  
✅ **File-based routing** - Intuitive and automatic  
✅ **SEO friendly** - Server-side rendering by default  
✅ **Modern React features** - Supports latest React 19 capabilities  

### Server Components vs Client Components Strategy

**Server Components (Default):**
```typescript
// app/page.tsx - Fetches data on server
```

**Benefits:**
- Zero JavaScript to client for data fetching
- Direct API access (no need for API routes)
- Better performance on low-end devices
- Improved SEO

**Client Components (When Needed):**
```typescript
'use client'
// StationsTable.tsx - Needs interactivity
```

**Used when:**
- Need React hooks (useState, useEffect, useMemo)
- Need event handlers (onClick, onChange)
- Need browser APIs

### Type Safety with TypeScript

**Union types for flexible API data:**
```typescript
interface Network {
  company: string[] | string | null; // API can return any of these
}

// Type-safe normalization
function normalize(company: string[] | string | null): string[] {
  if (!company) return [];
  if (Array.isArray(company)) return company;
  return [company];
}
```

**Benefits:**
- Catches errors at compile time
- IDE autocomplete
- Self-documenting code
- Prevents runtime errors

### Dynamic Routes with Type Safety

```typescript
// app/networks/[id]/page.tsx
export default async function DetailPage({ 
  params 
}: { 
  params: { id: string } // Type-safe params
}) {
  const network = await getNetworkById(params.id);
  // TypeScript knows params.id is a string
}
```

### Performance Optimizations

**1. Server-side data fetching:**
```typescript
// Happens on server, not client
const networks = await getNetworks();
```

**2. Memoized sorting:**
```typescript
// Only recomputes when needed
const sorted = useMemo(() => sort(data), [data, sortBy]);
```

**3. Component splitting:**
```typescript
// Heavy components are Client Components only when needed
// Lightweight presentation stays Server Components
```

**4. No unnecessary re-renders:**
```typescript
// Immutable patterns ensure React detects changes correctly
const newArray = [...oldArray];
```


---

**Documentation as Learning:**

Throughout the development process, I made it a point to document the code extensively with explanatory comments. Each component includes JSDoc comments describing its purpose, props, and key behaviors. Complex functions have inline comments explaining the reasoning behind specific implementations - particularly around the sorting algorithm, immutability patterns, and state management decisions. This wasn't just about making the code readable for others; writing comments actually helped me internalize the concepts and understand *why* certain patterns are important. I think that the act of explaining the code in plain language forces thinking through decisions more carefully and I believe it is invaluable for both learning and long-term maintainability.

---

## 📧 Contact

**Project Link:** [https://github.com/juanitacalamidades/bike-networks-app](https://github.com/juanitacalamidades/bike-networks-app)

**Live Demo:** [https://bike-networks-app.vercel.app](https://bike-networks-app.vercel.app)





Made with ❤️ and ☕ by yoanna r.
