import { Component } from "../../core/Component.js";
import { formHelpers } from "../../utils/formHelpers.js";

export class Step2 extends Component {
	bindEvents() {
		super.bindEvents();

		const slider = this.container.querySelector("#loan-slider");
		const numInput = this.container.querySelector("#loan-input");
		const periodDropdown = this.container.querySelector("#period-dropdown");
		const incomeDropdown = this.container.querySelector("#income-dropdown");
		const interestDropdown = this.container.querySelector("#interest-dropdown");

		formHelpers.initSlider(slider, numInput, (val) => {
			this.updateCalculations();
		});

		const dropdowns = [periodDropdown, incomeDropdown, interestDropdown];
		dropdowns.forEach((el) => {
			if (el) {
				el.addEventListener("change", () => this.updateCalculations());
			}
		});

		this.updateCalculations();
	}

	updateCalculations() {
		const slider = this.container.querySelector("#loan-slider");
		const periodEl = this.container.querySelector("#period-dropdown");
		const incomeEl = this.container.querySelector("#income-dropdown");
		const interestEl = this.container.querySelector("#interest-dropdown");

		if (!slider || !periodEl || !incomeEl || !interestEl) return;

		const amount = parseInt(slider.value);
		const period = parseInt(periodEl.value);
		const incomeKey = incomeEl.value;
		const rate = parseFloat(interestEl.value);

		const { monthly } = calculateLoan(amount, rate, period);
		const contractFee = calculateContractFee(amount);
		const incomeMap = { low: 800, medium: 1500, high: 2500 };
		const warning = getAffordabilityWarning(monthly, incomeMap[incomeKey]);

		this.container.querySelector("#monthly-payment-result").textContent =
			monthly.toLocaleString("et-EE", {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			});

		this.container.querySelector("#contract-fee-display").textContent =
			Math.round(contractFee);

		this.container.querySelector("#total-repayment-display").textContent =
			Math.round(monthly * period).toLocaleString("et-EE");

		this.container.querySelector("#period-badge").textContent = period;

		const warningEl = this.container.querySelector("#affordability-warning");
		const textEl = this.container.querySelector("#warning-text");

		if (warningEl && textEl) {
			textEl.textContent = warning.message;
			warningEl.className = `affordability-warning ${warning.level}`;
		}

		this.state.onUpdate({
			amount,
			period,
			income: incomeKey,
			interestRate: rate,
		});
	}

	render() {
		const { amount, period, income, interestRate } = this.state.data;

		return `
        <div id="step2" class="form-step">
        
          <div class="loan-calculator">
            <h2>Loan request info</h2>
            
            <hr class="calculator-divider">

            <div class="upper-loan-calculator-grid">
            
              <div class="grid-left">
                <div class="input-group">
                  <label>Loan Amount</label>
                  <div class="range-container">
                    <div class="input-wrapper">
                      <input type="number" class="loan-input" id="loan-input" value="${amount}">
                    </div>
                    
                    <div class="slider-container">
                      <input type="range" id="loan-slider" min="500" max="10000" step="100" value="${amount}">
                      <div class="range-limits">
                        <span>500 €</span>
                        <span>10.000 €</span>
                      </div>
                    </div>
                    
                    <div class="affordability-warning" id="affordability-warning">
                        <span id="warning-text">Calculating...</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="grid-right">
                <div class="input-group">
                  <label>Your income:</label>
                  <select id="income-dropdown">
                    <option value="low" ${income === "low" ? "selected" : ""}>< 1000€</option>
                    <option value="medium" ${income === "medium" ? "selected" : ""}>1000–2000€</option>
                    <option value="high" ${income === "high" ? "selected" : ""}>> 2000€</option>
                  </select>
                </div>

                <div class="input-group">
                  <label>Loan period:</label>
                  <select id="period-dropdown">
                    <option value="12" ${period === 12 ? "selected" : ""}>12 months</option>
                    <option value="24" ${period === 24 ? "selected" : ""}>24 months</option>
                    <option value="36" ${period === 36 ? "selected" : ""}>36 months</option>
                  </select>
                </div>

                <div class="input-group">
                  <label>Interest Rate:</label>
                  <select id="interest-dropdown">
                    <option value="9.9" ${interestRate === 9.9 ? "selected" : ""}>9.9%</option>
                    <option value="16.3" ${interestRate === 16.3 ? "selected" : ""}>16.3%</option>
                    <option value="19.9" ${interestRate === 19.9 ? "selected" : ""}>19.9%</option>
                  </select>
                </div>
              </div>
            </div>

			<hr class="calculator-divider">

            <div class="result-section">
            
               <div class="result-col-left">
                   <h2>Monthly payment</h2>
                   
                   <div class="period-info-container">
						<span class="period-info-label">Period:</span>
						<div class="period-info-box">
							<span id="period-dates-display">TEST</span>
						</div>
					</div>
               </div>
               
               <div class="result-col-mid">
				   <div class="result-info-container">
				       <span class="result-info-label">Service fee:</span>
				       
					   <div class="result-info-box">
					   		TEST
					   </div>
				   </div>
			   
				   <div class="result-info-container">
					   <span class="result-info-label">Total Repayment:</span>
					   
					   <div class="result-info-box">
					   		TEST
					   </div>
                   </div>
               </div>

               <div class="result-container-right">
                   <div class="final-price">
                       <span id="monthly-payment-result">0,00</span>
                   </div>
               </div>
            </div>
            
          </div>
        </div>`;
	}
}
