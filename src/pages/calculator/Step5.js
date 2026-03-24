import { Component } from "../../core/Component.js";
import {calculateLoan} from "../../utils/loanCalculation.js";
import {SubmitBtn} from "./components/SubmitBtn.js";

export class Step5 extends Component {
	render() {
		const { amount, interestRate, period, income, employment } = this.state.data;

		const { monthly } = calculateLoan(amount, interestRate, period);
		const totalRepayment = monthly * period;

		return `
        <div id="step5" class="form-step">
            <div class="summary-title">Loan details:</div>
            
            <div class="calculator-summary-wrapper">
              <div class="calculator-summary-wrapper-top">
                  <div class="summary-wrapper-column">
                      <div class="summary-label-box">
                          <div class="label-title">
                              <span class="label-title-a">MONTHLY INCOME</span>
                              <span class="label-title-b">(${employment || 'N/A'})</span>
                          </div>
                          <div class="label-value">
                              <span class="label-value-a">${income || '0'}</span>
                          </div>
                      </div>
                      
                      <div class="summary-label-box">
                          <div class="label-title">
                              <div class="label-title-a">LOAN AMOUNT</div>
                          </div>
                          <div class="label-value">
                              <div class="label-value-a">${amount}</div>
                              <div class="label-value-b">EUR</div>
                          </div>
                      </div>
                      
                      <div class="summary-wrapper-row">
                          <div class="summary-label-box">
                            <div class="label-title">
                              <span class="label-title-a">PERIOD</span>
                              <span class="label-title-b">(months)</span>
                            </div>
                            <div class="label-value">
                              <span class="label-value-a">${period}</span>
                            </div>
                          </div>
                          
                          <div class="summary-label-box">
                            <div class="label-title">
                              <span class="label-title-a" >INTEREST</span>
                              <span class="label-title-b" >(annual rate)</span>
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
                        <span class="label-title-a" >ADDITIONAL INFO</span>
                      </div>
                      <div class="label-title">
                        <span class="label-value-b">...</span>
                      </div>
                    </div>
                  </div>
              </div>
              
              <div class="summary-wrapper-mid">
                  <div>SJUDA EXTRA INFO</div>
                  <div class="summary-label-box">
                    <div class="label-title">
                        <span class="label-title-a">TOTAL REPAYMENT SUM</span>
                        <span class="label-title-b">(Service fee included)</span>
                    </div>
                    <div class="label-value">
                        <span class="label-value-a">${Math.round(totalRepayment).toLocaleString('et-EE')}</span>
                        <span class="label-value-b">EUR</span>
                    </div>
                  </div>
              </div>
              
              <div class="summary-wrapper-bot">
				<div class="result-container-right">
					<div class="final-price">
						<span id="monthly-payment-result">0,00</span>
					</div>
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