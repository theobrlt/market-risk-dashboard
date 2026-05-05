# Market Risk Dashboard

A lightweight financial dashboard that tracks systemic market risk indicators aligned with your investment thesis:
- Tech concentration (Magnificent 7)
- Valuation extremes (Shiller P/E)
- Passive flow dynamics (market breadth, VIX)
- AI capex strains (equity risk premium proxy)
- Credit cycle stress (yield curve, spreads)
- Macro detachment (unemployment, breadth)

## Architecture

**Backend:** Python Flask + APScheduler
- Fetches daily financial data from Yahoo Finance and public APIs
- Calculates composite risk score
- Stores 2-year historical data (JSON)
- Auto-updates daily at 16:00 UTC (after US market close)

**Frontend:** Vanilla HTML/CSS/JavaScript + Chart.js
- Real-time dashboard with 8 key indicators
- 4 historical trend charts (30-day rolling)
- Composite risk score gauge
- Raw data table for transparency

## Installation

### Prerequisites
- Python 3.9+
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Setup

1. **Install Python dependencies:**
```bash
cd backend
pip install -r requirements.txt
```

2. **Start the backend:**
```bash
python app.py
```
The backend will run on `http://127.0.0.1:5000`

3. **Open the frontend:**
Open `frontend/index.html` in your browser (or serve with `python -m http.server 8000` from frontend folder)

## Indicators Explained

### Concentration Risk
**Magnificent 7 Weight** - Combined market cap of MSFT, AAPL, NVDA, TSLA, GOOGL, AMZN, META as % of S&P 500
- Threshold: 35% (elevated risk)
- Source: Yahoo Finance

### Valuation Risk
**Shiller P/E Ratio** - Cyclically-adjusted P/E for historical comparison
- Threshold: 30 (elevated)
- Source: Yahoo Finance (approximated via trailing P/E)

### Volatility Risk
**VIX** - CBOE Volatility Index (options market implied volatility)
- Threshold: 20 (elevated)
- Source: Yahoo Finance

### Liquidity Risk
**Market Breadth** - % of S&P 500 stocks trading above 200-day moving average
- Threshold: 50% (below = deteriorating breadth)
- Source: Yahoo Finance (S&P 500 proxy)

### Yield Curve Risk
**10Y-2Y Spread** - Difference between 10-year and 2-year Treasury yields
- Threshold: 0 (inversion signals recession risk)
- Source: Yahoo Finance

### Equity Risk Premium
**Earnings Yield - Risk-Free Rate** - Real compensation for equity risk
- Threshold: 2% (below = equities priced for perfection)
- Source: Yahoo Finance (1/P/E - 10Y yield)

### Credit Risk
**HY Spread Proxy** - High-yield ETF (HYG) price as proxy for credit market stress
- Rising = less stress; Falling = more stress
- Source: Yahoo Finance

### Macro Signals
**Unemployment Rate** - Latest available (requires manual update)
- Watch for Sahm Rule: +0.5% from 12-month low
- Source: Manual entry (future: FRED API integration)

## Composite Risk Score

Weighted calculation combining:
- Concentration (20%) → above 35% Mag7 weight
- Valuation (25%) → above 30 Shiller P/E
- Volatility (20%) → above 20 VIX
- Liquidity (15%) → below 50% breadth
- Yield Curve (10%) → inversion signals
- Credit (10%) → widening spreads proxy

**Interpretation:**
- 0-20: Low (healthy conditions)
- 20-40: Moderate (normal variability)
- 40-60: Elevated (monitor closely)
- 60-80: High (significant stress)
- 80-100: Critical (systemic risk warning)

## Data Storage

Historical data is stored in `backend/data/history.json`:
```json
{
  "2026-05-05": {
    "timestamp": "2026-05-05T16:00:00",
    "mag7_weight": 32.4,
    "shiller_pe": 28.5,
    "vix": 16.2,
    "breadth": 55.0,
    "yield_curve_spread": 0.35,
    "equity_risk_premium": 2.1,
    ...
  },
  ...
}
```

Last 2 years automatically retained; older data pruned.

## Scheduled Updates

Backend updates automatically at **16:00 UTC** (4 PM London / 12 PM EDT / 9 AM PDT) daily via APScheduler. Manual refresh available via "🔄 Refresh Now" button.

## API Endpoints

| Endpoint | Method | Response |
|----------|--------|----------|
| `/api/current` | GET | Current indicator values |
| `/api/history` | GET | Full historical data (JSON) |
| `/api/risk-score` | GET | Composite risk score + components |
| `/api/update` | POST | Force manual update |
| `/health` | GET | Health check |

## Limitations & Future Improvements

**Current Limitations:**
- No paid API keys → some indicators are approximations (Shiller P/E via trailing P/E)
- No direct access to ETF flows, margin debt, or HY spreads (these require paid APIs)
- Unemployment rate requires manual updates
- GPU utilization data not included (requires proprietary data)

**Future Enhancements (if funding permits):**
- FRED API integration (unemployment, money supply, ISM PMI)
- Alpha Vantage premium (institutional breadth data)
- BDC NAV tracking (Ares Capital, Blue Owl, Blackstone private credit)
- GPU market pricing (CoreWeave spreads, secondary market GPUs)
- Subscription line volumes (JPM, Citi, Goldman bank 10-Q disclosures)
- Email alerts when risk score crosses thresholds

## Usage Tips

1. **Establish baselines** - Note where indicators sit during "normal" market conditions
2. **Require confirmation** - Don't act on single indicator signals; wait for multiple to align
3. **Separate conditioning vs trigger** - Concentration & valuation = setup; spreads & claims = trigger
4. **Pre-commit thresholds** - Write down your action plan in advance (e.g., "reduce 20% equity if risk score > 70")
5. **Track false positives** - This setup will flash false signals; document them to calibrate future responses

## Example Workflow

**Monday morning:**
1. Open dashboard
2. Check composite risk score
3. Review which components are driving risk
4. Cross-check with latest macro news (Fed, earnings, geopolitics)
5. Update portfolio hedges if multiple indicators aligned

**Weekly (optional):**
- Export raw data table for deeper analysis
- Compare current levels to historical averages (z-scores)

**Quarterly:**
- Review false positives/negatives from prior quarter
- Recalibrate component weights based on what actually predicted moves

## Support

To troubleshoot:

1. **Backend won't start** - Check Python version (`python --version`), then reinstall deps (`pip install -r requirements.txt --force-reinstall`)
2. **No data loading** - Verify backend is running on port 5000 (`curl http://127.0.0.1:5000/health`)
3. **Charts not updating** - Clear browser cache (Ctrl+Shift+Delete), then refresh
4. **Old data stuck in history** - Delete `backend/data/history.json` to reset

## License

Personal use. Do not redistribute or monetize.
