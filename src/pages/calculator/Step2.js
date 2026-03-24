import { formHelpers } from "../../utils/formHelpers.js";
import {calculateContractFee, calculateLoan, getAffordabilityWarning} from "../../utils/loanCalculation.js";

import { Component } from "../../core/Component.js";
import {t} from "../../core/i18n.js";

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

		const formatLocale = 'et-EE';

		this.container.querySelector("#monthly-payment-result").textContent =
			monthly.toLocaleString(formatLocale, {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			});

		this.container.querySelector("#contract-fee-display").textContent =
			Math.round(contractFee).toLocaleString(formatLocale);

		this.container.querySelector("#total-repayment-display").textContent =
			Math.round(monthly * period).toLocaleString(formatLocale);

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
            <h2>${t('step2_title')}</h2>
            
            <hr class="calculator-divider">

            <div class="upper-loan-calculator-grid">
              <div class="grid-left">
                <div class="input-group">
                  <label>${t('step2_label_amount')}</label>
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
                        <span id="warning-text">${t('step2_warning_calculating')}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="grid-right">
                <div class="input-group">
                  <label>${t('step2_label_income')}</label>
                  <select id="income-dropdown">
                    <option value="low" ${income === "low" ? "selected" : ""}>${t('step2_income_low')}</option>
                    <option value="medium" ${income === "medium" ? "selected" : ""}>${t('step2_income_medium')}</option>
                    <option value="high" ${income === "high" ? "selected" : ""}>${t('step2_income_high')}</option>
                  </select>
                </div>

                <div class="input-group">
                  <label>${t('step2_label_period')}</label>
                  <select id="period-dropdown">
                    <option value="12" ${period === 12 ? "selected" : ""}>12 ${t('step2_months')}</option>
                    <option value="24" ${period === 24 ? "selected" : ""}>24 ${t('step2_months')}</option>
                    <option value="36" ${period === 36 ? "selected" : ""}>36 ${t('step2_months')}</option>
                  </select>
                </div>

                <div class="input-group">
                  <label>${t('step2_label_interest')}</label>
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
                   <h2>${t('step2_monthly_payment')}</h2>
                   <div class="period-info-container">
                   
                      <span class="period-info-label">${t('step2_period_label')}</span>
                      <div class="period-info-box">
                         <span id="period-badge">${period}</span> ${t('step2_months')}
                      </div>
                   </div>
               </div>
               
               <div class="result-col-mid">
                <div class="result-info-container">'
                
                    <span class="result-info-label">${t('step2_service_fee')}</span>
                    <div class="result-info-box">
                        <span id="contract-fee-display">0</span> €
                    </div>
                </div>
             
                <div class="result-info-container">
                
                   <span class="result-info-label">${t('step2_total_repayment')}</span>
                   <div class="result-info-box">
                       <span id="total-repayment-display">0</span> €
                   </div>
                </div>
               </div>

               <div class="result-container-right">
                   <div class="final-price">
                       <span id="monthly-payment-result">0,00</span> €
                   </div>
               </div>
            </div>
          </div>
        </div>`;
	}
}
