'use client';

import Link from 'next/link';

export default function ERPIndicator() {
  return (
    <div className="container">
      <header style={{ marginBottom: '40px' }}>
        <Link href="/" style={{ color: '#0369a1', textDecoration: 'underline', fontSize: '0.9em', marginBottom: '10px', display: 'block' }}>
          {'<--'} Back to Dashboard
        </Link>
        <h1 style={{ marginBottom: '5px', marginTop: '10px' }}>Equity Risk Premium (ERP)</h1>
        <p className="subtitle">Expected return from equities above the risk-free rate</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#64748b', fontSize: '0.9em', marginBottom: '5px' }}>Normal Range</div>
          <div style={{ fontSize: '1.8em', fontWeight: 700, color: '#22c55e' }}>4-6%</div>
          <div style={{ color: '#64748b', fontSize: '0.85em', marginTop: '5px' }}>Fair compensation for risk</div>
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#64748b', fontSize: '0.9em', marginBottom: '5px' }}>Low Risk ({'>'}6%)</div>
          <div style={{ fontSize: '1.8em', fontWeight: 700, color: '#22c55e' }}>Better Value</div>
          <div style={{ color: '#64748b', fontSize: '0.85em', marginTop: '5px' }}>Stocks undervalued vs bonds</div>
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#64748b', fontSize: '0.9em', marginBottom: '5px' }}>High Risk ({'<'}2%)</div>
          <div style={{ fontSize: '1.8em', fontWeight: 700, color: '#ef4444' }}>Poor Value</div>
          <div style={{ color: '#64748b', fontSize: '0.85em', marginTop: '5px' }}>Stocks overvalued</div>
        </div>
      </div>

      <div style={{ background: 'rgba(30, 41, 59, 0.5)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '40px', marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.5em', fontWeight: 700 }}>About ERP</h2>
        <div style={{ lineHeight: 1.8, color: '#f8fafc' }}>
          <p style={{ marginBottom: '15px' }}>
            <strong>What is ERP?</strong> The Equity Risk Premium measures the extra return investors expect from stocks compared to the risk-free rate (Treasury bonds).
          </p>

          <p style={{ marginBottom: '15px' }}>
            <strong>Formula:</strong> Expected Equity Return (%) - Risk-free Rate (10Y Treasury %)
          </p>

          <p style={{ marginBottom: '20px' }}>
            <strong>Why It Matters:</strong> ERP is the best tool for deciding between stocks and bonds. When ERP is high, stocks are attractive. When ERP is low, bonds may be better.
          </p>

          <div style={{ marginBottom: '20px', padding: '20px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px', borderLeft: '4px solid #22c55e' }}>
            <strong style={{ color: '#22c55e' }}>High ({'>'}6%)</strong>
            <p style={{ marginTop: '10px', color: '#f8fafc' }}>Stocks offering good compensation for risk. Attractive entry point.</p>
          </div>

          <div style={{ marginBottom: '20px', padding: '20px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
            <strong style={{ color: '#f59e0b' }}>Low (2-4%)</strong>
            <p style={{ marginTop: '10px', color: '#f8fafc' }}>Limited compensation for stock risk. Consider bonds instead.</p>
          </div>

          <div style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
            <strong style={{ color: '#ef4444' }}>Negative ({'<'} 2%)</strong>
            <p style={{ marginTop: '10px', color: '#f8fafc' }}>Stocks overvalued. Bonds are better risk/reward. Portfolio should be defensive.</p>
          </div>
        </div>
      </div>

      <div style={{ background: 'rgba(30, 41, 59, 0.5)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '40px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.5em', fontWeight: 700 }}>Key Insights</h2>
        <ul style={{ lineHeight: 1.8, color: '#f8fafc', marginLeft: '20px', listStyle: 'disc' }}>
          <li style={{ marginBottom: '10px' }}>Asset Allocation: When ERP {'<'} 3%, shift to 40% stocks / 60% bonds</li>
          <li style={{ marginBottom: '10px' }}>Stock vs Bond Decision: Best tool for choosing between equity and fixed income</li>
          <li style={{ marginBottom: '10px' }}>Valuation Anchor: Extreme ERP (very low) often precedes corrections</li>
          <li>Entry/Exit Timing: Buy stocks aggressively when ERP {'>'}6%, reduce when ERP {'<'} 2%</li>
        </ul>
      </div>
    </div>
  );
}
