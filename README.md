# Bike Networks App

A web application for exploring bicycle sharing networks worldwide. Built with Next.js 15, TypeScript, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

**Live Demo:** [https://bike-networks-app-git-map-juanitas-playground.vercel.app/](https://bike-networks-app-git-map-juanitas-playground.vercel.app/)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Development](#development)

---

## Features

### Interactive Map
- **Persistent Mapbox map** across all routes without remounting
- Global view showing all bicycle networks worldwide
- Detailed view showing all stations for a selected network
- Smooth `flyTo` animations when navigating between networks and stations
- Interactive markers with tooltips displaying:
  - Network/station name
  - City and country (networks)
  - Free bikes and empty slots (stations)
- Custom circular markers for better visualization
- Geolocation control to find networks near you

### Network List
- Browse bicycle sharing networks worldwide
- Display network name, location (city/country), and operating companies
- Responsive grid layout
- Direct navigation to network details
- Paginated navigation for browsing large datasets

### Network Details
- Complete station information
- Sortable columns (name, free bikes, empty slots)
- 3-state sorting: ascending → descending → reset
- Click on any station row to fly to its location on the map
- Back navigation and breadcrumbs

### Technical
- Type-safe with TypeScript
- Performance optimized with useMemo
- Accessible (ARIA labels, semantic HTML)
- SEO friendly with dynamic metadata
- Context-based map state management
- Server and client component separation for optimal performance

---

## Tech Stack

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[React 19](https://react.dev/)** - UI library
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS
- **[Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/)** - Interactive maps
- **[shadcn/ui](https://ui.shadcn.com/)** - Component library
- **[Lucide React](https://lucide.dev/)** - Icons
- **[CityBikes API](https://api.citybik.es/v2/)** - Data source

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

3. Create `.env.local` with your Mapbox token
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
│   │   ├── api/
│   │   │   └── networks/         # API routes
│   │   ├── networks/[id]/        # Network detail pages
│   │   ├── layout.tsx            # Root layout with persistent map
│   │   ├── page.tsx              # Home (network list)
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── map/                  # Map components
│   │   │   ├── MapboxMap.tsx
│   │   │   └── NetworkMapController.tsx
│   │   ├── networks/             # Network components
│   │   ├── stations/             # Station components
│   │   └── ui/                   # shadcn/ui components
│   │
│   ├── context/
│   │   └── MapContext.tsx        # Map state management
│   │
│   ├── lib/
│   │   ├── api/                  # API clients
│   │   └── utils.ts              # Utilities (including map markers)
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
npm run dev      # Development server with Turbopack
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

### Deploy to Vercel

1. Push to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Configure environment variables (optional)
4. Deploy

---

## Contact

**Project:** [github.com/juanitacalamidades/bike-networks-app/tree/map](https://github.com/juanitacalamidades/bike-networks-app/tree/map)

**Live Demo:** [bike-networks-app-git-map-juanitas-playground.vercel.app](https://bike-networks-app-git-map-juanitas-playground.vercel.app/)

---

Made with ❤️ by yoanna
