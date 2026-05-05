// Storage handler - uses in-memory cache + vercel KV if available
// Falls back to file system in development

interface HistoryData {
  [date: string]: any;
}

let historyCache: HistoryData = {};

// Try to load from KV if in production
async function loadFromKV(): Promise<HistoryData> {
  try {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const response = await fetch(
        `${process.env.KV_REST_API_URL}/get/market-risk-history`,
        {
          headers: {
            Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.result ? JSON.parse(data.result) : {};
      }
    }
  } catch (error) {
    console.warn('KV storage not available, using in-memory cache');
  }
  return {};
}

// Save to KV
async function saveToKV(data: HistoryData): Promise<void> {
  try {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      await fetch(`${process.env.KV_REST_API_URL}/set/market-risk-history`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          value: JSON.stringify(data),
          ex: 7776000 // 90 days expiry
        })
      });
    }
  } catch (error) {
    console.warn('Could not save to KV:', error);
  }
}

export async function loadHistory(): Promise<HistoryData> {
  if (Object.keys(historyCache).length === 0) {
    historyCache = await loadFromKV();
  }
  return historyCache;
}

export async function saveHistory(data: HistoryData): Promise<void> {
  historyCache = data;
  await saveToKV(data);
}

export async function appendToHistory(date: string, indicators: any): Promise<void> {
  const history = await loadHistory();
  history[date] = indicators;

  // Keep only last 2 years
  const dates = Object.keys(history).sort();
  if (dates.length > 730) {
    delete history[dates[0]];
  }

  await saveHistory(history);
}

export async function getLatestIndicators(): Promise<any | null> {
  const history = await loadHistory();
  const dates = Object.keys(history).sort().reverse();
  return dates.length > 0 ? history[dates[0]] : null;
}
