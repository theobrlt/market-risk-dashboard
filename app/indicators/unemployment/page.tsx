'use client';

import Link from 'next/link';

export default function UnemploymentIndicator() {
  return (
    <div className="container">
      <header style={{ marginBottom: '40px' }}>
        <Link href="/" style={{ color: '#0369a1', textDecoration: 'underline', fontSize: '0.9em', marginBottom: '10px', display: 'block' }}>
          {'<--'} Back to Dashboard
        </Link>
        <h1 style={{ marginBottom: '5px', marginTop: '10px' }}>Unemployment Rate</h1>
        <p className="subtitle">% of workforce without employment - Labor market health</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#64748b', fontSize: '0.9em', marginBottom: '5px' }}>Healthy Level</div>
          <div style={{ fontSize: '1.8em', fontWeight: 700, color: '#22c55e' }}>3.5-4.5%</div>
          <div style={{ color: '#64748b', fontSize: '0.85em', marginTop: '5px' }}>Full employment range</div>
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#64748b', fontSize: '0.9em', marginBottom: '5px' }}>Caution Level</div>
          <div style={{ fontSize: '1.8em', fontWeight: 700, color: '#f59e0b' }}>5-6%</div>
          <div style={{ color: '#64748b', fontSize: '0.85em', marginTop: '5px' }}>Economic weakness emerging</div>
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#64748b', fontSize: '0.9em', marginBottom: '5px' }}>Data Source</div>
          <div style={{ fontSize: '1.2em', fontWeight: 600, color: '#f8fafc' }}>Bureau of Labor</div>
          <div style={{ color: '#64748b', fontSize: '0.85em', marginTop: '5px' }}>US Department of Labor</div>
        </div>
      </div>

      <div style={{ background: 'rgba(30, 41, 59, 0.5)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '40px', marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.5em', fontWeight: 700 }}>About Unemployment</h2>
        <div style={{ lineHeight: 1.8, color: '#f8fafc' }}>
          <p style={{ marginBottom: '15px' }}>
            <strong>What is it?</strong> The unemployment rate is the percentage of the labor force (16+ years old, actively seeking employment) that is without work.
          </p>

          <p style={{ marginBottom: '15px' }}>
            <strong>Why It Matters:</strong> The Federal Reserve watches unemployment closely. Rising unemployment forces rate cuts. Falling unemployment triggers rate hikes. This is the most-watched economic indicator.
          </p>

          <p style={{ marginBottom: '20px' }}>
            <strong>Data Frequency:</strong> Released monthly, first Friday of each month by Bureau of Labor Statistics
          </p>

          <div style={{ marginBottom: '20px', padding: '20px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px', borderLeft: '4px solid #22c55e' }}>
            <strong style={{ color: '#22c55e' }}>Low (3-4%)</strong>
            <p style={{ marginTop: '10px', color: '#f8fafc' }}>Full employment. Strong labor market. Wage pressure and inflation risk ahead.</p>
          </div>

          <div style={{ marginBottom: '20px', padding: '20px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '8px', borderLeft: '4px solid #06b6d4' }}>
            <strong style={{ color: '#06b6d4' }}>Normal (4-5%)</strong>
            <p style={{ marginTop: '10px', color: '#f8fafc' }}>Healthy labor market. Balanced economy. Sustainable growth.</p>
          </div>

          <div style={{ marginBottom: '20px', padding: '20px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
            <strong style={{ color: '#f59e0b' }}>Rising (5-6%)</strong>
            <p style={{ marginTop: '10px', color: '#f8fafc' }}>Economic weakness. Job losses accelerating. Recession likely.</p>
          </div>

          <div style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
            <strong style={{ color: '#ef4444' }}>High ({'>'}6%)</strong>
            <p style={{ marginTop: '10px', color: '#f8fafc' }}>Severe job losses. Recession underway. Corporate earnings under pressure.</p>
          </div>
        </div>
      </div>

      <div style={{ background: 'rgba(30, 41, 59, 0.5)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '40px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.5em', fontWeight: 700 }}>Key Insights</h2>
        <ul style={{ lineHeight: 1.8, color: '#f8fafc', marginLeft: '20px', listStyle: 'disc' }}>
          <li style={{ marginBottom: '10px' }}>Federal Reserve Decisions: Rising unemployment forces rate cuts. Falling triggers cuts.</li>
          <li style={{ marginBottom: '10px' }}>Market Reaction: Unemployment surprises move markets 300-400 basis points</li>
          <li style={{ marginBottom: '10px' }}>Corporate Earnings: Each 1% rise reduces S{'{'}P{'}'} 500 earnings by 5-8%</li>
          <li style={{ marginBottom: '10px' }}>Consumer Spending: Job losses reduce spending (40% of GDP)</li>
          <li>Trading Strategy: When rising, reduce cyclicals/tech. Favor defensives and bonds.</li>
        </ul>
      </div>
    </div>
  );
}
