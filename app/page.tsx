'use client';

import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Indicators {
  timestamp: string;
  mag7_weight: number | null;
  shiller_pe: number | null;
  vix: number | null;
  yield_curve_spread: number | null;
  equity_risk_premium: number | null;
  breadth: number | null;
  hy_spread_proxy: number | null;
  unemployment_rate: number | null;
}

interface RiskScore {
  risk_score: number;
  components: Record<string, number>;
  interpretation: string;
}

export default function Home() {
  const [current, setCurrent] = useState<Indicators | null>(null);
  const [history, setHistory] = useState<Record<string, Indicators>>({});
  const [riskScore, setRiskScore] = useState<RiskScore | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const refreshData = async () => {
    setLoading(true);
    try {
      const [currRes, histRes, riskRes] = await Promise.all([
        fetch('/api/current'),
        fetch('/api/history'),
        fetch('/api/risk-score')
      ]);

      const curr = await currRes.json();
      const hist = await histRes.json();
      const risk = await riskRes.json();

      setCurrent(curr);
      setHistory(hist);
      setRiskScore(risk);
      setLastUpdate(new Date().toLocaleString());
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
    // Auto-refresh every 30 minutes
    const interval = setInterval(refreshData, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (score: number | undefined) => {
    if (!score) return '#3b82f6';
    if (score < 20) return '#10b981';
    if (score < 40) return '#06b6d4';
    if (score < 60) return '#f59e0b';
    if (score < 80) return '#f97316';
    return '#ef4444';
  };

  const getRiskBgColor = (score: number | undefined) => {
    if (!score) return 'rgba(59, 130, 246, 0.1)';
    if (score < 20) return 'rgba(16, 185, 129, 0.1)';
    if (score < 40) return 'rgba(6, 182, 212, 0.1)';
    if (score < 60) return 'rgba(245, 158, 11, 0.1)';
    if (score < 80) return 'rgba(249, 115, 22, 0.1)';
    return 'rgba(239, 68, 68, 0.1)';
  };

  const formatValue = (value: number | null | undefined) => {
    if (value === null || value === undefined) return '--';
    return value.toFixed(2);
  };

  const getChartData = (
    dates: string[],
    values: (number | null)[],
    label: string,
    borderColor: string
  ) => ({
    labels: dates,
    datasets: [
      {
        label,
        data: values,
        borderColor,
        backgroundColor: `${borderColor}20`,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: borderColor,
        pointBorderColor: '#fff',
        pointBorderWidth: 1
      }
    ]
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#a0aec0', font: { size: 12 } }
      }
    },
    scales: {
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#a0aec0' },
        beginAtZero: false
      },
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#a0aec0' }
      }
    }
  };

  const last30Days = Object.keys(history)
    .sort()
    .slice(-30);

  const mag7Chart = getChartData(
    last30Days,
    last30Days.map(d => history[d]?.mag7_weight || null),
    'Magnificent 7 Weight (%)',
    '#3b82f6'
  );

  const vixChart = getChartData(
    last30Days,
    last30Days.map(d => history[d]?.vix || null),
    'VIX (Volatility Index)',
    '#ef4444'
  );

  const shillerChart = getChartData(
    last30Days,
    last30Days.map(d => history[d]?.shiller_pe || null),
    'Shiller P/E Ratio',
    '#f59e0b'
  );

  const erpChart = getChartData(
    last30Days,
    last30Days.map(d => history[d]?.equity_risk_premium || null),
    'Equity Risk Premium (%)',
    '#10b981'
  );

  return (
    <div className="container">
      <header>
        <div>
          <h1>📊 Market Risk Dashboard</h1>
          <p className="subtitle">Real-time financial indicators for systemic risk monitoring</p>
        </div>
        <div className="header-controls">
          <button
            className="refresh-btn"
            onClick={refreshData}
            disabled={loading}
          >
            {loading ? '⏳ Loading...' : '🔄 Refresh Now'}
          </button>
          <div className="last-update">{lastUpdate ? `Last: ${lastUpdate}` : ''}</div>
        </div>
      </header>

      {riskScore && (
        <div className="risk-score-card">
          <h2>Composite Risk Score</h2>
          <div className="score-display">
            <div className="score-number" style={{ color: getRiskColor(riskScore.risk_score) }}>
              {riskScore.risk_score?.toFixed(1) || '--'}
            </div>
            <div
              className="score-interpretation"
              style={{
                backgroundColor: getRiskBgColor(riskScore.risk_score),
                color: getRiskColor(riskScore.risk_score)
              }}
            >
              {riskScore.interpretation || 'Unknown'}
            </div>
          </div>
          <div className="score-gauge">
            <div
              className="gauge-bar"
              style={{ width: `${Math.min(riskScore.risk_score || 0, 100)}%` }}
            ></div>
          </div>
          <p className="score-description">
            Weighted composite of concentration, valuation, volatility, liquidity, yield curve,
            and credit indicators.
          </p>
        </div>
      )}

      <div className="indicators-grid">
        <div className="indicator-card">
          <h3>Magnificent 7 Weight</h3>
          <div className="value">{formatValue(current?.mag7_weight)}%</div>
          <div className="threshold">Threshold: 35% (elevated)</div>
          <div className="trend">
            {current && current.mag7_weight ? (current.mag7_weight > 35 ? '🔴 Above threshold' : '✅ Normal') : '--'}
          </div>
        </div>

        <div className="indicator-card">
          <h3>Shiller P/E Ratio</h3>
          <div className="value">{formatValue(current?.shiller_pe)}</div>
          <div className="threshold">Threshold: 30 (elevated)</div>
          <div className="trend">
            {current && current.shiller_pe ? (current.shiller_pe > 30 ? '🔴 Above threshold' : '✅ Normal') : '--'}
          </div>
        </div>

        <div className="indicator-card">
          <h3>VIX (Volatility)</h3>
          <div className="value">{formatValue(current?.vix)}</div>
          <div className="threshold">Threshold: 20 (elevated)</div>
          <div className="trend">
            {current && current.vix ? (current.vix > 20 ? '🔴 Above threshold' : '✅ Normal') : '--'}
          </div>
        </div>

        <div className="indicator-card">
          <h3>Market Breadth</h3>
          <div className="value">{formatValue(current?.breadth)}%</div>
          <div className="threshold">% above 200-day MA</div>
          <div className="trend">
            {current && current.breadth ? (current.breadth > 50 ? '✅ Healthy' : '⚠️ Below threshold') : '--'}
          </div>
        </div>

        <div className="indicator-card">
          <h3>10Y-2Y Spread</h3>
          <div className="value">{formatValue(current?.yield_curve_spread)}%</div>
          <div className="threshold">Threshold: 0 (inversion)</div>
          <div className="trend">
            {current && current.yield_curve_spread !== null
              ? current.yield_curve_spread < 0
                ? '🔴 Inverted'
                : '✅ Normal'
              : '--'}
          </div>
        </div>

        <div className="indicator-card">
          <h3>Equity Risk Premium</h3>
          <div className="value">{formatValue(current?.equity_risk_premium)}%</div>
          <div className="threshold">Earnings yield - Risk-free rate</div>
          <div className="trend">
            {current && current.equity_risk_premium ? (current.equity_risk_premium > 2 ? '✅ Fair' : '⚠️ Tight') : '--'}
          </div>
        </div>

        <div className="indicator-card">
          <h3>HY Spread Proxy</h3>
          <div className="value">{formatValue(current?.hy_spread_proxy)}</div>
          <div className="threshold">Bond ETF price (HYG)</div>
          <div className="trend">Manual data</div>
        </div>

        <div className="indicator-card">
          <h3>Unemployment Rate</h3>
          <div className="value">{formatValue(current?.unemployment_rate)}</div>
          <div className="threshold">Latest available</div>
          <div className="trend">Requires manual update</div>
        </div>
      </div>

      {last30Days.length > 0 && (
        <div className="charts-section">
          <h2>Historical Trends (Last 30 Days)</h2>
          <div className="charts-grid">
            <div className="chart-container">
              <Line data={mag7Chart} options={chartOptions} />
            </div>
            <div className="chart-container">
              <Line data={vixChart} options={chartOptions} />
            </div>
            <div className="chart-container">
              <Line data={shillerChart} options={chartOptions} />
            </div>
            <div className="chart-container">
              <Line data={erpChart} options={chartOptions} />
            </div>
          </div>
        </div>
      )}

      <div className="guide-section">
        <h2>Risk Score Interpretation</h2>
        <div className="risk-levels">
          <div className="risk-level low">
            <strong>0-20: Low</strong> - Healthy market conditions
          </div>
          <div className="risk-level moderate">
            <strong>20-40: Moderate</strong> - Normal variability
          </div>
          <div className="risk-level elevated">
            <strong>40-60: Elevated</strong> - Monitor closely
          </div>
          <div className="risk-level high">
            <strong>60-80: High</strong> - Significant stress signals
          </div>
          <div className="risk-level critical">
            <strong>80-100: Critical</strong> - Systemic risk warning
          </div>
        </div>
      </div>
    </div>
  );
}
