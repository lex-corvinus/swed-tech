// current date minimal salary 22.03.2025
const ESTONIAN_MINIMAL_SALARY = 886;

export const SWEDBANK_SMALL_LOAN = {
	MIN_RATE: 9.9,
	AVG_RATE: 16.3,
	CONTRACT_FEE_PCT: 1.5,
	MIN_CONTRACT_FEE: 35, // Minimal fee
};

export const INTEREST_RATE = {
	LOW: 9.9,
	AVG: 16.3,
	HIGH: 19.9,
};

export const INCOME_MAP = {
	low: ESTONIAN_MINIMAL_SALARY, // < 1,000 €
	medium: 1000, // 1,000 – 2,000 €
	high: 2000, // > 2,000 €
};

export const PERIOD_TIME = {
	SHORT: 12,
	MEDIUM: 24,
	LONG: 36,
};

export const AFFORDABILITY = {
	SOFT_LIMIT: 30, // % — caution warning
	HARD_LIMIT: 40, // % — danger, lender may reject
};

export const SLIDER = {
	MIN: 300,
	MAX: 20000,
	STEP: 50,
	DEFAULT: 500,
};
