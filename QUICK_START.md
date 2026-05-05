# Quick Start Guide

Get your Market Risk Dashboard running in 5 minutes.

## 1. Prerequisites Check

Open PowerShell and verify Python is installed:
```powershell
python --version
```

If not installed, download from [python.org](https://www.python.org/) (3.9 or higher).

---

## 2. Installation

### Option A: Run the Batch Script (Easiest)

Double-click `start.bat` in the project folder. It will:
- Install dependencies
- Start the backend server
- Start the frontend server
- Open in browser

Both servers will be running in the background.

**To stop:** Close the two terminal windows that opened.

---

### Option B: Manual Setup

1. **Install dependencies:**
```powershell
cd backend
pip install -r requirements.txt
```

2. **Start backend (Terminal 1):**
```powershell
cd backend
python app.py
```
You'll see: `Running on http://127.0.0.1:5000`

3. **Start frontend (Terminal 2):**
```powershell
cd frontend
python -m http.server 8000
```
You'll see: `Serving HTTP on 0.0.0.0 port 8000`

4. **Open browser:**
Navigate to `http://127.0.0.1:8000`

---

## 3. First Run

When the dashboard loads:

1. **Click "🔄 Refresh Now"** — fetches live data from Yahoo Finance
2. **Watch the risk score update** — weighted blend of 6 indicators
3. **Check the red cards** — see which indicators are elevated
4. **Scroll down** — view 30-day trends and raw data table

**Note:** First load takes 30-60 seconds (downloading 1+ year of data for trend calculations).

---

## 4. Interpreting the Dashboard

### Risk Score (Top Card)
- **0-20:** Green zone, market healthy
- **20-40:** Blue zone, normal variability
- **40-60:** Orange zone, elevated risk—pay attention
- **60-80:** Red zone, significant stress
- **80-100:** Dark red, systemic warning

### 8 Indicator Cards
Each shows:
- **Current value** (e.g., Mag7 weight at 32%)
- **Threshold** (e.g., red at 35%)
- **Trend** (✅ = normal, ⚠️ = elevated)

### 4 Charts
- **Mag7 weight** — concentration risk
- **VIX** — market fear
- **Shiller P/E** — valuation extremes
- **Equity Risk Premium** — real return compensation

---

## 5. Check Your Risk Score Daily

**Morning routine (5 mins):**
1. Open dashboard
2. Note the risk score
3. Glance at which component is flashing (concentration? valuation? breadth?)
4. Read one financial news headline to cross-check

**Your action thresholds (pre-commit these):**
- Risk score > 65 → Review portfolio hedges
- Risk score > 75 → Consider reducing equity exposure by 15%
- Risk score > 85 → Major de-risk (this would be rare)

---

## 6. Data Updates

**Automatic:** Runs daily at 4 PM UTC (after US markets close)

**Manual:** Click "🔄 Refresh Now" anytime to get latest data

**Historical:** Keeps 2 years of data in `backend/data/history.json`

---

## 7. Troubleshooting

| Problem | Fix |
|---------|-----|
| "Connection refused" error | Make sure backend is running (check Terminal 1) |
| No data loading in dashboard | Wait 30-60 sec on first load, then refresh browser (F5) |
| "ModuleNotFoundError: No module named 'yfinance'" | Run `pip install -r requirements.txt` again |
| Dashboard stays blank | Press F12 → Console tab → check for red error messages |
| Old data stuck in charts | Delete `backend/data/history.json` and refresh |

---

## 8. Next Steps

### This Week
- [ ] Run dashboard daily for 3 days
- [ ] Note which indicators move most
- [ ] Document your risk tolerance thresholds

### Next Week
- [ ] Review ENHANCEMENTS.md for adding FRED unemployment data
- [ ] Consider adding email alerts when risk > 70
- [ ] Export raw data and compare to VIX term structure (you'll see correlations)

### Later
- [ ] Backtest: compare historical risk score to actual S&P 500 drawdowns
- [ ] Add BDC stress tracking (quarterly updates)
- [ ] Set up automated alerts

---

## 9. Key Files Reference

```
📁 Project Root
├── start.bat                   ← Run this to start everything
├── README.md                   ← Full documentation
├── ENHANCEMENTS.md             ← How to add more indicators
│
├── 📁 backend/
│   ├── app.py                  ← Flask server (API endpoints)
│   ├── data_fetcher.py         ← Fetches from Yahoo Finance
│   ├── config.json             ← Thresholds & weights
│   ├── requirements.txt         ← Python dependencies
│   └── 📁 data/
│       └── history.json        ← 2 years of historical data (auto-saved)
│
└── 📁 frontend/
    ├── index.html              ← Dashboard UI
    ├── style.css               ← Styling
    └── script.js               ← Dashboard logic & charts
```

---

## 10. Understanding Your Data Sources

All data currently comes from **Yahoo Finance** (free, real-time):
- S&P 500 index & top 10 components
- Magnificent 7 stocks
- VIX volatility index
- Treasury yields
- Market breadth proxies

**Limitations:**
- No paid APIs yet (Bloomberg, FactSet, FRED)
- Some indicators are approximations
- Unemployment rate requires manual entry

See **ENHANCEMENTS.md** for how to add more sources.

---

## Questions?

Check README.md for detailed explanation of each indicator.

Check ENHANCEMENTS.md to add FRED data, BDC tracking, or GPU capex signals.

---

**You're ready.** Run `start.bat` and build your risk intelligence. 🚀
