import { Component } from "../../../core/Component.js";
import { t } from "../../../core/i18n.js";

export class SubmitBtn extends Component {
	render() {
		return `

        <button type="button" class="submit-apl-btn" onclick="alert('This is a mockup. No data was submitted.')">
            ${t("btn_submit")}
        </button>
        `;
	}
}
