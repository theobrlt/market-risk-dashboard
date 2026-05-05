# Market Risk Dashboard - Complete Documentation Index

Welcome! This guide will help you navigate the dashboard and understand its indicators.

## 📖 Start Here

1. **[QUICK_START.md](QUICK_START.md)** ← **Read this first (5 min)**
   - Installation (Windows/Mac/Linux)
   - First run walkthrough
   - Troubleshooting

2. **[README.md](README.md)** ← Core documentation
   - Architecture overview
   - Detailed indicator explanations
   - API endpoints
   - Data storage

---

## 🎯 Customization & Thresholds

3. **[THRESHOLDS_GUIDE.md](THRESHOLDS_GUIDE.md)** ← Tune the dashboard to your profile
   - Default thresholds explained
   - Customize by risk profile (conservative/moderate/aggressive)
   - Backtest your settings
   - Change weights in `config.json`

4. **[ENHANCEMENTS.md](ENHANCEMENTS.md)** ← Extend the dashboard
   - Free enhancements (FRED, sector breadth)
   - Paid integrations (Bloomberg, FactSet)
   - GPU/AI capex tracking
   - Architecture for future data sources

---

## 🗂️ Project Structure

```
📁 Market Risk Dashboard
│
├── 📄 INDEX.md                    ← You are here
├── 📄 QUICK_START.md              ← Start here
├── 📄 README.md                   ← Full documentation
├── 📄 THRESHOLDS_GUIDE.md         ← Customize thresholds
├── 📄 ENHANCEMENTS.md             ← Add more data
│
├── start.bat                      ← Run this to start (Windows)
├── start.sh                       ← Or this (Mac/Linux)
│
├── response1.txt                  ← Your first research input
├── response2.txt                  ← Your second research input
│
├── backend/
│   ├── app.py                     ← Flask server
│   ├── data_fetcher.py            ← Data collection logic
│   ├── config.json                ← Thresholds & weights
│   ├── requirements.txt           ← Python dependencies
│   ├── .env.example               ← Environment template
│   └── data/
│       └── history.json           ← 2 years of indicator data (auto-created)
│
└── frontend/
    ├── index.html                 ← Dashboard UI
    ├── style.css                  ← Styling
    └── script.js                  ← Dashboard logic
```

---

## 🚀 Quick Navigation

### I want to...

**Get the dashboard running:**
→ [QUICK_START.md](QUICK_START.md)

**Understand what each indicator means:**
→ [README.md](README.md) - "Indicators Explained" section

**Make the dashboard more conservative/aggressive:**
→ [THRESHOLDS_GUIDE.md](THRESHOLDS_GUIDE.md)

**Add unemployment data / BDC tracking / GPU capex:**
→ [ENHANCEMENTS.md](ENHANCEMENTS.md)

**Learn how the risk score is calculated:**
→ [README.md](README.md) - "Composite Risk Score" section

**See all API endpoints:**
→ [README.md](README.md) - "API Endpoints" section

**Understand your investment thesis mapped to indicators:**
→ Both [README.md](README.md) and [THRESHOLDS_GUIDE.md](THRESHOLDS_GUIDE.md)

---

## 📊 The 8 Indicators at a Glance

| # | Indicator | Measures | Threshold | Your Thesis |
|---|-----------|----------|-----------|-------------|
| 1 | **Mag7 Weight** | Concentration | 35% | Tech concentration risk |
| 2 | **Shiller P/E** | Valuation | 30 | Bubble extremes |
| 3 | **VIX** | Fear/Volatility | 20 | Market stress |
| 4 | **Breadth** | Participation | 50% | Passive flow damage |
| 5 | **10Y-2Y Spread** | Recession signal | 0% | Macro detachment |
| 6 | **ERP** | Risk compensation | 2% | Pricing perfection |
| 7 | **HY Spreads** | Credit stress | Varies | Private credit opacity |
| 8 | **Unemployment** | Macro health | Manual | Real economy |

**Full details:** See [README.md](README.md) > "Indicators Explained"

---

## 🔄 Daily Workflow

### Morning (5 min)
1. Open dashboard
2. Check risk score at top
3. Note which indicator is flashing
4. Glance at one financial headline

### Weekly (30 min)
1. Export raw data table to CSV
2. Calculate z-scores for each indicator vs 90-day average
3. Identify divergences (e.g., VIX low but breadth declining)
4. Update your portfolio if needed

### Monthly (1 hour)
1. Review the 4 trend charts
2. Compare current levels to 12-month and 24-month averages
3. Backtest: "What would my risk score have been in March 2023?"
4. Adjust thresholds if needed based on false positives

### Quarterly (2 hours)
1. Check for new BDC defaults or GPU capex changes
2. Manually update `backend/manual_data.json` if enhanced
3. Recalibrate component weights if one is dominating wrongly
4. Document any market moves you didn't anticipate

---

