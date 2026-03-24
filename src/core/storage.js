const STORAGE_KEY = "loan_app_data";

const initialLoanState = {
	currentStep: 1,
	formData: {
		employment: null, // #1
		amount: 3000, // #2
		period: 24,
		income: "low",
		interestRate: 16.3,
		monthlyPaymentResult: "0,00",
		totalRepayment: "0,00",
		contractFee: "35,00",

		// # 3
		consents: {
			terms: false,
			privacy: false,
			marketing: false,
		},
		additionalInfo: "", // #4
	},
};

export const storage = {
	save(state) {
		try {
			const data = JSON.stringify(state);
			localStorage.setItem(STORAGE_KEY, data);
		} catch (error) {
			console.error("Error saving to LocalStorage", error);
		}
	},

	load() {
		try {
			const data = localStorage.getItem(STORAGE_KEY);
			return data ? JSON.parse(data) : initialLoanState;
		} catch (error) {
			console.error(
				"Error loading from LocalStorage (loading fallback: initialData): ",
				error,
			);
			return initialLoanState;
		}
	},

	// just in case we need to wipe it
	clear() {
		localStorage.removeItem(STORAGE_KEY);
	},
};
