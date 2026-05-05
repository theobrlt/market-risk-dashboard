# Dashboard Thresholds & Customization Guide

Your dashboard comes with default thresholds based on historical analysis from your two response documents. This guide shows how to adjust them based on your specific investment profile and time horizon.

## Current Default Thresholds

| Indicator | Elevated | Critical | Source | Rationale |
|-----------|----------|----------|--------|-----------|
| **Mag7 Weight** | 35% | 40% | Response 1 | Historically extreme; >40% only in 2024-25 |
| **Shiller P/E** | 30 | 35 | Response 1 | Well-documented reversal threshold |
| **VIX** | 20 | 30 | Standard | Consensus risk signal |
| **Breadth (% > MA200)** | 50% | 30% | Response 2 | Narrowing market = higher crash risk |
| **10Y-2Y Spread** | 0.5% | -0.5% | Response 2 | Inversion = recession within 6-18 months |
| **Equity Risk Premium** | 2% | 1% | Response 2 | Below 2% = priced for perfection |

## Customization by Investment Profile

### Conservative (Risk-Averse)
**You:** Capital preservation > growth; reduce exposure at first signs of stress

**Adjust thresholds down:**
```json
{
  "mag7_weight": {"elevated": 30, "critical": 35},
  "shiller_pe": {"elevated": 28, "critical": 32},
  "vix": {"elevated": 18, "critical": 25},
  "breadth": {"warning": 55, "critical": 35},
  "yield_curve_spread": {"warning": 1.0, "critical": 0.0}
}
```

**Action rule:**
- Risk score > 50 → Reduce equity by 10%
- Risk score > 65 → Reduce equity by 25%

**Your indicator priorities:**
1. Breadth (early signal of cracks)
2. Shiller P/E (extended valuations are fragile)
3. Yield curve (recession leading indicator)

---

### Moderate (Balanced)
**You:** Accept normal volatility but want to avoid major drawdowns; tactical hedges only

**Keep defaults**, but adjust actions:
```json
{
  "action_triggers": [
    "Risk score 40-60: Monitor, tighten stops by 2%",
    "Risk score 60-80: Reduce equity by 15%, add put spreads",
    "Risk score 80+: Major shift: hold 40% cash, 60% hedged"
  ]
}
```

**Your indicator priorities:**
1. VIX + Breadth (deterioration = early warning)
2. Shiller P/E (provides context, not trigger)
3. Equity Risk Premium (compression = less margin of safety)

---

### Aggressive (Growth)
**You:** Ride volatility; only de-risk on systemic warnings

**Adjust thresholds up:**
```json
{
  "mag7_weight": {"elevated": 40, "critical": 45},
  "shiller_pe": {"elevated": 32, "critical": 38},
  "vix": {"elevated": 25, "critical": 35},
  "breadth": {"warning": 40, "critical": 20},
  "yield_curve_spread": {"warning": -0.5, "critical": -1.5}
}
```

**Action rule:**
- Only act when risk score > 75
- Use dips as buying opportunities

