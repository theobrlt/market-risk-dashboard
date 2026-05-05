# Deploying to Vercel (1-Click Deploy)

This app is built with **Next.js** and ready to deploy on **Vercel** with a single click.

## Prerequisites

- GitHub account
- Vercel account (free)
- This code pushed to your GitHub repository

## Setup Steps

### 1. Push to GitHub

Make sure your code is in a GitHub repo. From the project root:

```bash
git init
git add .
git commit -m "Initial commit: Market Risk Dashboard in Next.js"
git remote add origin https://github.com/YOUR-USERNAME/market-risk-dashboard.git
git branch -M main
git push -u origin main
```

### 2. Connect Vercel to GitHub

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub (authorize the connection)
3. Click "Add New..." → "Project"
4. Select your GitHub repo (`market-risk-dashboard`)
5. Click "Import"

### 3. Configuration (Optional)

Vercel auto-detects Next.js. You can leave defaults as-is.

**For persistent data storage** (optional):
- In Vercel dashboard, go to your project
- Click "Storage" → "Create Database" → "KV"
- Copy the `.env.local` values
- Add them to Vercel project settings → "Environment Variables"

Without KV, data is cached in memory (resets on redeploy, fine for demo).

### 4. Deploy

Click "Deploy" and wait ~2 minutes. Vercel will:
- Build the Next.js app
- Deploy to global CDN
- Give you a live URL

Your dashboard is now live at: `https://your-project.vercel.app`

---

## Auto-Deploy on Push

Every time you push to GitHub:
```bash
git push origin main
```

Vercel automatically rebuilds and redeploys. No manual steps needed.

---

## Local Development

### First Time Setup

```bash
# Install dependencies
npm install

# Create .env.local (copy from .env.local.example)
cp .env.local.example .env.local

# Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Make Changes

Edit files and they'll auto-refresh:
- `app/page.tsx` — Dashboard UI
- `app/api/` — Backend API routes
- `lib/` — Utility functions
- `app/globals.css` — Styling

### Push to Deploy

```bash
git add .
git commit -m "Update: fix indicators"
git push origin main
```

Vercel deploys automatically.

---

## Troubleshooting

### "No price data found" errors

Yahoo Finance API has limits. The data fetcher includes retries, but:
- First load might be slow (30-60 seconds)
- Subsequent requests use cache
- Errors are logged in Vercel dashboard

**To check logs:**
1. Go to Vercel project dashboard
2. Click "Deployments" → Latest deployment → "Logs"
3. Look for data fetcher output

### Data not appearing after deploy

Check:
1. Vercel logs (see above)
2. Browser console (F12 → Console tab)
3. Network tab (F12 → Network) — see API responses

### Want persistent data?

Add Vercel KV:
1. Project settings → Storage → Create KV database
2. Copy env vars to project settings
3. Redeploy

Without KV, data resets on each deploy (fine for demo, not ideal for production).

---

## Production Checklist

Before sharing with others:

- [ ] Test on Vercel (not just local)
- [ ] Check all 8 indicators load
- [ ] Risk score calculates
- [ ] Charts appear for last 30 days
- [ ] "Refresh Now" button works
- [ ] Mobile responsive (test on phone)

---

## Sharing Your Dashboard

Share the live URL with friends:
```
https://your-project.vercel.app
```

They can:
- View real-time risk score
- See 30-day trend charts
- Click "Refresh Now" for latest data
- Access from phone/tablet

No installation needed. Just a link.

---

## Monitoring Your Dashboard

**Optional: Email alerts when risk > 70**

Edit `app/api/update/route.ts` to add:
```typescript
if (riskScore > 70) {
  // Send email alert
  await sendAlert('Risk score critical!');
}
```

(Requires email service like SendGrid or Nodemailer)

---

## Cost

**Vercel Free Plan includes:**
- Unlimited deployments
- Unlimited API calls
- 100 GB bandwidth/month
- 6 GB storage (KV)

**Your app will:**
- Cost $0/month (well within free limits)
- Deploy in <2 minutes on every push
- Auto-scale if traffic spikes

---

## Next Steps

1. Create GitHub repo and push code
2. Sign up on Vercel
3. Connect repo and deploy
4. Share live URL with friends
5. Monitor dashboard daily

**That's it.** You now have a live, shareable market risk dashboard. 🚀

---

## Support

**Issue:** Deployment fails
→ Check Vercel logs for errors

**Issue:** Data not loading
→ Check browser console (F12) for API errors

**Issue:** Want to add FRED data
→ See ENHANCEMENTS.md (same as Flask version)

**Issue:** Want custom domain
→ Vercel settings → Domains → Connect your domain

---

Questions? Check the original README.md for indicator explanations.