## 🎓 Educational Path

If you're new to market risk monitoring:

1. Read [QUICK_START.md](QUICK_START.md) → Run it → Explore dashboard
2. Pick **one indicator** (e.g., Shiller P/E) → Study [README.md](README.md) explanation
3. Check [THRESHOLDS_GUIDE.md](THRESHOLDS_GUIDE.md) → Understand why thresholds are set where they are
4. Go through [ENHANCEMENTS.md](ENHANCEMENTS.md) → See what's possible with paid APIs
5. Run dashboard for 2-4 weeks, track your predictions vs actual market moves
6. Adjust thresholds based on what actually works for your decision-making

---

## 💡 Key Principles

From your two research responses, this dashboard embodies:

✅ **Track the setup, not the timing**
- Concentration (Mag7 35%+) = setup for sharp reversal
- But could persist for years; don't short too early
- Use as conditioning, not trigger

✅ **Confirm across categories**
- Single indicator flashing = noise
- Mag7 + VIX compression + breadth decline + narrowing ERP = signal

✅ **Separate conditioning from triggers**
- Valuation & concentration = conditioning (present for months)
- Credit spreads, breadth, jobless claims = triggers (move in days/weeks)

✅ **Pre-commit your thresholds**
- Write down: "If risk score > 70 for 2 weeks AND breadth < 45%, I reduce by 15%"
- Without this, you'll rationalize inaction when signals flash

✅ **Track false positives honestly**
- This dashboard will flash signals in 2023, 2019, 2018 that don't presage crashes
- Log them; use them to calibrate future responses
- Dashboard that "predicted" all false alarms + one real crash barely beats chance

---

## 🔗 External Resources

To deepen your understanding:

**Market Concentration:**
- Research: National Bureau of Economic Research on "Concentration & Returns"
- Data: S&P Dow Jones Indices concentration reports

**Shiller P/E & Valuation:**
- Original research: Shiller (2000, 2015)
- Dashboard: multpl.com for real-time Shiller P/E

**Breadth & Market Structure:**
- VIX term structure: CBOE website
- NYSE Advance-Decline: Finance.yahoo.com

**Private Credit & BDCs:**
- BDC investor presentations: Quarterly earnings calls
- Data: SEC EDGAR for 10-Q filings

**Passive Flows:**
- ICI reports: Weekly ETF flows (ici.org)
- Fed Z.1 report: Quarterly household holdings

---

## ❓ FAQ

**Q: Can this predict market crashes?**
A: No. It can identify *elevated risk setup* 3-6 weeks before moves, but crashes are often triggered by surprises (Fed pivot, geopolitical shock). Use for risk management, not timing.

**Q: My risk score stayed at 65 for 3 months but market went up. Why?**
A: Because markets can stay irrational. Your score says "conditions are fragile" — it doesn't say when the crack happens. Could take months. See THRESHOLDS_GUIDE for profiles that are more selective.

**Q: Should I buy puts when risk score hits 70?**
A: Depends on your time horizon. Put premium decays fast. Better use: reduce equity exposure by 10-15% gradually, set tighter stops, hedge specific sector concentration.

**Q: How often should I update the dashboard?**
A: It updates automatically at 4 PM UTC daily. Manually refresh if you want intraday. Hourly updates aren't useful (noise).

**Q: Can I add my own indicators?**
A: Yes! See ENHANCEMENTS.md. Or edit `backend/data_fetcher.py` to add new methods, then update `backend/app.py` API endpoint.

---

## 🆘 Support

**Dashboard won't start:**
→ See "Troubleshooting" in [QUICK_START.md](QUICK_START.md)

**Don't understand an indicator:**
→ See [README.md](README.md) > "Indicators Explained"

**Want to customize thresholds:**
→ See [THRESHOLDS_GUIDE.md](THRESHOLDS_GUIDE.md)

**Want to add FRED/Bloomberg data:**
→ See [ENHANCEMENTS.md](ENHANCEMENTS.md)

**Have a bug or feature request:**
→ Edit `config.json` or `data_fetcher.py` directly (it's all yours)

---

## 📝 Your Next Steps

1. **This hour:** Run `start.bat` and get the dashboard loading
2. **Today:** Spend 20 minutes exploring the 8 indicators
3. **This week:** Read [THRESHOLDS_GUIDE.md](THRESHOLDS_GUIDE.md) and pick your profile (conservative/moderate/aggressive)
4. **This month:** Run daily and see which indicators move together in real time
5. **This quarter:** Backtest your thresholds; adjust based on predictive power

---

Good luck. You now have a structured framework to monitor systemic risk aligned with your thesis. Use it to manage portfolio risk, not to time crashes.

**Questions?** Everything is documented above. Start with [QUICK_START.md](QUICK_START.md).

🚀 **Ready to run?** Type: `start.bat` (Windows) or `bash start.sh` (Mac/Linux)
