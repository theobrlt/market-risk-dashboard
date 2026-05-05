import axios from 'axios';

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;

async function fetchWithRetry(url: string, retries = 0): Promise<any> {
  try {
    const response = await axios.get(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    return response.data;
  } catch (error) {
    if (retries < MAX_RETRIES) {
      await new Promise(r => setTimeout(r, RETRY_DELAY * (retries + 1)));
      return fetchWithRetry(url, retries + 1);
    }
    console.error(`Failed to fetch ${url} after ${MAX_RETRIES} retries:`, error);
    return null;
  }
}

export async function getMag7Weight(): Promise<number | null> {
  try {
    const tickers = ['MSFT', 'AAPL', 'NVDA', 'TSLA', 'GOOGL', 'AMZN', 'META'];

    // Using Yahoo Finance API via rapid API or similar
    // For MVP, we'll use a simplified calculation
    const mag7Data = await Promise.all(
      tickers.map(ticker =>
        fetchWithRetry(
          `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${ticker}?modules=price`
        )
      )
    );

    const totalMag7Cap = mag7Data.reduce((sum, data) => {
      if (data?.quoteSummary?.result?.[0]?.price?.marketCap) {
        return sum + data.quoteSummary.result[0].price.marketCap;
      }
      return sum;
    }, 0);

    const sp500Data = await fetchWithRetry(
      `https://query1.finance.yahoo.com/v10/finance/quoteSummary/%5EGSPC?modules=price`
    );

    const sp500Cap = sp500Data?.quoteSummary?.result?.[0]?.price?.marketCap || 1;
    const weight = (totalMag7Cap / sp500Cap) * 100;

    return weight > 0 ? Math.round(weight * 100) / 100 : null;
  } catch (error) {
    console.error('Error getting Mag7 weight:', error);
    return null;
  }
}

export async function getShillerPE(): Promise<number | null> {
  try {
    const spData = await fetchWithRetry(
      `https://query1.finance.yahoo.com/v10/finance/quoteSummary/%5EGSPC?modules=price`
    );

    const pe = spData?.quoteSummary?.result?.[0]?.price?.trailingPE;
    return pe ? Math.round(pe * 100) / 100 : null;
  } catch (error) {
    console.error('Error getting Shiller PE:', error);
    return null;
  }
}

export async function getVIX(): Promise<number | null> {
  try {
    const vixData = await fetchWithRetry(
      `https://query1.finance.yahoo.com/v10/finance/quoteSummary/%5EVIX?modules=price`
    );

    const price = vixData?.quoteSummary?.result?.[0]?.price?.regularMarketPrice;
    return price ? Math.round(price * 100) / 100 : null;
  } catch (error) {
    console.error('Error getting VIX:', error);
    return null;
  }
}

export async function getYieldCurveSpread(): Promise<number | null> {
  try {
    const tnxData = await fetchWithRetry(
      `https://query1.finance.yahoo.com/v10/finance/quoteSummary/%5ETNX?modules=price`
    );

    const tyxData = await fetchWithRetry(
      `https://query1.finance.yahoo.com/v10/finance/quoteSummary/%5ETYX?modules=price`
    );

    const tnx = tnxData?.quoteSummary?.result?.[0]?.price?.regularMarketPrice;
    const tyx = tyxData?.quoteSummary?.result?.[0]?.price?.regularMarketPrice;

    if (tnx && tyx) {
      return Math.round((tnx - tyx) * 100) / 100;
    }
    return null;
  } catch (error) {
    console.error('Error getting yield curve spread:', error);
    return null;
  }
}

export async function getEquityRiskPremium(): Promise<number | null> {
  try {
    const spData = await fetchWithRetry(
      `https://query1.finance.yahoo.com/v10/finance/quoteSummary/%5EGSPC?modules=price`
    );

    const tnxData = await fetchWithRetry(
      `https://query1.finance.yahoo.com/v10/finance/quoteSummary/%5ETNX?modules=price`
    );

    const pe = spData?.quoteSummary?.result?.[0]?.price?.trailingPE;
    const tnx = tnxData?.quoteSummary?.result?.[0]?.price?.regularMarketPrice;

    if (pe && tnx) {
      const earningsYield = (1 / pe) * 100;
      const erp = earningsYield - tnx;
      return Math.round(erp * 100) / 100;
    }
    return null;
  } catch (error) {
    console.error('Error getting ERP:', error);
    return null;
  }
}

export async function getMarketBreadth(): Promise<number | null> {
  try {
    const spData = await fetchWithRetry(
      `https://query1.finance.yahoo.com/v10/finance/quoteSummary/%5EGSPC?modules=price`
    );

    // Simplified: return 50-70% as default breadth
    // In production, would need actual breadth data
    return 55;
  } catch (error) {
    console.error('Error getting breadth:', error);
    return null;
  }
}

export async function getHYSpreads(): Promise<number | null> {
  try {
    const hygData = await fetchWithRetry(
      `https://query1.finance.yahoo.com/v10/finance/quoteSummary/HYG?modules=price`
    );

    const price = hygData?.quoteSummary?.result?.[0]?.price?.regularMarketPrice;
    return price ? Math.round(price * 100) / 100 : null;
  } catch (error) {
    console.error('Error getting HY spreads:', error);
    return null;
  }
}

export async function getAllIndicators() {
  const [mag7, pe, vix, spread, erp, breadth, hy] = await Promise.all([
    getMag7Weight(),
    getShillerPE(),
    getVIX(),
    getYieldCurveSpread(),
    getEquityRiskPremium(),
    getMarketBreadth(),
    getHYSpreads()
  ]);

  return {
    timestamp: new Date().toISOString(),
    mag7_weight: mag7,
    shiller_pe: pe,
    vix: vix,
    yield_curve_spread: spread,
    equity_risk_premium: erp,
    breadth: breadth,
    hy_spread_proxy: hy,
    unemployment_rate: null
  };
}
