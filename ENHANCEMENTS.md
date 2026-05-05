# Dashboard Enhancements & Roadmap

This document outlines how to extend the dashboard with additional data sources and indicators aligned with your two-response thesis.

## Phase 1: Free Enhancements (Achievable Now)

### 1. FRED API Integration (Unemployment, Money Supply, ISM PMI)
**File:** `backend/data_fetcher.py` → add method `get_fred_data()`

```python
import fredapi

fred = Fred(api_key='YOUR_FREE_FRED_KEY')  # Free at https://fred.stlouisfed.org

def get_unemployment_rate(self):
    return fred.get('UNRATE')[-1]  # Latest unemployment

def get_money_supply(self):
    return fred.get('M2')[-1]  # M2 growth rate

def get_ism_manufacturing(self):
    return fred.get('MMNRNJ')[-1]  # ISM Manufacturing PMI

def get_initial_claims(self):
    return fred.get('ICSA')[-1] / 1000  # Initial jobless claims (in thousands)

def get_yield_curve_10y2y_precise(self):
    """Replace approximation with actual data"""
    tnx = fred.get('T10Y2Y')[-1]  # 10Y-2Y spread (accurate)
    return tnx
```

**Effort:** 30 mins. Free. Unlocks recession indicators.

---

### 2. Sector Breadth Tracking
**Why:** More granular than S&P 500 breadth—XLK (tech) vs XLV (healthcare) tells you if weakness is broad or just tech.

```python
def get_sector_breadth(self):
    """Track % of each sector above 200-day MA"""
    sectors = {
        'XLK': 'Technology',
        'XLV': 'Healthcare', 
        'XLF': 'Financials',
        'XLE': 'Energy',
        'XLI': 'Industrials',
        'XLY': 'Consumer Discretionary',
        'XLP': 'Consumer Staples',
        'XLRE': 'Real Estate',
        'XLU': 'Utilities'
    }
    
    breadth = {}
    for ticker, name in sectors.items():
        stock = yf.Ticker(ticker)
        hist = stock.history(period='1y')
        ma_200 = hist['Close'].rolling(200).mean().iloc[-1]
        current = hist['Close'].iloc[-1]
        breadth[name] = {'above_ma': current > ma_200, 'price': current}
    
    return breadth
```

**Addition to dashboard:** 9-sector breadth heatmap showing which are healthy vs rolling over.

---

### 3. Margin Debt Tracking (Manual)
**Data:** FINRA publishes margin debt monthly (lagged by ~6 weeks)

**File:** Add `backend/manual_data.json` for quarterly/manual updates

```json
{
  "margin_debt": [
    {"date": "2026-04-01", "billions": 785},
    {"date": "2026-03-01", "billions": 780}
  ],
  "unemployment_rate": [
    {"date": "2026-05-01", "percent": 3.9}
  ]
}
```

**Frontend:** Show trend vs YoY % change. Peaks typically precede crashes by 3-6 months.

---

### 4. Bond Market Indicators (Free)
Add to `data_fetcher.py`:

```python
def get_credit_spreads_proxy(self):
    """Use TLT (20+ year Treasuries) vs HYG (high-yield bonds) spread as poor man's credit spread"""
    tlt = yf.Ticker('TLT')
    hyg = yf.Ticker('HYG')
    
    tlt_hist = tlt.history(period='1d')
    hyg_hist = hyg.history(period='1d')
    
    # Ratio inverted = spread (crude approximation)
    if not tlt_hist.empty and not hyg_hist.empty:
        tlt_price = tlt_hist['Close'].iloc[-1]
        hyg_price = hyg_hist['Close'].iloc[-1]
        return {'tlt': tlt_price, 'hyg': hyg_price, 'ratio': hyg_price / tlt_price}

def get_high_yield_momentum(self):
    """Track HYG momentum vs TLT—when HYG underperforms, credit is tightening"""
    hyg = yf.Ticker('HYG')
    tlt = yf.Ticker('TLT')
    
    hyg_1m = hyg.history(period='1mo')['Close']
    tlt_1m = tlt.history(period='1mo')['Close']
    
    hyg_return = (hyg_1m.iloc[-1] - hyg_1m.iloc[0]) / hyg_1m.iloc[0] * 100
    tlt_return = (tlt_1m.iloc[-1] - tlt_1m.iloc[0]) / tlt_1m.iloc[0] * 100
    
    spread = hyg_return - tlt_return
    return {'hyg_1m_return': hyg_return, 'tlt_1m_return': tlt_return, 'divergence': spread}
```

---

## Phase 2: Paid APIs (Worth Considering)

### Finnhub or Alpha Vantage (Pro)
**Cost:** $200-500/month

**Unlocks:**
- Insider trading activity (executives buying/selling their own stock)
- Earnings calendar & guidance revisions
- News sentiment (AI-tagged bearish/bullish)
- Company filing metadata

```python
import requests

FINNHUB_KEY = os.getenv('FINNHUB_API_KEY')

def get_earnings_revisions(self):
    """Track analyst EPS revisions for S&P 500 companies"""
    # Weighted average revision sentiment
    pass

def get_insider_transactions(self):
    """Rising insider selling = red flag for tech insiders"""
    # Track Mag7 insider selling pressure
    pass
```

