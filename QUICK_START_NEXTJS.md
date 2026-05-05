# Quick Start - Next.js Version

Get the dashboard running locally in 3 minutes.

## 1. Install Node.js

If not installed, download from [nodejs.org](https://nodejs.org) (LTS version recommended).

Verify:
```bash
node --version  # Should be v18+
npm --version   # Should be v9+
```

## 2. Install Dependencies

From the project root:

```bash
npm install
```

This installs:
- Next.js framework
- React for UI
- Chart.js for graphs
- Axios for API calls

Takes ~1-2 minutes.

## 3. Run Dev Server

```bash
npm run dev
```

You'll see:
```
> ready started server on 0.0.0.0:3000, url: http://localhost:3000
```

## 4. Open Browser

Navigate to: **http://localhost:3000**

You should see the dashboard immediately.

---

## Using the Dashboard

### First Load
- Might take 30-60 seconds (fetching data)
- Click "🔄 Refresh Now" to force update
- Charts appear after data loads

### Check Real-Time Data
- All 8 indicators update live from Yahoo Finance
- Risk score recalculates automatically
- Trends show last 30 days

### Make Changes
Edit any file and it auto-refreshes:

```typescript
// app/page.tsx - Change the title
<h1>My Risk Monitor 📊</h1>

// app/api/current/route.ts - Change data logic
// lib/dataFetcher.ts - Add new indicators
```

Save and refresh browser → changes appear instantly.

---

## Common Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Check for errors
npm run lint
```

---

## Deploy to Vercel

When ready to go live (1 click):

1. Push to GitHub:
```bash
git add .
git commit -m "Dashboard ready"
git push origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Import GitHub repo
4. Click "Deploy"

Done. Your dashboard is live. 🚀

See [DEPLOY_VERCEL.md](DEPLOY_VERCEL.md) for details.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "Module not found" error | Run `npm install` again |
| Port 3000 already in use | Run on different port: `npm run dev -- -p 3001` |
| No data appearing | Check browser console (F12) for errors |
| Slow first load | Yahoo Finance rate limiting—takes 30-60s first time |

---

## File Structure

```
app/
├── page.tsx              ← Dashboard UI (React component)
├── layout.tsx            ← HTML head/body
├── globals.css           ← Styling
└── api/
    ├── current/          ← API: get live indicators
    ├── history/          ← API: get historical data
    ├── risk-score/       ← API: calculate risk score
    └── update/           ← API: manual refresh

lib/
├── dataFetcher.ts        ← Fetch from Yahoo Finance
├── storage.ts            ← Save/load history
└── indicators.ts         ← Calculate metrics

package.json              ← Dependencies & scripts
tsconfig.json             ← TypeScript config
next.config.js            ← Next.js config
```

---

## Next Steps

1. **Test locally** — Run `npm run dev` and explore
2. **Make changes** — Edit components, watch reload
3. **Add FRED data** — See ENHANCEMENTS.md
4. **Deploy** — Follow DEPLOY_VERCEL.md

---

That's it. You're running a production-grade dashboard locally. 🎉

Questions? See README.md for full docs.
