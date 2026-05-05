const API_BASE = 'http://127.0.0.1:5000/api';

let charts = {};
let historyData = {};

// Initialize dashboard
async function initDashboard() {
    console.log('Initializing dashboard...');
    try {
        await refreshData();
        // Set up auto-refresh every 30 minutes
        setInterval(refreshData, 30 * 60 * 1000);
    } catch (error) {
        console.error('Failed to initialize dashboard:', error);
        showError('Failed to load dashboard data. Make sure the backend is running.');
    }
}

// Refresh all data
async function refreshData() {
    try {
        showLoading(true);

        const [current, history, riskScore] = await Promise.all([
            fetch(`${API_BASE}/current`).then(r => r.json()),
            fetch(`${API_BASE}/history`).then(r => r.json()),
            fetch(`${API_BASE}/risk-score`).then(r => r.json())
        ]);

        historyData = history;

        // Update indicators
        updateIndicators(current);

        // Update risk score
        updateRiskScore(riskScore);

        // Update charts
        updateCharts(history);

        // Update table
        updateDataTable(history);

        // Update timestamp
        updateTimestamp();

        showLoading(false);
    } catch (error) {
        console.error('Error refreshing data:', error);
        showError('Failed to refresh data: ' + error.message);
    }
}

// Update indicator cards
function updateIndicators(data) {
    updateIndicator('mag7-weight', data.mag7_weight, '%', 35);
    updateIndicator('shiller-pe', data.shiller_pe, '', 30);
    updateIndicator('vix', data.vix, '', 20);
    updateIndicator('breadth', data.breadth, '%', 50, true);
    updateIndicator('yield-spread', data.yield_curve_spread, '%', 0);
    updateIndicator('erp', data.equity_risk_premium, '%', 2);
    updateIndicator('hy-proxy', data.hy_spread_proxy, '', null);
    updateIndicator('unemployment', data.unemployment_rate, '%', null);
}

function updateIndicator(elementId, value, unit, threshold, inverted = false) {
    const element = document.getElementById(elementId);
    if (!element) return;

    if (value === null || value === undefined) {
        element.textContent = '--';
        return;
    }

    const displayValue = value.toFixed(2) + unit;
    element.textContent = displayValue;

    // Update trend indicator
    const trendId = elementId + '-trend';
    const trendElement = document.getElementById(trendId);
    if (trendElement && threshold !== null) {
        let status = '';
        if (inverted) {
            status = value > threshold ? '✅ Healthy' : '⚠️ Below threshold';
        } else {
            status = value > threshold ? '🔴 Above threshold' : '✅ Normal';
        }
        trendElement.textContent = status;
    }
}

// Update risk score
function updateRiskScore(data) {
    const score = data.risk_score;
    const interpretation = data.interpretation;

    document.getElementById('risk-score').textContent = score.toFixed(1);

    const interpretEl = document.getElementById('risk-interpretation');
    interpretEl.textContent = interpretation;
    interpretEl.style.backgroundColor = getRiskColor(score, 'bg');
    interpretEl.style.color = getRiskColor(score, 'text');

    // Update gauge bar
    const gauge = document.getElementById('gauge-bar');
    gauge.style.width = Math.min(score, 100) + '%';

    // Display component breakdown
    console.log('Risk components:', data.components);
}

function getRiskColor(score, type = 'text') {
    const colors = {
        text: {
            low: '#10b981',
            moderate: '#06b6d4',
            elevated: '#f59e0b',
            high: '#f97316',
            critical: '#ef4444'
        },
        bg: {
            low: 'rgba(16, 185, 129, 0.1)',
            moderate: 'rgba(6, 182, 212, 0.1)',
            elevated: 'rgba(245, 158, 11, 0.1)',
            high: 'rgba(249, 115, 22, 0.1)',
            critical: 'rgba(239, 68, 68, 0.1)'
        }
    };

    let level = 'low';
    if (score >= 80) level = 'critical';
    else if (score >= 60) level = 'high';
    else if (score >= 40) level = 'elevated';
    else if (score >= 20) level = 'moderate';

    return colors[type][level];
}

// Update charts
async function updateCharts(history) {
    const dates = Object.keys(history).sort().slice(-30);

    const mag7Values = dates.map(d => history[d].mag7_weight || null);
    const vixValues = dates.map(d => history[d].vix || null);
    const shillerValues = dates.map(d => history[d].shiller_pe || null);
    const erpValues = dates.map(d => history[d].equity_risk_premium || null);

    // Mag7 Weight Chart
    updateChart('mag7-chart', {
        label: 'Magnificent 7 Weight (%)',
        data: mag7Values,
        dates: dates,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        threshold: 35
    });

    // VIX Chart
    updateChart('vix-chart', {
        label: 'VIX (Volatility Index)',
        data: vixValues,
        dates: dates,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        threshold: 20
    });

    // Shiller P/E Chart
    updateChart('shiller-chart', {
        label: 'Shiller P/E Ratio',
        data: shillerValues,
        dates: dates,
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        threshold: 30
    });

    // ERP Chart
    updateChart('erp-chart', {
        label: 'Equity Risk Premium (%)',
        data: erpValues,
        dates: dates,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        threshold: 2
    });
}

function updateChart(canvasId, config) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Destroy existing chart if it exists
    if (charts[canvasId]) {
        charts[canvasId].destroy();
    }

    // Filter out null values for cleaner display
    const validData = config.data.map((v, i) => ({
        value: v,
        date: config.dates[i]
    })).filter(d => d.value !== null);

    charts[canvasId] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: validData.map(d => d.date),
            datasets: [
                {
                    label: config.label,
                    data: validData.map(d => d.value),
                    borderColor: config.borderColor,
                    backgroundColor: config.backgroundColor,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 3,
                    pointBackgroundColor: config.borderColor,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 1
                }
            ]
        },
        options: {
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
        }
    });
}

// Update data table
function updateDataTable(history) {
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';

    const dates = Object.keys(history).sort().reverse().slice(0, 30);

    dates.forEach(date => {
        const data = history[date];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${date}</td>
            <td>${formatValue(data.mag7_weight)}</td>
            <td>${formatValue(data.shiller_pe)}</td>
            <td>${formatValue(data.vix)}</td>
            <td>${formatValue(data.breadth)}</td>
            <td>${formatValue(data.yield_curve_spread)}</td>
            <td>${formatValue(data.equity_risk_premium)}</td>
        `;
        tbody.appendChild(row);
    });
}

function formatValue(value) {
    if (value === null || value === undefined) return '--';
    return parseFloat(value).toFixed(2);
}

// Update timestamp
function updateTimestamp() {
    const now = new Date();
    const formatted = now.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('last-update').textContent = `Last updated: ${formatted}`;
}

// Loading state
function showLoading(isLoading) {
    const container = document.querySelector('.container');
    if (isLoading) {
        container.classList.add('loading');
    } else {
        container.classList.remove('loading');
    }
}

// Error handling
function showError(message) {
    const header = document.querySelector('header');
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        background-color: rgba(239, 68, 68, 0.2);
        border: 1px solid #ef4444;
        color: #fca5a5;
        padding: 15px;
        border-radius: 8px;
        margin-top: 10px;
        font-size: 0.95em;
    `;
    errorDiv.textContent = '⚠️ ' + message;

    const existing = header.querySelector('[style*="background-color: rgba(239"]');
    if (existing) existing.remove();

    header.appendChild(errorDiv);
}

// Manual refresh button
window.refreshData = refreshData;

// Start dashboard on page load
document.addEventListener('DOMContentLoaded', initDashboard);