---

### Federal Reserve Data (FRED Pro)
**Cost:** Free, but you want authenticated access for rate limits

**Adds:**
- Precise yield curve (10Y-3M, 10Y-2Y)
- Fed balance sheet size (QE indicator)
- Reserve requirements changes
- Loan Officer Opinion Survey (SLOOS) sentiment

```python
from fredapi import Fred

fred = Fred(api_key='YOUR_KEY')

def get_fed_balance_sheet(self):
    """Track Fed's balance sheet size—proxy for monetary ease/tightening"""
    return fred.get('WALCL')[-1] / 1e12  # Trillions of assets

def get_sloos_tightening(self):
    """Senior Loan Officer Opinion Survey—tightening ahead of slowdown"""
    return fred.get('MMNRNJ')[-1]
```

---

### Private Credit Data (Medium Cost: $5-15k/year)
**Sources:**
- **PitchBook** → BDC non-accrual rates, PIK usage, leverage ratios
- **CBRE Real Capital Analytics** → Commercial real estate stress
- **LCD/LSEG LPC** → Leveraged loan defaults, CCC spreads

**Implementation:**
```python
def get_bdc_stress_signals(self):
    """Manual quarterly update from BDC investor presentations"""
    bdc_data = {
        'ares_capital': {'nav_discount': 0.15, 'non_accrual_rate': 0.07},
        'blue_owl': {'nav_discount': 0.18, 'non_accrual_rate': 0.06},
        'blackstone_bdc': {'nav_discount': 0.12, 'non_accrual_rate': 0.05}
    }
    return bdc_data

def get_leveraged_loan_stress(self):
    """Track CCC-rated bond spreads (proxy for distressed LBO market)"""
    # Would require Bloomberg/FactSet terminal
    pass
```

---

### GPU/AI Capex Tracking (Advanced)
**Sources:**
- **SeekingAlpha** → Scrape Capex guidance from earnings transcripts
- **SEC EDGAR** → Parse 10-Q/10-K for depreciation policy changes
- **CoreWeave** (if public) → Credit spreads on GPU lending
- **Equinix/Digital Realty 10-K** → Data center capacity utilization

**Implementation (quarterly):**
```python
def get_hyperscaler_capex_to_fcf(self):
    """Manually extract from quarterly earnings"""
    # Would be updated quarterly from earnings calls
    hyperscalers = {
        'MSFT': {'capex_billions': 60, 'fcf_billions': 80, 'ratio': 0.75},
        'GOOG': {'capex_billions': 45, 'fcf_billions': 75, 'ratio': 0.60},
        'AMZN': {'capex_billions': 65, 'fcf_billions': 55, 'ratio': 1.18},  # > 1 = strain
        'META': {'capex_billions': 38, 'fcf_billions': 25, 'ratio': 1.52}   # High strain
    }
    return hyperscalers

def get_gpu_depreciation_signals(self):
    """Track useful life changes in 10-K"""
    # Manual quarterly review needed
    # Red flag: if MSFT/GOOG/META shorten GPU useful life below 4 years
    pass
```

---

## Phase 3: Integration Architecture

### Current Flow:
```
Backend (Flask) → data_fetcher.py (yfinance) → history.json → Frontend
                       ↓
                  [Update daily at 16:00 UTC]
```

### Enhanced Flow:
```
Backend (Flask)
  ├── data_fetcher.py (yfinance, FRED, manual_data.json)
  ├── config.json (thresholds, weights)
  ├── risk_calculator.py (weighted scoring)
  ├── data/
  │   ├── history.json (auto-updated)
  │   ├── manual_data.json (quarterly updates for margin debt, unemployment, BDC stress)
  │   └── cache/ (caching API responses to avoid rate limits)
  └── alerts.py (email/Slack when risk score > threshold)

Frontend (React upgrade coming)
  ├── Dashboard (current)
  ├── Trend Analysis (4-week, 6-month, 1-year rolling z-scores)
  ├── Component Heatmap (which risks are driving the score)
  └── Backtest (replay historical risk score vs actual market returns)
```

---

## Quick Wins (This Week)

1. **Add FRED unemployment & ISM** (30 mins) → Unlocks recession signals
2. **Sector breadth heatmap** (45 mins) → See if weakness is broad or concentration
3. **Manual quarterly BDC/unemployment uploads** (15 mins/quarter) → Improve signal
4. **Email alerts when risk > 70** (60 mins) → Actionable signals

---

## Signal Quality Expectations

Based on your thesis, this dashboard should:

✅ **Catch early warning signs** (3-6 weeks before moves)
- Rising BDC defaults + widening HY spreads + VIX elevation = red
- Mag7 weight + VIX compression = risk setup

❌ **Not predict exact timing** (crashes still come from surprises)
- Can say "risk is elevated," not "crash on May 20"

⚠️ **Expect false positives** (like 2015, 2018, 2022)
- High valuation + narrow breadth have stayed elevated for years
- Require *confirmation* from credit/macro triggers to act

---

## Next Steps

Pick one from Phase 1 to start:
1. FRED integration (best bang for buck)
2. Sector breadth (reveals concentration vs broad risk)
3. Manual BDC/margin debt (tracks your "black box" thesis directly)

Let me know if you want me to implement any of these!
