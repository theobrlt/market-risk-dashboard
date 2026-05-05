# Market Risk Dashboard - Next.js Edition

🚀 **Now with 1-click Vercel deployment**

A real-time financial dashboard tracking systemic market risk aligned with your thesis:
- Tech concentration (Magnificent 7)
- Valuation extremes (Shiller P/E)
- Passive flow dynamics (breadth, VIX)
- Macro detachment (yield curve, unemployment)
- Credit cycle stress (HY spreads)

**Tech Stack:**
- **Frontend:** React + TypeScript (Next.js)
- **Backend:** Node.js API Routes (Next.js)
- **Hosting:** Vercel (free, auto-deploy from GitHub)
- **Data Storage:** Vercel KV (optional, for persistent history)

---

## ⚡ Quick Start (3 Minutes)

### Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open browser
# http://localhost:3000
```

See [QUICK_START_NEXTJS.md](QUICK_START_NEXTJS.md) for detailed walkthrough.

### Deploy to Vercel (1 Click)

1. Push to GitHub:
```bash
git add .
git commit -m "Dashboard ready"
git push origin main
```

2. Go to [vercel.com](https://vercel.com) → Import GitHub repo → Deploy

Done. Your dashboard is live. Every future push auto-deploys.

See [DEPLOY_VERCEL.md](DEPLOY_VERCEL.md) for full instructions.

---

## 📊 The 8 Indicators

| Indicator | Measures | Threshold | Category |
|-----------|----------|-----------|----------|
| **Mag7 Weight** | Tech concentration | 35% | Concentration |
| **Shiller P/E** | Valuation extremes | 30 | Valuation |
| **VIX** | Market fear | 20 | Volatility |
| **Breadth** | Market participation | 50% | Liquidity |
| **10Y-2Y Spread** | Recession signal | 0% | Macro |
| **ERP** | Risk compensation | 2% | Valuation |
| **HY Spreads** | Credit stress | Varies | Credit |
| **Unemployment** | Real economy health | Manual | Macro |

**Composite Risk Score:** Weighted average of above → 0-100 scale

- 0-20: Low (healthy)
- 20-40: Moderate (normal)
- 40-60: Elevated (watch)
- 60-80: High (significant stress)
- 80-100: Critical (systemic warning)

---

## 🏗️ Architecture

```
Next.js App (Vercel)
├── Frontend (React/TypeScript)
│   └── app/page.tsx → Dashboard UI
│
├── Backend (Node.js API Routes)
│   ├── app/api/current → Get live indicators
│   ├── app/api/history → Get historical data (30 day cache)
│   ├── app/api/risk-score → Calculate composite score
│   └── app/api/update → Manual refresh
│
├── Data Layer
│   ├── lib/dataFetcher.ts → Fetch from Yahoo Finance
│   └── lib/storage.ts → Vercel KV (optional) or memory cache
│
└── Styling
    └── app/globals.css → Dark theme CSS
```

**Data Flow:**
1. Browser loads dashboard (app/page.tsx)
2. Fetches `/api/current` for live indicators
3. Fetches `/api/history` for 30-day trends
4. Fetches `/api/risk-score` for composite risk
5. Displays charts (Chart.js) and cards

---

## 🚀 Deployment Options

### Vercel (Recommended - Free & Easiest)
- ✅ 1-click deploy from GitHub
- ✅ Auto-redeploy on push
- ✅ Free tier (unlimited for your use case)
- ✅ Global CDN + instant cache
- ✅ Optional KV storage ($5-10/month if needed)

**Setup:** See [DEPLOY_VERCEL.md](DEPLOY_VERCEL.md)

### Other Platforms (Still Free)
- **Netlify:** Works but requires build script
- **Railway:** Works but less seamless than Vercel
- **Render:** Works but cold starts slower

Vercel is best because it's built for Next.js.

---

## 📱 Sharing Your Dashboard

Once deployed, share the live URL:
```
https://your-project.vercel.app
```

Friends can:
- View real-time risk score from phone
- See trend charts
- Click "Refresh" for latest data
- No installation needed

---

## 🔄 Auto-Refresh Behavior

**In Browser:**
- Data cached for 1 hour locally
- "Refresh Now" bypasses cache

**In Production:**
- Consider adding scheduled refresh (see below)
- Currently requires manual clicks

**Optional: Scheduled Updates**

Add cron job to refresh daily at 4 PM UTC:
```typescript
// api/scheduled/route.ts
import { CronJob } from 'cron';

