import {AFFORDABILITY} from "./config.js";

const CENTS = 100n;
const SCALE = 10_000_000_000n; // 10^10


/* Helpers */

function toCents(euros) {
  return BigInt(Math.round(euros * 100));
}

function toEuros(cents) {
  // Split into whole euros and remainder cents to avoid float imprecision
  const whole = cents / CENTS;
  const remainder = cents % CENTS;
  return Number(whole) + Number(remainder) / 100;
}


/**Each step rounds to the nearest unit so that
 * error doesn't accumulate across hundreds of iterations.
 *
 *   scaledPow(SCALE + r_s, n)  =  (1 + r)^n  * SCALE
 *
 * @param {bigint} base  - value already multiplied by SCALE
 * @param {number} exp   - positive integer exponent (loan term in months)
 * @returns {bigint}
 */

function scaledPow(base, exp) {
  let result = SCALE;
  const half = SCALE / 2n;
  for (let i = 0; i < exp; i++) {
    result = (result * base + half) / SCALE;
  }
  return result;
}

/* Methods for loan */

/**
 * Calculates monthly payment using the standard amortization formula:
 *
 *   M = P · r(1+r)^n /
 *      [(1+r)^n − 1]
 *
 * All arithmetic is performed in integer euro-cents via BigInt to eliminate
 * floating-point rounding errors that compound over long loan terms.
 *
 * @param {number} principal  - Loan amount in €
 * @param {number} annualRate - Annual interest rate (e.g. 13.0 for 13 %)
 * @param {number} months     - Loan term in months
 * @returns {{ monthly: number, totalRepaid: number, totalInterest: number }}
 */
export function calculateLoan(principal, annualRate, months) {
  const P = toCents(principal);
  const n = months;

  // Monthly rate encoded at SCALE precision:  r_s = (annualRate / 100 / 12) * SCALE
  const r_s = BigInt(Math.round((annualRate / 100 / 12) * Number(SCALE))) // r

  let monthly_cents;

  if (r_s === 0n) {
    monthly_cents = (P + BigInt(n) - 1n) / BigInt(n); // no interest

  } else {
    const oneR_s = SCALE + r_s;  // 1 + r
    const oneRn_s = scaledPow(oneR_s, n); // (1 + r)^n

    const divisor = SCALE * (oneRn_s - SCALE);
    const numerator = P * r_s * oneRn_s;

    monthly_cents = (numerator + divisor / 2n) / divisor;
  }

  const totalRepaid_cents = monthly_cents * BigInt(n);
  const totalInterest_cents = totalRepaid_cents - P;

  return {
    monthly: toEuros(monthly_cents),
    totalRepaid: toEuros(totalRepaid_cents),
    totalInterest: toEuros(totalInterest_cents),
  };
}

export function getAffordabilityWarning(monthly, income) {
  const monthlyC = toCents(monthly); // monthly cents
  const incomeC = toCents(income); // income cents

  // Compute (monthly / income * 100) rounded to nearest whole percent.
  // Multiply by 10_000n first (= 100 * 100) to keep two extra digits for
  // rounding, then bring back to a plain JS number for the threshold checks.
  const rawPct100 = Number(monthlyC * 10_000n / incomeC); // truncated × 100
  const pct = Math.round(rawPct100 / 100); // percent

  if (pct > AFFORDABILITY.HARD_LIMIT) return {level: 'danger', pct};
  if (pct > AFFORDABILITY.SOFT_LIMIT) return {level: 'caution', pct};

  return {level: 'ok', pct};
}

/**
 * Calculates the contract fee, applying the configured percentage and
 * honouring the minimum fee floor.
 *
 * @param {number} amount
 * @param {{ CONTRACT_FEE_PCT: number, MIN_CONTRACT_FEE: number }} config
 * @returns {number} Fee in €, rounded to the nearest cent
 */
export function calculateContractFee(amount, config) {
  const amountC = toCents(amount);

  // Encode the percentage as an integer of hundredths to avoid float issues
  // (e.g. 1.5 % → 150 basis-point-hundredths; 1.3 % → 130, not 129.999…)
  const feeBps = BigInt(Math.round(config.CONTRACT_FEE_PCT * 100));

  // fee = amount * (CONTRACT_FEE_PCT / 100)
  //     = amountC * feeBps / 10_000   (because feeBps = pct * 100)
  // Round to nearest cent.
  const feeC = (amountC * feeBps + 5_000n) / 10_000n;
  const minFeeC = toCents(config.MIN_CONTRACT_FEE);

  return toEuros(feeC < minFeeC ? minFeeC : feeC);
}