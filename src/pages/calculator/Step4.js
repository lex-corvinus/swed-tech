import { Component } from "../../core/Component.js";
import { t } from "../../core/i18n.js";

export class Step4 extends Component {
	bindEvents() {
		super.bindEvents();

		const textarea = this.container.querySelector("#additional-info");
		if (textarea) {
			textarea.addEventListener("input", (e) => {
				const textValue = e.target.value;

				const isValid = textValue.trim().length >= 10;

				this.state.onUpdate({
					additionalInfo: textValue,
					isStepValid: isValid
				});

				const counter = this.container.querySelector("#char-counter");
				if (counter) {
					counter.textContent = `${textValue.length}/1000`;
				}
			});
		}
	}

	render() {
		const { additionalInfo } = this.state.data;

		return `
        <div id="step4" class="form-step">
            <div class="input-group">
                <div style="display: flex; justify-content: space-between;">
                    <label for="additional-info">${t("step4_label")}</label>
                    <span id="char-counter" style="color: var(--text-main); font-size: 1rem;">
                        ${additionalInfo ? additionalInfo.length : 0}/1000
                    </span>
                </div>
                
                <textarea 
                    id="additional-info" 
                    maxlength="500"
                    placeholder="${t("step4_placeholder")}"
                >${additionalInfo || ""}</textarea>
            </div>
        </div>
        `;
	}
}