const job = new CronJob('0 16 * * *', async () => {
  await fetch('/api/update', { method: 'POST' });
});
```

(Requires `npm install cron`)

---

## 📡 Data Sources

**All Free:**
- Yahoo Finance (via yfinance equivalent in JavaScript)
- No API keys required
- Rate limited but sufficient for 1 request/minute

**Optional Enhancements (See ENHANCEMENTS.md):**
- FRED API (unemployment, money supply) — free, requires key
- BDC tracking (quarterly manual updates)
- GPU capex (quarterly from 10-K filings)
- Bloomberg/FactSet (paid, if budget allows)

---

## 🛠️ Development Guide

### Making Changes

Edit files and browser auto-refreshes:

**Dashboard UI:**
```typescript
// app/page.tsx
<h1>My Custom Risk Monitor</h1>
```

**Add new indicator:**
```typescript
// lib/dataFetcher.ts
export async function getCrypto() {
  // Fetch new data
}

// app/api/current/route.ts
indicators.crypto = await getCrypto();
```

**Change styling:**
```css
/* app/globals.css */
--accent-blue: #ff00ff; /* Purple instead */
```

### Build for Production

```bash
npm run build  # Optimizes code
npm start      # Runs locally in production mode
```

Vercel runs this automatically on deploy.

---

## ❌ Known Limitations

1. **Yahoo Finance limits** → First load might be slow (30-60s)
2. **No historical data initially** → Only shows current + future data
3. **Memory-based storage** → Data resets on redeploy (use KV to fix)
4. **No email alerts** → Would require Sendgrid/Mailgun

See [ENHANCEMENTS.md](ENHANCEMENTS.md) for how to fix these.

---

## 📦 What Changed from Flask Version?

| Aspect | Flask | Next.js |
|--------|-------|---------|
| **Language** | Python | TypeScript/JavaScript |
| **Framework** | Flask | Next.js |
| **Deployment** | Render, Railway | Vercel (free) |
| **Database** | JSON file | Vercel KV (optional) |
| **Dev Command** | `python app.py` | `npm run dev` |
| **Deploy Command** | Manual | Git push (auto) |
| **Cost** | $7-15/mo | $0/mo |

**Same:**
- All 8 indicators identical
- Same risk scoring logic
- Same UI/styling
- Same data sources

---

## 🔒 Security

- No sensitive data exposed
- No API keys in code (add to Vercel env if needed)
- `.env.local` in `.gitignore` (never pushed)
- All data from public APIs

---

## 📈 Monitoring Your Deployment

**Check if dashboard is live:**
```bash
curl https://your-project.vercel.app
```

**View deployment logs:**
1. Vercel dashboard → Project → Deployments
2. Click latest deployment
3. View "Build Logs" or "Function Logs"

**Debug data fetch errors:**
1. Open browser DevTools (F12)
2. Network tab → check API responses
3. Console tab → look for errors

---

## 🆘 Troubleshooting

| Issue | Fix |
|-------|-----|
| **npm: command not found** | Install Node.js from nodejs.org |
| **"Module not found"** | Run `npm install` |
| **Port 3000 in use** | Use different port: `npm run dev -- -p 3001` |
| **No data after deploy** | Check Vercel logs (Dashboard → Deployments) |
| **Slow first load** | Yahoo Finance rate limiting—normal, takes 30-60s |
| **Charts blank** | Data might be null; check console (F12) |

---

## 📚 Documentation Files

- **[QUICK_START_NEXTJS.md](QUICK_START_NEXTJS.md)** — Local setup (3 min)
- **[DEPLOY_VERCEL.md](DEPLOY_VERCEL.md)** — Live deployment (1 click)
- **[ENHANCEMENTS.md](ENHANCEMENTS.md)** — Add FRED, BDC, GPU data
- **[THRESHOLDS_GUIDE.md](THRESHOLDS_GUIDE.md)** — Customize risk thresholds
- **[INDEX.md](INDEX.md)** — Navigation hub

---

## 🎯 Next Steps

1. **Run locally:** `npm install && npm run dev`
2. **Test all 8 indicators load**
3. **Create GitHub repo and push**
4. **Deploy to Vercel**
5. **Share URL with friends**
6. **Monitor daily**

---

## 💡 Pro Tips

- Use `/api/update` endpoint to force refresh (helpful for testing)
- Historical data persists in Vercel KV (if enabled)
- Customize thresholds in `config.json` approach (add file if needed)
- Export data table for deeper analysis
- Set browser bookmarks for easy access

---

## 📝 License

Personal use. Do not redistribute.

---

**Ready to deploy?** See [DEPLOY_VERCEL.md](DEPLOY_VERCEL.md) for live dashboard in <5 minutes. 🚀
