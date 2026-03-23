import { Component } from "../../core/Component.js";

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
                <label for="additional-info">Additional info:</label>
                
                <textarea 
                    id="additional-info" 
                    placeholder="Type your message here..."
                >${additionalInfo || ""}</textarea>
            </div>
        </div>
        `;
	}
}
