import CautionIcon from "../../assets/caution-smile.svg";
import DangerIcon from "../../assets/danger-smile.svg";
import OkayIcon from "../../assets/ok-smile.svg";

import { Component } from "../../core/Component.js";
import { SubmitBtn } from "./components/SubmitBtn.js";

import { calculateLoan } from "../../utils/loanCalculation.js";
import { t } from "../../core/i18n.js";

export class Step5 extends Component {
	render() {
		const {
			amount,
			interestRate,
			period,
			income,
			employment,
			monthlyPaymentResult,
			totalRepayment,
			additionalInfo,
			warningLevel,
			warningMessage,
		} = this.state.data;

		const employmentDisplay = employment
			? t(`step1_option_${employment.replace("-", "_")}`)
			: t("step5_not_available");

		const incomeDisplay = income ? t(`step2_income_${income}`) : "0";

		return `
        <div id="step5" class="form-step">
            <div class="summary-title">${t("step5_title")}</div>
            
            <div class="calculator-summary-wrapper">
              <div class="calculator-summary-wrapper-top">
                  <div class="summary-wrapper-column">
                      <div class="summary-label-box">
                          <div class="label-title">
                              <span class="label-title-a">${t("step5_label_income")}</span>
                              <span class="label-title-b">(${employment || "N/A"})</span>
                          </div>
                          <div class="label-value">
                              <span class="label-value-a">${incomeDisplay}</span>
                          </div>
                      </div>
                      
                      <div class="summary-label-box">
                          <div class="label-title">
                              <div class="label-title-a">${t("step5_label_amount")}</div>
                          </div>
                          <div class="label-value">
                              <div class="label-value-a">${amount}</div>
                              <div class="label-value-b">${t("step5_currency")}</div>
                          </div>
                      </div>
                      
                      <div class="summary-wrapper-row">
                          <div class="summary-label-box">
                            <div class="label-title">
                              <span class="label-title-a">${t("step5_label_period")}</span>
                              <span class="label-title-b">(${t("step5_unit_months")})</span>
                            </div>
                            <div class="label-value">
                              <span class="label-value-a">${period}</span>
                            </div>
                          </div>
                          
                          <div class="summary-label-box">
                            <div class="label-title">
                              <span class="label-title-a">${t("step5_label_interest")}</span>
                              <span class="label-title-b">(${t("step5_unit_annual")})</span>
                            </div>
                            <div class="label-value">
                              <span class="label-value-a">${interestRate}%</span>
                            </div>
                          </div>
                      </div>
                  </div>
                  
                  <div class="summary-wrapper-column">
                    <div class="summary-label-box-large">
                      <div class="label-title">
                        <span class="label-title-a">${t("step5_label_additional")}</span>
                      </div>
                      <div class="label-title">
                        <span class="label-value-b">${additionalInfo || "..."}</span>
                      </div>
                    </div>
                  </div>
              </div>
              
              <div class="summary-wrapper-mid">
              
                  <div class="affordability-warning-summary  ${warningLevel}" data-level="${warningLevel}">
                      <span>${warningMessage}</span>
                      <div class="icon-wrapper-summary">
                        <img class="status-icon-sum icon-ok" src="${OkayIcon}" alt="ok">
                        <img class="status-icon-sum icon-caution" src="${CautionIcon}"  alt="caution">
                        <img class="status-icon-sum icon-danger" src="${DangerIcon}"  alt="danger">
                      </div>
                  </div>
  								
                  
                  <div class="summary-label-box">
                    <div class="label-title">
                        <span class="label-title-a">${t("step5_label_total")}</span>
                        <span class="label-title-b">(${t("step5_label_fee_inc")})</span>
                    </div>
                    <div class="label-value">
                        <span class="label-value-a">${totalRepayment}</span>
                        <span class="label-value-b">${t("step5_currency")}</span>
                    </div>
                  </div>
              </div>
              
                <div class="summary-wrapper-bot">
                <div class="result-container-right">
                    <div class="final-price">

                        <div class="montly-payment-container">
							<span id="monthly-payment-result">${monthlyPaymentResult}</span>
							<span>EUR</span>
						</div>
						<span id="monthly-payment-text">${t("calc_monthly_result")}</span>
                    </div>
  
                <div class="summary-bot-container">
                    ${new SubmitBtn().render()}
                </div>
              </div>
            </div>
        </div>
        `;
	}
}