**Your indicator priorities:**
1. Credit spreads (actual default risk = real problem)
2. Yield curve inversion reversal (end of recession = opportunity)
3. VIX spikes (can fade quickly; don't panic sell)

---

## How to Adjust Weights in `config.json`

Default weights are:
```json
{
  "risk_score_weights": {
    "concentration": 0.20,     // Mag7 weight
    "valuation": 0.25,         // Shiller P/E
    "volatility": 0.20,        // VIX
    "liquidity": 0.15,         // Breadth
    "yield_curve": 0.10,       // 10Y-2Y spread
    "credit": 0.10             // HY spread proxy
  }
}
```

### Conservative: Emphasize Liquidity Signals
```json
{
  "concentration": 0.15,
  "valuation": 0.20,
  "volatility": 0.25,          // Higher weight on fear
  "liquidity": 0.25,           // Higher weight on breadth
  "yield_curve": 0.10,
  "credit": 0.05
}
```
*Why:* Market structure breaks ahead of valuations. Breadth deterioration is your canary.

### Moderate: Balanced (Keep Defaults)
Defaults are already balanced for a "early warning" use case.

### Aggressive: Emphasize Valuation
```json
{
  "concentration": 0.15,
  "valuation": 0.15,           // Lower weight (harder to time)
  "volatility": 0.15,          // VIX is noisy, ignore
  "liquidity": 0.10,
  "yield_curve": 0.30,         // Macro cycles matter most
  "credit": 0.15               // Real defaults = only hard signal
}
```
*Why:* You care about recessionary shocks, not short-term sentiment.

---

## Indicator-Specific Guidance

### Magnitude 7 Weight (Concentration)
**What it measures:** How much of S&P 500 returns come from 7 stocks (MSFT, AAPL, NVDA, TSLA, GOOG, AMZN, META)

**Historical context:**
- 2016: ~20% (healthy)
- 2020: ~25% (post-COVID tech surge)
- 2023: ~30% (AI bubble)
- 2024-25: ~32-35% (peaked, concerning)

**How to adjust:**
- **If you think Mag7 P/E will compress to S&P average:** Lower threshold to 30% (higher sensitivity)
- **If you think tech dominance is structural:** Raise to 38% (lower sensitivity)
- **Default (35%):** Assumes historical reversion within 1-2 years

---

### Shiller P/E Ratio
**What it measures:** 10-year cyclically-adjusted P/E (smooths out earnings cycles)

**Historical context:**
- 1990: ~20 (normal)
- 2000 (dot-com): ~44 (crash)
- 2009 (GFC): ~13 (capitulation)
- 2017: ~31 (first warning)
- 2024: ~29 (elevated)

**How to adjust:**
- **Above 30:** Definitely elevated; every +5 raises crash risk
- **Conservative:** Use 28 threshold (act earlier)
- **Aggressive:** Use 32 threshold (allow more froth)
- **Watch divergence:** If Shiller PE rises while earnings fall → crash signal

---

### VIX (Volatility)
**What it measures:** Expected 30-day stock volatility (from option prices)

**Interpretation:**
- <15: Complacency (highest risk if breadth is narrow)
- 15-20: Normal
- 20-30: Elevated fear
- 30+: Panic
- >40: Capitulation/bottom forming

**How to adjust:**
- **Default (20):** Good for "raise alert" trigger
- **Use 18-19:** If breadth is deteriorating despite low VIX (warning signal)
- **Use 25:** If you only care about panic, not early warnings
- **Don't use alone:** VIX can stay low during crashes (complacency is the risk)

---

### Market Breadth (% Above 200-Day MA)
**What it measures:** What % of S&P 500 stocks are in uptrends (above 200-day moving average)

**Interpretation:**
- >60%: Healthy (broad participation)
- 50-60%: Normal
- 40-50%: Narrowing (concentration increasing)
- <40%: Severely deteriorated (most stocks down, indices held up by Mag7)
- <30%: Crash territory (very rare)

**Why it matters:** This catches the setup where indices are at highs but most stocks are rolling over.

**How to adjust:**
- **Conservative:** Use 55% threshold (pick up deterioration early)
- **Moderate:** Use 50% (default = good)
- **Aggressive:** Use 40% (only care when severe)

**Example:** If S&P 500 is at all-time highs but only 35% of stocks are above their 200-MA, risk score should spike.

---

### Yield Curve Spread (10Y-2Y)
**What it measures:** Difference between long and short-term interest rates

**Interpretation:**
- >1.5%: Very steep (unusual, growth concerns)
- 0.5-1.5%: Normal (healthy term premium)
- 0-0.5%: Flattening (economic uncertainty)
- <0%: Inverted (recession typically within 6-18 months)
- Stays <0% for >3 months: Recession likely happening

**How to adjust:**
- **Conservative:** Use 0.5% threshold (act on flattening, before inversion)
- **Moderate:** Use 0% threshold (default, act on inversion)
- **Aggressive:** Use -0.5% threshold (wait for deep inversion = late signal)

**Pro tip:** Un-inversion (spread going from negative back to positive) is often MORE important than initial inversion. Usually marks start of credit crisis.

---

### Equity Risk Premium (Earnings Yield - Risk-Free Rate)
**What it measures:** Real return you get for owning equities vs. holding Treasuries

**Interpretation:**
- >3%: Attractive (cheap equities)
- 2-3%: Fair
- 1-2%: Tight (equities priced for perfection)
- <1%: Dangerous (no margin of safety)
- <0%: Extremely rare but has happened (bonds cheaper than stocks)

**How to adjust:**
- **Conservative:** Use 2.5% threshold (act on compression)
- **Moderate:** Use 2% threshold (default, good early warning)
- **Aggressive:** Use 1.5% threshold (only care about extreme compression)

---

## Testing Your Thresholds

### Backtest Exercise
Pull historical data and see how thresholds would have performed:

1. **Get data:** Export `backend/data/history.json`
2. **Replay:** Calculate risk score for each date
3. **Compare:** Did high risk scores precede actual S&P 500 drawdowns?

**Good dashboard:** Should have 80%+ accuracy identifying weeks that precede 5%+ drawdowns (false positives acceptable).

---

## Making Changes

### Option 1: Edit `backend/config.json`
```json
{
  "thresholds": {
    "mag7_weight": {
      "elevated": 32,        // Changed from 35
      "critical": 38
    }
  },
  "risk_score_weights": {
    "concentration": 0.25,   // Emphasize concentration more
    "liquidity": 0.10
  }
}
```

After saving, restart backend: `python app.py`

Dashboard will recalculate next refresh.

### Option 2: Hardcode in `data_fetcher.py`
If you want per-indicator customization:

```python
# In risk_calculator function
THRESHOLDS = {
    'mag7_weight': {
        'baseline': 32,      # YOUR threshold
        'critical': 38
    }
}
```

---

## Validation Checklist

Before finalizing your thresholds, ask:

- [ ] **Do they make intuitive sense?** (Don't just blindly use defaults)
- [ ] **Are they based on your time horizon?** (1-month trader ≠ 5-year investor)
- [ ] **Have you stress-tested them?** (Do they catch 2022, 2020, 2018 moves?)
- [ ] **Are they ambitious but not absurd?** (40% Mag7 weight is ambitious; 60% is delusional)
- [ ] **Can you stick to them emotionally?** (If your thresholds force action every 2 weeks, they're too tight)

---

## Quick Recommendations

| Your Profile | Mag7 Weight | Shiller P/E | VIX | Breadth | Yield Curve | ERP |
|---|---|---|---|---|---|---|
| **Conservative** | 30% | 28 | 18 | 55% | 0.5% | 2.5% |
| **Moderate** | 35% | 30 | 20 | 50% | 0% | 2% |
| **Aggressive** | 40% | 32 | 25 | 40% | -0.5% | 1.5% |

Pick your profile, update `config.json`, and run the dashboard for a month. Then backtest against historical moves to validate.

---

## Support

If your risk score seems to have no relationship to actual market moves:
1. Check your threshold assumptions (likely too tight or too loose)
2. Check component weights (one factor dominating?)
3. Compare to historical periods when your setup should have worked

Email or message if you want help debugging.
