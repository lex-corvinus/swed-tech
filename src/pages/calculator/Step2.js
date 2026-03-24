import CautionIcon from "../../assets/caution-smile.svg";
import DangerIcon from "../../assets/danger-smile.svg";
import OkayIcon from "../../assets/ok-smile.svg";

import {
	INCOME_MAP,
	INTEREST_RATE,
	PERIOD_TIME,
	SLIDER,
	SWEDBANK_SMALL_LOAN,
} from "../../utils/config.js";

import { formHelpers } from "../../utils/formHelpers.js";
import {
	calculateContractFee,
	calculateLoan,
	getAffordabilityWarning,
} from "../../utils/loanCalculation.js";

import { Component } from "../../core/Component.js";
import { t } from "../../core/i18n.js";

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

		const { monthly, totalRepaid: baseTotalRepaid } = calculateLoan(
			amount,
			rate,
			period,
		);
		const contractFee = calculateContractFee(amount, SWEDBANK_SMALL_LOAN);
		const totalRepaid = baseTotalRepaid + contractFee;
		const warning = getAffordabilityWarning(monthly, INCOME_MAP[incomeKey], t);

		const formatLocale = "et-EE";

		const formattedMonthly = monthly.toLocaleString(formatLocale, {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
		const formattedContractFee = contractFee.toLocaleString(formatLocale, {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
		const formattedTotalRepaid = totalRepaid.toLocaleString(formatLocale, {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});

		this.container.querySelector("#monthly-payment-result").textContent =
			formattedMonthly;

		this.container.querySelector("#contract-fee-display").textContent =
			formattedContractFee;

		this.container.querySelector("#total-repayment-display").textContent =
			formattedTotalRepaid;

		this.container.querySelector("#period-badge").textContent = period;

		const warningEl = this.container.querySelector("#affordability-warning");
		const textEl = this.container.querySelector("#warning-text");

		if (warningEl && textEl) {
			textEl.textContent = warning.message;
			warningEl.className = `affordability-warning ${warning.level}`;
			warningEl.dataset.level = warning.level;
		}

		this.state.onUpdate({
			amount,
			period,
			income: incomeKey,
			interestRate: rate,
			monthlyPaymentResult: formattedMonthly,
			totalRepayment: formattedTotalRepaid,
			contractFee: formattedContractFee,
			warningLevel: warning.level,
			warningMessage: warning.message,
		});
	}

	render() {
		const { amount, period, income, interestRate, monthlyPaymentResult } =
			this.state.data;

		return `
        <div id="step2" class="form-step">
        
          <div class="loan-calculator">
            <h2>${t("step2_title")}</h2>
            
            <hr class="calculator-divider">

            <div class="upper-loan-calculator-grid">
            
              <div class="grid-left">
                <div class="input-group">
                  <label>${t("step2_label_amount")}</label>
                  <div class="range-container">
                    <div class="input-wrapper">
                      <input type="number" class="loan-input" id="loan-input" value="${amount}">
                    </div>
                    
                    <div class="slider-container">
                      <input type="range" id="loan-slider" min="${SLIDER.MIN}" max="${SLIDER.MAX}" step="${SLIDER.STEP}" value="${amount}">
                      <div class="range-limits">
                        <span>${SLIDER.MIN}</span>
                        <span>${SLIDER.MAX}</span>
                      </div>
                    </div>
                    
                    <div class="warning-wrapper">
                      
                        <div class="affordability-warning" id="affordability-warning" data-level="ok">
                        
                          <span id="warning-text">${t("step2_warning_calculating")}</span>
                          
                          <div class="icon-wrapper">
                            <img class="status-icon icon-ok" src="${OkayIcon}" alt="ok">
                            <img class="status-icon icon-caution" src="${CautionIcon}" alt="caution">
                            <img class="status-icon icon-danger" src="${DangerIcon}" alt="danger">
                          </div>
                        </div>
                        
                      </div>
                  </div>
                </div>
              </div>

              <div class="grid-right">
                <div class="input-group">
                  <label>Your income:</label>
                  <div class="select-wrapper">
										<select id="income-dropdown">
											<option value="low" ${income === `${INCOME_MAP.low}` ? "selected" : ""}>${t("step2_income_low")}</option>
											<option value="medium" ${income === `${INCOME_MAP.medium}` ? "selected" : ""}>${t("step2_income_medium")}</option>
											<option value="high" ${income === `${INCOME_MAP.high}` ? "selected" : ""}>${t("step2_income_high")}</option>
										</select>
                  </div>
                </div>

                <div class="input-group">
                  <label>Loan period:</label>
                  <div class="select-wrapper">
                    <select id="period-dropdown">
                    <option value="${PERIOD_TIME.SHORT}"  ${period === PERIOD_TIME.SHORT ? "selected" : ""}>${PERIOD_TIME.SHORT} ${t("step2_months")}</option>
                    <option value="${PERIOD_TIME.MEDIUM}" ${period === PERIOD_TIME.MEDIUM ? "selected" : ""}>${PERIOD_TIME.MEDIUM} ${t("step2_months")}</option>
                    <option value="${PERIOD_TIME.LONG}"   ${period === PERIOD_TIME.LONG ? "selected" : ""}>${PERIOD_TIME.LONG} ${t("step2_months")}</option>
                    </select>
                  </div>
                </div>

                <div class="input-group">
                  <label>${t("step2_label_interest")}</label>
                  <div class="select-wrapper">
                    <select id="interest-dropdown">
                        <option value="${INTEREST_RATE.LOW}" ${interestRate === INTEREST_RATE.LOW ? "selected" : ""}>9.9%</option>
                        <option value="${INTEREST_RATE.AVG}"  ${interestRate === INTEREST_RATE.AVG ? "selected" : ""}>16.3%</option>
                        <option value="${INTEREST_RATE.HIGH}" ${interestRate === INTEREST_RATE.HIGH ? "selected" : ""}>19.9%</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <hr class="calculator-divider">

            <div class="result-section">
            
               <div class="result-col-left">
                   <h2>${t("step2_monthly_payment")}</h2>
                   <div class="period-info-container">
						<span class="period-info-label">${t("step2_period_label")}</span>
						<div class="period-info-box">
							<span id="period-badge">${period}</span>${t("step2_months")}
						</div>
					</div>
               </div>
               
               <div class="result-col-mid">
				   <div class="result-info-container">
				       <span class="result-info-label">${t("step2_service_fee")}</span>
				       
					   <div class="result-info-box">
					   		<span id="contract-fee-display"></span> €
					   </div>
				   </div>
			   
				   <div class="result-info-container">
					   <span class="result-info-label">${t("step2_total_repayment")}</span>
					   
					   <div class="result-info-box">
					   		<span id="total-repayment-display"></span> €
					   </div>
                   </div>
               </div>

               <div class="result-container-right">
                   <div class="final-price">
                       <span id="monthly-payment-result">${monthlyPaymentResult}</span>
                       <span id="monthly-payment-text">${t("calc_monthly_result")}</span>
                   </div>
               </div>
            </div>
          </div>
        </div>`;
	}
}
