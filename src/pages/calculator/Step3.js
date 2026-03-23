import { Component } from "../../core/Component.js";

export class Step3 extends Component {
	handleEvents(e) {
		if (e.target.type !== "checkbox") return;

		const { id, checked } = e.target;
		const { consents } = this.state.data;

		const keyMap = {
			"consent-terms": "terms",
			"consent-privacy": "privacy",
			"consent-marketing": "marketing",
		};

		const consentKey = keyMap[id];

		if (consentKey) {
			this.state.onUpdate({
				consents: {
					...consents,
					[consentKey]: checked,
				},
			});
		}
	}

	render() {
		const { consents } = this.state.data;

		return `
        <div id="step3" class="form-step">
        
            <div class="consent-group">
                <label class="check-item">
                
                    <input type="checkbox" id="consent-terms" 
                        ${consents.terms ? "checked" : ""}>
                    <span>I agree to the <a href="#">Terms and Conditions</a> *</span>
                </label>
                
                <label class="check-item">
                
                    <input type="checkbox" id="consent-privacy" 
                        ${consents.privacy ? "checked" : ""}>
                    <span>I agree to the Privacy Policy *</span>
                </label>

                <label class="check-item">
                
                    <input type="checkbox" id="consent-marketing" 
                        ${consents.marketing ? "checked" : ""}>
                    <span>Send me loan offers (Optional)</span>
                </label>
            </div>
        </div>
        `;
	}
}
