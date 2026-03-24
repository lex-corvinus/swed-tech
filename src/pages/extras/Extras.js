import { Component } from "../../core/Component.js";
import { t } from "../../core/i18n.js";

export class Extras extends Component {
	render() {
		return `
            <div class="main-content-window">
            
                <ul class="extras-list">
                    <h2 class="extras-title">${t("header_nav_extras")}</h2>
                    
                    <hr class="calculator-divider">
                    
                    <h3 class="extras-point">github repo:</h3>
                    <a class="extras-link" href="https://github.com/lex-corvinus/swed-tech">https://github.com/lex-corvinus/swed-tech</a>
                    
                    <h3 class="extras-point">Figma Workspace:</h3>
                    <a class="extras-link" href="https://www.figma.com/design/4zkxUawp1PJ6gUiHnqfvGN/SWEDBANK?node-id=0-1&t=hPUyIWZGgM8GPrYl-1">Figma redirect</a>
                    
                    <h3 class="extras-point">Shortcut Board:</h3>
                    <a class="extras-link">NOT PUBLICALLY AVAILABLE :(</a>
                </ul>
            </div>
        `;
	}
}
