import { Component } from "../../core/Component.js";
import {t} from "../../core/i18n.js";

export class Step1 extends Component {
	handleEvents(e) {
		if (e.target.type === "radio" && e.target.name === "employment") {
			const newValue = e.target.value;

			this.state.onUpdate({
				employment: newValue,
			});
		}
	}

	render() {
		const { employment } = this.state.data;
		const isActive = (val) => employment === val;

		return `
        <div id="step1" class="form-step">
            <label class="radio-item ${isActive("employed") ? "active" : ""}">
            
                <input type="radio" name="employment" value="employed" 
                    ${isActive("employed") ? "checked" : ""}>
                <span>${t('step1_option_employed')}</span>
            </label>

            <label class="radio-item ${isActive("self-employed") ? "active" : ""}">
            
                <input type="radio" name="employment" value="self-employed" 
                    ${isActive("self-employed") ? "checked" : ""}>
                <span>${t('step1_option_self_employed')}</span>
            </label>

            <label class="radio-item ${isActive("unemployed") ? "active" : ""}">
            
                <input type="radio" name="employment" value="unemployed" 
                    ${isActive("unemployed") ? "checked" : ""}>
                <span>${t('step1_option_unemployed')}</span>
            </label>
        </div>
        `;
	}
}
