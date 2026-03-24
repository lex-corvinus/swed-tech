import {Component} from "../../../core/Component.js";

export class SubmitBtn extends Component {

    render() {
        return `

        <button type="button" class="submit-apl-btn" onclick="alert('This is a mockup. No data was submitted.')">
            SUBMIT
        </button>
        `;
    };
}