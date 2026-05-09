# ⚡ EnerX — Green Energy Intelligence Platform

India's first platform that converts rooftop solar generation into verified carbon credits, ESG compliance reports, and real retail rewards.

---

## 🚀 Deploy in 5 Steps (Free)

### Step 1 — Clone & Install

```bash
git clone https://github.com/yourusername/energx.git
cd energx
npm install
```

### Step 2 — Set Up Supabase (Free)

1. Go to [supabase.com](https://supabase.com) → Create new project
2. Go to **SQL Editor** → Paste contents of `supabase-schema.sql` → Run
3. Go to **Settings → API** → Copy your Project URL and anon key

### Step 3 — Add Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 4 — Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Step 5 — Deploy to Vercel (Free)

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) → Import Project → Add env variables → Deploy.

---

## 📁 Project Structure

```
energx/
├── app/
│   ├── page.tsx              # Landing page (public)
│   ├── login/page.tsx        # Login & Register
│   ├── dashboard/
│   │   ├── page.tsx          # User dashboard
│   │   ├── credits/          # EXC credits & redemption
│   │   ├── esg/              # ESG report generator
│   │   ├── leaderboard/      # Household rankings
│   │   ├── map/              # Network map
│   │   └── settings/         # Account settings
│   ├── corporate/
│   │   ├── page.tsx          # Corporate ESG overview
│   │   ├── reports/          # Download ESG reports
│   │   └── households/       # Pilot household data
│   └── admin/
│       ├── page.tsx          # Admin overview
│       ├── users/            # User management
│       └── analytics/        # Platform analytics
├── components/
│   ├── landing/Navbar.tsx
│   └── dashboard/Sidebar.tsx
├── lib/
│   ├── supabase.ts           # Supabase client
│   └── solar.ts              # Carbon calculations
├── types/index.ts            # TypeScript types
└── supabase-schema.sql       # Database schema
```

---

## 🧮 Carbon Calculations

All calculations use official India government standards:

| Formula | Source |
|---------|--------|
| 1 kWh = 0.82 kg CO₂ avoided | CEA India Grid Emission Factor 2023 |
| 1 Carbon Credit = 1 tonne CO₂ = 1,000 kg | BEE CCTS 2023 |
| 1 CCC = ₹900 avg | Govt CCTS voluntary market rate |
| 10 EXC per kWh | EnerX internal credit rate |

---

## 🔌 Connecting Real Inverters

Replace the simulation in `lib/solar.ts` with real API calls:

**Growatt API:**
```typescript
const response = await fetch('https://openapi.growatt.com/v1/device/datalogger/list', {
  headers: { 'token': process.env.GROWATT_TOKEN! }
})
```

**Solis API:**
```typescript
// Solis uses HMAC-SHA1 auth
// Docs: https://solis-service.solisinverters.com/en/support/
```

---

## 💰 Revenue Model

| Stream | Target | Price |
|--------|--------|-------|
| Corporate ESG Pilots | Listed companies (BRSR) | ₹75K–₹5L/pilot |
| B2B SaaS Dashboard | DISCOMs, Smart Cities | ₹50K–₹2L/month |
| Partner Listing Fees | Fuel stations, retailers | ₹10K–₹50K/month |
| Carbon Credit Sales | Global ESG investors | $5–$15/tonne |
| Data Licensing | ESG rating agencies | ₹5L–₹20L/year |

---

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Styling:** Tailwind CSS
- **Charts:** Chart.js + react-chartjs-2
- **Icons:** Lucide React
- **Hosting:** Vercel (free tier)

---

## 📋 Roadmap

- [x] Landing page
- [x] User authentication
- [x] Solar generation dashboard
- [x] Credit system
- [x] ESG report generator
- [x] Leaderboard
- [x] Map view
- [x] Corporate portal
- [x] Admin panel
- [ ] Real inverter API integrations (Growatt, Solis)
- [ ] Google Maps integration
- [ ] Automated ESG PDF generation
- [ ] Carbon credit marketplace
- [ ] Mobile app (React Native)

---

## 📞 Contact

**EnerX** | Built for India's green energy future  
Email: founder@energx.in  
Website: energx.in
