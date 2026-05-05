'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface HistoryData {
  [key: string]: { shiller_pe: number | null };
}

export default function ShillerIndicator() {
  const [history, setHistory] = useState<HistoryData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const res = await fetch('/api/history');
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
        const data = await res.json();
        setHistory(data || {});
      } catch (err) {
        console.error('Error fetching history:', err);
        setError('Could not load historical data');
        setHistory({});
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const last90Days = Object.keys(history).sort().slice(-90);

  return (
    <div className="container">
      <header style={{ marginBottom: '40px' }}>
        <Link href="/" style={{ color: '#0369a1', textDecoration: 'underline', fontSize: '0.9em', marginBottom: '10px', display: 'block' }}>
          {'<--'} Back to Dashboard
        </Link>
        <h1 style={{ marginBottom: '5px', marginTop: '10px' }}>Shiller P/E Ratio (CAPE)</h1>
        <p className="subtitle">Cyclically Adjusted Price-to-Earnings Ratio - Long-term valuation</p>
      </header>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', padding: '15px', marginBottom: '20px', color: '#f8fafc' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#64748b', fontSize: '0.9em', marginBottom: '5px' }}>Alert Level</div>
          <div style={{ fontSize: '1.8em', fontWeight: 700, color: '#f59e0b' }}>30</div>
          <div style={{ color: '#64748b', fontSize: '0.85em', marginTop: '5px' }}>Historically elevated</div>
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#64748b', fontSize: '0.9em', marginBottom: '5px' }}>Historical Average</div>
          <div style={{ fontSize: '1.8em', fontWeight: 700, color: '#22c55e' }}>~17</div>
          <div style={{ color: '#64748b', fontSize: '0.85em', marginTop: '5px' }}>Fair valuation (since 1881)</div>
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#64748b', fontSize: '0.9em', marginBottom: '5px' }}>Data Source</div>
          <div style={{ fontSize: '1.2em', fontWeight: 600, color: '#f8fafc' }}>Robert Shiller</div>
          <div style={{ color: '#64748b', fontSize: '0.85em', marginTop: '5px' }}>Yale University / FRED</div>
        </div>
      </div>

      <div style={{ background: 'rgba(30, 41, 59, 0.5)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '40px', marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.5em', fontWeight: 700 }}>About Shiller P/E Ratio</h2>
        <div style={{ lineHeight: 1.8, color: '#f8fafc' }}>
          <p style={{ marginBottom: '15px' }}>
            <strong>What is CAPE?</strong> The Cyclically Adjusted Price-to-Earnings ratio uses 10-year average earnings to smooth business cycles and provide more reliable valuation metrics.
          </p>

          <p style={{ marginBottom: '15px' }}>
            <strong>Formula:</strong> Current S{'{'}P{'}'} 500 Price ÷ Average Real Earnings (10-year average adjusted for inflation)
          </p>

          <p style={{ marginBottom: '20px' }}>
            <strong>Why Important?</strong> CAPE is one of the best long-term valuation indicators, developed by 2013 Nobel laureate Robert Shiller.
          </p>

          <div style={{ marginBottom: '20px', padding: '20px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px', borderLeft: '4px solid #22c55e' }}>
            <strong style={{ color: '#22c55e' }}>Low ({'<'} 20)</strong>
            <p style={{ marginTop: '10px', color: '#f8fafc' }}>Undervalued historically. Good entry point for long-term investors.</p>
          </div>

          <div style={{ marginBottom: '20px', padding: '20px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '8px', borderLeft: '4px solid #06b6d4' }}>
            <strong style={{ color: '#06b6d4' }}>Fair (20-25)</strong>
            <p style={{ marginTop: '10px', color: '#f8fafc' }}>Moderate valuation. Fairly priced relative to earnings.</p>
          </div>

          <div style={{ marginBottom: '20px', padding: '20px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
            <strong style={{ color: '#f59e0b' }}>Elevated (25-30)</strong>
            <p style={{ marginTop: '10px', color: '#f8fafc' }}>Overvalued relative to historical norms.</p>
          </div>

          <div style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
            <strong style={{ color: '#ef4444' }}>Extreme ({'>'}30)</strong>
            <p style={{ marginTop: '10px', color: '#f8fafc' }}>Bubble territory. High probability of significant mean reversion.</p>
          </div>
        </div>
      </div>

      <div style={{ background: 'rgba(30, 41, 59, 0.5)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '40px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.5em', fontWeight: 700 }}>Key Insights</h2>
        <ul style={{ lineHeight: 1.8, color: '#f8fafc', marginLeft: '20px', listStyle: 'disc' }}>
          <li style={{ marginBottom: '10px' }}>High CAPE historically precedes below-average 10-year returns</li>
          <li style={{ marginBottom: '10px' }}>Low CAPE precedes above-average returns</li>
          <li style={{ marginBottom: '10px' }}>Use CAPE to guide portfolio allocation decisions</li>
          <li style={{ marginBottom: '10px' }}>Compare across countries to find better valuations globally</li>
          <li>CAPE {'>'}30 often precedes 20-30% corrections within 2-3 years</li>
        </ul>
      </div>
    </div>
  );
}
