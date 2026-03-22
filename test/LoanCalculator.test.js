import { describe, it, expect } from 'vitest';
import { calculateLoan, getAffordabilityWarning, calculateContractFee } from '../src/utils/loanCalculation.js';

// ─── Helper ───────────────────────────────────────────────────────────────────

/** Asserts two numbers match to the nearest cent (2 decimal places) */
function assertCents(actual, expected) {
  expect(Math.round(actual * 100)).toBe(Math.round(expected * 100));
}

// ─── calculateLoan ────────────────────────────────────────────────────────────

describe('calculateLoan', () => {

  it('16.3% annual rate, €10,000, 12 months — correct monthly payment', () => {
    // r = 16.3 / 100 / 12 = 0.013583…
    // M = 10000 × (r × (1+r)^12) / ((1+r)^12 − 1) ≈ 908.70
    const result = calculateLoan(10_000, 16.3, 12);

    assertCents(result.monthly,       908.73);
    assertCents(result.totalRepaid,   10_904.76); // 908.73 × 12
    assertCents(result.totalInterest, 904.76);
  });

  it('higher rate produces more total interest', () => {
    const low  = calculateLoan(10_000, 9.9,  12);
    const avg  = calculateLoan(10_000, 16.3, 12);
    const high = calculateLoan(10_000, 19.9, 12);

    expect(low.totalInterest).toBeLessThan(avg.totalInterest);
    expect(avg.totalInterest).toBeLessThan(high.totalInterest);
  });

  it('totalRepaid = monthly × months (no accumulated rounding error)', () => {
    const { monthly, totalRepaid, totalInterest } = calculateLoan(25_000, 16.3, 60);

    assertCents(monthly * 60,         totalRepaid);
    assertCents(totalRepaid - 25_000, totalInterest);
  });

  it('zero interest rate — principal split evenly across months', () => {
    const result = calculateLoan(1_200, 0, 12);

    assertCents(result.monthly,       100);
    assertCents(result.totalRepaid,   1_200);
    assertCents(result.totalInterest, 0);
  });

  it('zero interest rate — principal does not divide evenly', () => {
    // €1,000 / 3 months = 333.33…; ceiling rounding must not exceed the principal
    const { monthly, totalRepaid } = calculateLoan(1_000, 0, 3);

    expect(monthly).toBeGreaterThanOrEqual(333.33);
    expect(monthly).toBeLessThanOrEqual(333.34);
    expect(totalRepaid).toBeGreaterThanOrEqual(1_000);
  });

  it('smallest loan (€300) — no errors at the lower bound', () => {
    const result = calculateLoan(300, 16.3, 12);

    expect(result.monthly).toBeGreaterThan(0);
    expect(result.totalRepaid).toBeGreaterThan(300);
  });

  it('largest loan (€20,000) — no errors at the upper bound', () => {
    const result = calculateLoan(20_000, 16.3, 60);

    expect(result.monthly).toBeGreaterThan(0);
    expect(result.totalRepaid).toBeGreaterThan(20_000);
  });

  it('single month — full repayment in one payment', () => {
    const result = calculateLoan(500, 16.3, 1);

    expect(result.monthly).toBeGreaterThan(500);
    assertCents(result.totalRepaid,   result.monthly);
    assertCents(result.totalInterest, result.monthly - 500);
  });

  it('returns plain numbers, not BigInt', () => {
    const result = calculateLoan(5_000, 16.3, 24);

    expect(typeof result.monthly).toBe('number');
    expect(typeof result.totalRepaid).toBe('number');
    expect(typeof result.totalInterest).toBe('number');
  });

});

// ─── getAffordabilityWarning ──────────────────────────────────────────────────
//  SOFT_LIMIT = 30  →  caution
//  HARD_LIMIT = 40  →  danger

describe('getAffordabilityWarning', () => {

  it('level ok — 20% is safely below the soft limit of 30%', () => {
    const result = getAffordabilityWarning(200, 1_000); // 20%

    expect(result.level).toBe('ok');
    expect(result.pct).toBe(20);
  });

  it('level caution — 35% is between soft (30%) and hard (40%) limits', () => {
    const result = getAffordabilityWarning(350, 1_000); // 35%

    expect(result.level).toBe('caution');
    expect(result.pct).toBe(35);
  });

  it('level danger — 50% exceeds the hard limit of 40%', () => {
    const result = getAffordabilityWarning(500, 1_000); // 50%

    expect(result.level).toBe('danger');
    expect(result.pct).toBe(50);
  });

  it('exactly 30% — level ok (soft limit is exclusive)', () => {
    const result = getAffordabilityWarning(300, 1_000); // exactly 30%

    expect(result.level).toBe('ok');
    expect(result.pct).toBe(30);
  });

  it('exactly 40% — level caution (hard limit is exclusive)', () => {
    const result = getAffordabilityWarning(400, 1_000); // exactly 40%

    expect(result.level).toBe('caution');
    expect(result.pct).toBe(40);
  });

  it('Estonian minimal salary (€886) — €300 payment is ~34% → caution', () => {
    const result = getAffordabilityWarning(300, 886);

    expect(result.level).toBe('caution');
    expect(result.pct).toBeGreaterThan(30);
    expect(result.pct).toBeLessThanOrEqual(40);
  });

  it('medium income (€1,000) — €250 payment is 25% → ok', () => {
    const result = getAffordabilityWarning(250, 1_000);

    expect(result.level).toBe('ok');
    expect(result.pct).toBe(25);
  });

  it('high income (€2,000) — €400 payment is 20% → ok', () => {
    const result = getAffordabilityWarning(400, 2_000);

    expect(result.level).toBe('ok');
    expect(result.pct).toBe(20);
  });

  it('pct is correctly rounded to a whole percent', () => {
    // €1 / €3 = 33.333…% → 33
    const result = getAffordabilityWarning(1, 3);

    expect(result.pct).toBe(33);
  });

  it('returns a plain number for pct, not BigInt', () => {
    const { pct } = getAffordabilityWarning(100, 1_000);

    expect(typeof pct).toBe('number');
  });

});

// ─── calculateContractFee ─────────────────────────────────────────────────────
//  CONTRACT_FEE_PCT = 1.5%   MIN_CONTRACT_FEE = €35

describe('calculateContractFee', () => {

  const SWEDBANK = { CONTRACT_FEE_PCT: 1.5, MIN_CONTRACT_FEE: 35 };

  it('€10,000 × 1.5% = €150', () => {
    assertCents(calculateContractFee(10_000, SWEDBANK), 150);
  });

  it('€500 × 1.5% = €7.50 — minimum fee of €35 applies', () => {
    assertCents(calculateContractFee(500, SWEDBANK), 35);
  });

  it('smallest loan (€300) × 1.5% = €4.50 — minimum fee of €35 applies', () => {
    assertCents(calculateContractFee(300, SWEDBANK), 35);
  });

  it('boundary — minimum fee threshold is at ~€2,333', () => {
    // €2,333 × 1.5% = €34.995 → rounds to €35.00 → still minimum
    // €2,334 × 1.5% = €35.01  → percentage fee kicks in
    assertCents(calculateContractFee(2_333, SWEDBANK), 35);
    expect(calculateContractFee(2_334, SWEDBANK)).toBeGreaterThan(35);
  });

  it('largest loan (€20,000) × 1.5% = €300', () => {
    assertCents(calculateContractFee(20_000, SWEDBANK), 300);
  });

  it('returns a plain number, not BigInt', () => {
    expect(typeof calculateContractFee(5_000, SWEDBANK)).toBe('number');
  });

});