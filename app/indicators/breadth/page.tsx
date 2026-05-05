'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface HistoryData {
  [key: string]: { breadth: number | null };
}

export default function BreadthIndicator() {
  const [history, setHistory] = useState<HistoryData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/history');
        const data = await res.json();
        setHistory(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const last90Days = Object.keys(history).sort().slice(-90);

  const chartData = {
    labels: last90Days,
    datasets: [
      {
        label: 'Market Breadth (%)',
        data: last90Days.map(d => history[d]?.breadth || null),
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#22c55e',
        pointBorderColor: '#f8fafc',
        pointBorderWidth: 2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#64748b', font: { size: 12, family: "'IBM Plex Sans', sans-serif" } } }
    },
    scales: {
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#64748b' },
        beginAtZero: true,
        max: 100
      },
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#64748b' }
      }
    }
  };

  return (
    <div className="container">
      <header style={{ marginBottom: '40px' }}>
        <Link href="/" style={{ color: '#0369a1', textDecoration: 'underline', fontSize: '0.9em', marginBottom: '10px', display: 'block' }}>
          {'<--'} Back to Dashboard
        </Link>
        <h1 style={{ marginBottom: '5px', marginTop: '10px' }}>Market Breadth</h1>
        <p className="subtitle">% of S{'{'}P{'}'} 500 stocks above 200-day moving average</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#64748b', fontSize: '0.9em', marginBottom: '5px' }}>Healthy Level</div>
          <div style={{ fontSize: '1.8em', fontWeight: 700, color: '#22c55e' }}>50%+</div>
          <div style={{ color: '#64748b', fontSize: '0.85em', marginTop: '5px' }}>More than half in uptrend</div>
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#64748b', fontSize: '0.9em', marginBottom: '5px' }}>Alert Level</div>
          <div style={{ fontSize: '1.8em', fontWeight: 700, color: '#ef4444' }}>30%</div>
          <div style={{ color: '#64748b', fontSize: '0.85em', marginTop: '5px' }}>Most stocks in downtrend</div>
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '20px' }}>
          <div style={{ color: '#64748b', fontSize: '0.9em', marginBottom: '5px' }}>Data Type</div>
          <div style={{ fontSize: '1.2em', fontWeight: 600, color: '#f8fafc' }}>Technical</div>
          <div style={{ color: '#64748b', fontSize: '0.85em', marginTop: '5px' }}>Price-based indicator</div>
        </div>
      </div>

      {!loading && last90Days.length > 0 && (
        <div style={{ background: 'rgba(30, 41, 59, 0.5)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '40px', marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '30px', fontSize: '1.5em', fontWeight: 700 }}>90-Day Trend</h2>
          <div style={{ position: 'relative', height: '400px' }}>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      )}

      <div style={{ background: 'rgba(30, 41, 59, 0.5)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '40px', marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.5em', fontWeight: 700 }}>📐 How It{'{'}s{'}'}  Calculated</h2>
        <div style={{ lineHeight: 1.8, color: '#f8fafc' }}>
          <p style={{ marginBottom: '15px' }}>
            <strong>Formula:</strong> (Number of S{'{'}P{'}'}  500 stocks above 200-day MA / Total S{'{'}P{'}'}  500 stocks) × 100
          </p>
        </div>
      </div>

      <div style={{ background: 'rgba(30, 41, 59, 0.5)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '40px', marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.5em', fontWeight: 700 }}>🎯 Risk Logic</h2>
        <div style={{ lineHeight: 1.8, color: '#f8fafc' }}>
          <div style={{ marginBottom: '20px', padding: '20px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px', borderLeft: '4px solid #22c55e' }}>
            <strong style={{ color: '#22c55e' }}>Healthy (70%+)</strong>
            <p style={{ marginTop: '10px', color: '#f8fafc' }}>Broad rally. Most stocks rising. Sustainable market advance.</p>
          </div>
          <div style={{ marginBottom: '20px', padding: '20px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '8px', borderLeft: '4px solid #06b6d4' }}>
            <strong style={{ color: '#06b6d4' }}>Normal (50-70%)</strong>
            <p style={{ marginTop: '10px', color: '#f8fafc' }}>Typical market conditions. Mix of rising and falling stocks.</p>
          </div>
          <div style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
            <strong style={{ color: '#ef4444' }}>Critical ({'<'} 30%)</strong>
            <p style={{ marginTop: '10px', color: '#f8fafc' }}>Severe breadth divergence. Reversal likely.</p>
          </div>
        </div>
      </div>

      <div style={{ background: 'rgba(30, 41, 59, 0.5)', backdropFilter: 'blur(15px)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '40px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.5em', fontWeight: 700 }}>🔗 Related Indicators</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <Link href="/indicators/mag7" style={{ padding: '20px', background: 'rgba(51, 65, 85, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: '#0369a1', textDecoration: 'none' }}>
            <div style={{ fontWeight: 600, marginBottom: '5px' }}>Mag7 Weight</div>
            <div style={{ fontSize: '0.9em', color: '#64748b' }}>Inverse relationship with breadth</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
