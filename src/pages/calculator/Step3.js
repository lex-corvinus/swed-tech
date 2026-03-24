import { Component } from "../../core/Component.js";
import {t} from "../../core/i18n.js";

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
                    <span>
                        ${t('step3_consent_terms_text')} 
                        <a href="#">${t('step3_consent_terms_link')}</a> *
                    </span>
                </label>
                
                <label class="check-item">
                    <input type="checkbox" id="consent-privacy" 
                        ${consents.privacy ? "checked" : ""}>
                    <span>${t('step3_consent_privacy')}</span>
                </label>

                <label class="check-item">
                    <input type="checkbox" id="consent-marketing" 
                        ${consents.marketing ? "checked" : ""}>
                    <span>${t('step3_consent_marketing')}</span>
                </label>
            </div>
        </div>
        `;
	}
}
