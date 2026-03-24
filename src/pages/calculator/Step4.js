import { Component } from "../../core/Component.js";
import {t} from "../../core/i18n.js";

export class Step4 extends Component {
	handleEvents(e) {
		if (e.target.id === "additional-info") {
			this.state.onUpdate({
				additionalInfo: e.target.value,
			});
		}
	}

	render() {
		const { additionalInfo } = this.state.data;

		return `
        <div id="step4" class="form-step">
            <div class="input-group">
                <label for="additional-info">${t('step4_label')}</label>
                
                <textarea 
                    id="additional-info" 
                    placeholder="${t('step4_placeholder')}"
                >${additionalInfo || ""}</textarea>
            </div>
        </div>
        `;
	}
}
