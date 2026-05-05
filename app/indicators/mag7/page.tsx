'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Mag7Indicator() {
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
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
        <h1 style={{ marginBottom: '5px', marginTop: '10px' }}>Magnificent 7 Weight</h1>
        <p className="subtitle">Concentration risk of the 7 largest US tech stocks</p>
      </header>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', padding: '15px', marginBottom: '20px', color: '#f8fafc' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#64748b', fontSize: '0.9em', marginBottom: '5px' }}>Current Threshold</div>
          <div style={{ fontSize: '1.8em', fontWeight: 700, color: '#22c55e' }}>35%</div>
          <div style={{ color: '#64748b', fontSize: '0.85em', marginTop: '5px' }}>Elevation starts at this level</div>
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#64748b', fontSize: '0.9em', marginBottom: '5px' }}>Risk Interpretation</div>
          <div style={{ fontSize: '1.2em', fontWeight: 600, color: '#f8fafc' }}>Concentration Risk</div>
          <div style={{ color: '#64748b', fontSize: '0.85em', marginTop: '5px' }}>Market dependency on few stocks</div>
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#64748b', fontSize: '0.9em', marginBottom: '5px' }}>Data Frequency</div>
          <div style={{ fontSize: '1.2em', fontWeight: 600, color: '#f8fafc' }}>Daily</div>
          <div style={{ color: '#64748b', fontSize: '0.85em', marginTop: '5px' }}>Updated at market close</div>
        </div>
      </div>

      <div style={{ background: 'rgba(30, 41, 59, 0.5)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '40px', marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.5em', fontWeight: 700 }}>About Magnificent 7</h2>
        <div style={{ lineHeight: 1.8, color: '#f8fafc' }}>
          <p style={{ marginBottom: '15px' }}>
            <strong>What is Mag7?</strong> Measures the combined market capitalization of the 7 largest US technology stocks as a percentage of the total S{'{'}P{'}'} 500 market cap.
          </p>

          <p style={{ marginBottom: '15px' }}>
            <strong>The Magnificent 7:</strong>
            Apple, Microsoft, Google, Amazon, NVIDIA, Tesla, Meta
          </p>

          <p style={{ marginBottom: '20px' }}>
            <strong>Why It Matters:</strong> High concentration means the entire market is dependent on a handful of companies. If these stocks decline, the entire S{'{'}P{'}'} 500 could suffer disproportionately.
          </p>

          <div style={{ marginBottom: '20px', padding: '20px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px', borderLeft: '4px solid #22c55e' }}>
            <strong style={{ color: '#22c55e' }}>Low Risk ({'<'} 25%)</strong>
            <p style={{ marginTop: '10px', color: '#f8fafc' }}>Market is well-diversified. Healthy distribution of growth.</p>
          </div>

          <div style={{ marginBottom: '20px', padding: '20px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
            <strong style={{ color: '#f59e0b' }}>High Risk (35-45%)</strong>
            <p style={{ marginTop: '10px', color: '#f8fafc' }}>Significant concentration. Market highly dependent on Mag7 performance.</p>
          </div>

          <div style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
            <strong style={{ color: '#ef4444' }}>Critical ({'>'}45%)</strong>
            <p style={{ marginTop: '10px', color: '#f8fafc' }}>Extreme concentration. Market is betting on 7 stocks. High systemic risk.</p>
          </div>
        </div>
      </div>

      <div style={{ background: 'rgba(30, 41, 59, 0.5)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '40px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.5em', fontWeight: 700 }}>Key Insights</h2>
        <ul style={{ lineHeight: 1.8, color: '#f8fafc', marginLeft: '20px', listStyle: 'disc' }}>
          <li style={{ marginBottom: '10px' }}>Portfolio Risk: Investors in passive index funds are indirectly concentrated</li>
          <li style={{ marginBottom: '10px' }}>Volatility Amplification: High concentration amplifies market moves</li>
          <li style={{ marginBottom: '10px' }}>Valuation Risk: If Mag7 is overvalued, market metrics become misleading</li>
          <li style={{ marginBottom: '10px' }}>Sector Concentration: Mag7 is heavily weighted toward technology</li>
          <li>Rebalancing Opportunity: High weight often precedes market rotations</li>
        </ul>
      </div>
    </div>
  );
}
