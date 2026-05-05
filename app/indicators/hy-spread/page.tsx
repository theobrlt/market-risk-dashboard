'use client';

import Link from 'next/link';

export default function HYSpreadIndicator() {
  return (
    <div className="container">
      <header style={{ marginBottom: '40px' }}>
        <Link href="/" style={{ color: '#0369a1', textDecoration: 'underline', fontSize: '0.9em', marginBottom: '10px', display: 'block' }}>
          {'<--'} Back to Dashboard
        </Link>
        <h1 style={{ marginBottom: '5px', marginTop: '10px' }}>HY Spread Proxy (HYG)</h1>
        <p className="subtitle">High-yield bond ETF price - Indicator of credit risk appetite</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#64748b', fontSize: '0.9em', marginBottom: '5px' }}>What It Tracks</div>
          <div style={{ fontSize: '1.2em', fontWeight: 600, color: '#f8fafc' }}>iShares HY Corp Bond ETF</div>
          <div style={{ color: '#64748b', fontSize: '0.85em', marginTop: '5px' }}>Junk bonds, ~20B AUM</div>
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#64748b', fontSize: '0.9em', marginBottom: '5px' }}>Risk Signal</div>
          <div style={{ fontSize: '1.2em', fontWeight: 600, color: '#f8fafc' }}>Falling = Rising Risk</div>
          <div style={{ color: '#64748b', fontSize: '0.85em', marginTop: '5px' }}>Decline = credit stress</div>
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#64748b', fontSize: '0.9em', marginBottom: '5px' }}>Update Frequency</div>
          <div style={{ fontSize: '1.2em', fontWeight: 600, color: '#f8fafc' }}>Real-time During Hours</div>
          <div style={{ color: '#64748b', fontSize: '0.85em', marginTop: '5px' }}>Every 15 seconds</div>
        </div>
      </div>

      <div style={{ background: 'rgba(30, 41, 59, 0.5)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '40px', marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.5em', fontWeight: 700 }}>About HY Spread</h2>
        <div style={{ lineHeight: 1.8, color: '#f8fafc' }}>
          <p style={{ marginBottom: '15px' }}>
            <strong>What is HYG?</strong> HYG (iShares High Yield Corporate Bond ETF) tracks the credit market. When HYG rises, investors are confident in corporate credit. When HYG falls, they are fearful.
          </p>

          <p style={{ marginBottom: '20px' }}>
            <strong>Why It Matters:</strong> Credit market stress often precedes equity market stress. HYG declines are early warning signals.
          </p>

          <div style={{ marginBottom: '20px', padding: '20px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px', borderLeft: '4px solid #22c55e' }}>
            <strong style={{ color: '#22c55e' }}>Rising (Gaining)</strong>
            <p style={{ marginTop: '10px', color: '#f8fafc' }}>Corporate credit healthy. Risk appetite strong. Good time for credit exposure.</p>
          </div>

          <div style={{ marginBottom: '20px', padding: '20px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
            <strong style={{ color: '#f59e0b' }}>Declining (Down 5%+)</strong>
            <p style={{ marginTop: '10px', color: '#f8fafc' }}>Credit stress emerging. Corporate defaults possible. Reduce HY exposure.</p>
          </div>

          <div style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
            <strong style={{ color: '#ef4444' }}>Crashing (Down 10%+)</strong>
            <p style={{ marginTop: '10px', color: '#f8fafc' }}>Credit crisis conditions. Flight-to-quality underway. Exit HY bonds immediately.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
