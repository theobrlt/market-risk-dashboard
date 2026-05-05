'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function YieldCurveIndicator() {
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
        <h1 style={{ marginBottom: '5px', marginTop: '10px' }}>10Y-2Y Yield Curve Spread</h1>
        <p className="subtitle">The gap between 10-year and 2-year Treasury yields</p>
      </header>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', padding: '15px', marginBottom: '20px', color: '#f8fafc' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#64748b', fontSize: '0.9em', marginBottom: '5px' }}>Critical Level</div>
          <div style={{ fontSize: '1.8em', fontWeight: 700, color: '#ef4444' }}>0%</div>
          <div style={{ color: '#64748b', fontSize: '0.85em', marginTop: '5px' }}>Inversion point</div>
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#64748b', fontSize: '0.9em', marginBottom: '5px' }}>Historical Mean</div>
          <div style={{ fontSize: '1.8em', fontWeight: 700, color: '#22c55e' }}>~1.5%</div>
          <div style={{ color: '#64748b', fontSize: '0.85em', marginTop: '5px' }}>Normal level</div>
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#64748b', fontSize: '0.9em', marginBottom: '5px' }}>Data Source</div>
          <div style={{ fontSize: '1.2em', fontWeight: 600, color: '#f8fafc' }}>US Treasury</div>
          <div style={{ color: '#64748b', fontSize: '0.85em', marginTop: '5px' }}>Federal Reserve FRED</div>
        </div>
      </div>

      <div style={{ background: 'rgba(30, 41, 59, 0.5)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '40px', marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.5em', fontWeight: 700 }}>About Yield Curve</h2>
        <div style={{ lineHeight: 1.8, color: '#f8fafc' }}>
          <p style={{ marginBottom: '15px' }}>
            <strong>What is it?</strong> The 10Y-2Y spread is the gap between 10-year and 2-year Treasury yields. It reflects market expectations about future interest rates and economic growth.
          </p>

          <p style={{ marginBottom: '20px' }}>
            <strong>Why It Matters:</strong> This spread is the most reliable recession predictor. When it inverts (10Y {'<'} 2Y), a recession typically follows within 12-18 months.
          </p>

          <div style={{ marginBottom: '20px', padding: '20px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px', borderLeft: '4px solid #22c55e' }}>
            <strong style={{ color: '#22c55e' }}>Steepening ({'>'}1.5%)</strong>
            <p style={{ marginTop: '10px', color: '#f8fafc' }}>Normal growth expected. Banks profitable. Equity-friendly environment.</p>
          </div>

          <div style={{ marginBottom: '20px', padding: '20px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '8px', borderLeft: '4px solid #06b6d4' }}>
            <strong style={{ color: '#06b6d4' }}>Flattening (0.5-1.5%)</strong>
            <p style={{ marginTop: '10px', color: '#f8fafc' }}>Growth slowing. Market uncertainty increasing.</p>
          </div>

          <div style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
            <strong style={{ color: '#ef4444' }}>Inverted ({'<'} 0%)</strong>
            <p style={{ marginTop: '10px', color: '#f8fafc' }}>Recession imminent. 100% recession predictor historically. Major rebalancing needed.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
