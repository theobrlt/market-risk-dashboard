'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function VIXIndicator() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const res = await fetch('/api/history');
        if (!res.ok) throw new Error(`API error: ${res.status}`);
      } catch (err) {
        console.error('Error:', err);
        setError('Could not load data');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <header style={{ marginBottom: '40px' }}>
        <Link href="/" style={{ color: '#0369a1', textDecoration: 'underline', fontSize: '0.9em', marginBottom: '10px', display: 'block' }}>
          {'<--'} Back to Dashboard
        </Link>
        <h1 style={{ marginBottom: '5px', marginTop: '10px' }}>VIX - Volatility Index</h1>
        <p className="subtitle">Market expectation of 30-day volatility (Fear Gauge)</p>
      </header>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', padding: '15px', marginBottom: '20px', color: '#f8fafc' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#64748b', fontSize: '0.9em', marginBottom: '5px' }}>Alert Threshold</div>
          <div style={{ fontSize: '1.8em', fontWeight: 700, color: '#ef4444' }}>20</div>
          <div style={{ color: '#64748b', fontSize: '0.85em', marginTop: '5px' }}>Elevated volatility</div>
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#64748b', fontSize: '0.9em', marginBottom: '5px' }}>Normal Range</div>
          <div style={{ fontSize: '1.8em', fontWeight: 700, color: '#22c55e' }}>12-20</div>
          <div style={{ color: '#64748b', fontSize: '0.85em', marginTop: '5px' }}>Healthy market conditions</div>
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#64748b', fontSize: '0.9em', marginBottom: '5px' }}>Data Source</div>
          <div style={{ fontSize: '1.2em', fontWeight: 600, color: '#f8fafc' }}>CBOE</div>
          <div style={{ color: '#64748b', fontSize: '0.85em', marginTop: '5px' }}>Real-time, every 15 seconds</div>
        </div>
      </div>

      <div style={{ background: 'rgba(30, 41, 59, 0.5)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '40px', marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.5em', fontWeight: 700 }}>About VIX</h2>
        <div style={{ lineHeight: 1.8, color: '#f8fafc' }}>
          <p style={{ marginBottom: '15px' }}>
            <strong>What is VIX?</strong> The VIX measures implied volatility of S{'{'}P{'}'} 500 index options over the next 30 days. It is updated continuously during trading hours.
          </p>

          <p style={{ marginBottom: '20px' }}>
            <strong>Why It Matters:</strong> VIX reflects market participants{'{'}s expectation of volatility. High VIX = market expects large swings. Low VIX = complacency or confidence.
          </p>

          <div style={{ marginBottom: '20px', padding: '20px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px', borderLeft: '4px solid #22c55e' }}>
            <strong style={{ color: '#22c55e' }}>Low ({'<'} 12)</strong>
            <p style={{ marginTop: '10px', color: '#f8fafc' }}>Extremely low volatility. Market complacency. Possible setup for sharp selloffs.</p>
          </div>

          <div style={{ marginBottom: '20px', padding: '20px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '8px', borderLeft: '4px solid #06b6d4' }}>
            <strong style={{ color: '#06b6d4' }}>Normal (12-20)</strong>
            <p style={{ marginTop: '10px', color: '#f8fafc' }}>Healthy market conditions. Normal pricing of risk. Balanced expectations.</p>
          </div>

          <div style={{ marginBottom: '20px', padding: '20px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
            <strong style={{ color: '#f59e0b' }}>Elevated (20-30)</strong>
            <p style={{ marginTop: '10px', color: '#f8fafc' }}>Heightened uncertainty. Market pricing in significant risks.</p>
          </div>

          <div style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
            <strong style={{ color: '#ef4444' }}>Extreme ({'>'}30)</strong>
            <p style={{ marginTop: '10px', color: '#f8fafc' }}>Market crisis conditions. Major selloffs underway or extreme uncertainty.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
