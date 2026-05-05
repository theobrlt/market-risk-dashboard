import { NextRequest, NextResponse } from 'next/server';
import { loadHistory, getLatestIndicators } from '@/lib/storage';

export async function GET(request: NextRequest) {
  try {
    const history = await loadHistory();
    const latest = await getLatestIndicators();

    if (!latest) {
      return NextResponse.json({ risk_score: null, components: {} });
    }

    const riskComponents: Record<string, number> = {};
    const weights: Record<string, number> = {};

    // Volatility risk (VIX > 20)
    if (latest.vix) {
      const vix = latest.vix;
      const volatilityRisk = Math.min(100, Math.max(0, (vix - 12) / 20 * 100));
      riskComponents['volatility'] = Math.round(volatilityRisk * 100) / 100;
      weights['volatility'] = 0.20;
    }

    // Yield curve risk (inversion at 0%)
    if (latest.yield_curve_spread !== null && latest.yield_curve_spread !== undefined) {
      const spread = latest.yield_curve_spread;
      const yieldRisk = Math.max(0, (0.5 - spread) / 1.0 * 100);
      riskComponents['yield_curve'] = Math.round(yieldRisk * 100) / 100;
      weights['yield_curve'] = 0.20;
    }

    // Valuation risk (Shiller PE > 30)
    if (latest.shiller_pe) {
      const pe = latest.shiller_pe;
      const valuationRisk = Math.min(100, Math.max(0, (pe - 20) / 15 * 100));
      riskComponents['valuation'] = Math.round(valuationRisk * 100) / 100;
      weights['valuation'] = 0.15;
    }

    // Equity risk premium (ERP < 2%)
    if (latest.equity_risk_premium) {
      const erp = latest.equity_risk_premium;
      const erpRisk = Math.max(0, (4 - erp) / 3 * 100);
      riskComponents['erp'] = Math.round(erpRisk * 100) / 100;
      weights['erp'] = 0.15;
    }

    // Credit risk (HY OAS spread in bps, normal ~350-400)
    if (latest.hy_spread_proxy) {
      const hy = latest.hy_spread_proxy;
      const creditRisk = Math.min(100, Math.max(0, (hy - 300) / 5));
      riskComponents['credit'] = Math.round(creditRisk * 100) / 100;
      weights['credit'] = 0.15;
    }

    // Liquidity risk (breadth < 50%)
    if (latest.breadth) {
      const breadth = latest.breadth;
      const liquidityRisk = Math.max(0, (100 - breadth) / 2);
      riskComponents['liquidity'] = Math.round(liquidityRisk * 100) / 100;
      weights['liquidity'] = 0.10;
    }

    // Labor market risk (unemployment > 4%)
    if (latest.unemployment_rate) {
      const unemployment = latest.unemployment_rate;
      const laborRisk = Math.min(100, Math.max(0, (unemployment - 3.5) / 2 * 100));
      riskComponents['unemployment'] = Math.round(laborRisk * 100) / 100;
      weights['unemployment'] = 0.05;
    }

    // Calculate weighted risk score
    let riskScore = 0;
    if (Object.keys(riskComponents).length > 0) {
      const totalWeight = Object.keys(riskComponents).reduce(
        (sum, key) => sum + (weights[key] || 0),
        0
      );

      if (totalWeight > 0) {
        riskScore = Object.keys(riskComponents).reduce(
          (sum, key) => sum + (riskComponents[key] * (weights[key] || 0)),
          0
        ) / totalWeight;
      }
    }

    const interpretation = interpretRiskScore(riskScore);

    return NextResponse.json({
      risk_score: Math.round(riskScore * 100) / 100,
      components: riskComponents,
      interpretation,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error calculating risk score:', error);
    return NextResponse.json(
      { error: 'Failed to calculate risk score' },
      { status: 500 }
    );
  }
}

function interpretRiskScore(score: number): string {
  if (score < 20) return 'Low';
  if (score < 40) return 'Moderate';
  if (score < 60) return 'Elevated';
  if (score < 80) return 'High';
  return 'Critical';
}
