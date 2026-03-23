export class Component {
	constructor(containerElement, initialState = {}) {
		this.container =
			typeof containerElement === "string"
				? document.getElementById(containerElement)
				: containerElement;

		this.state = initialState;

		// permanent memory reference for event delegation!
		this._boundHandleEvents = this.handleEvents
			? this.handleEvents.bind(this)
			: null;
	}

	setState(newState) {
		this.state = { ...this.state, ...newState };
		this.updateDOM();
	}

	updateDOM() {
		if (!this.container) return;
		this.container.innerHTML = this.render();
		this.bindEvents();
	}

	bindEvents() {
		if (this._boundHandleEvents) {
			this.container.removeEventListener("click", this._boundHandleEvents);
			this.container.addEventListener("click", this._boundHandleEvents);
		}
	}

	render() {
		return "";
	}

	destroy() {
		if (this.container && this._boundHandleEvents) {
			this.container.removeEventListener("click", this._boundHandleEvents);
		}
		if (this.container) {
			this.container.innerHTML = "";
		}
	}
}
