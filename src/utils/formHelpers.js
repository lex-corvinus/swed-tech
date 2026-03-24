export const formHelpers = {

	getValue(element) {
		return element ? element.value : null;
	},

	onDropdownChange(element, callback) {
		if (element) {
			element.addEventListener("change", (e) => callback(e.target.value));
		}
	},

	// --- SLIDER HELPERS ---
	initSlider(slider, input, callback) {
		if (!slider) return;

		const min = parseInt(slider.min);
		const max = parseInt(slider.max);

		const bubble = document.createElement("div");
		bubble.className = "slider-bubble";

		const wrapper = document.createElement("div");
		wrapper.style.position = "relative";
		wrapper.style.width = "100%";

		slider.parentElement.insertBefore(wrapper, slider);
		wrapper.appendChild(slider);
		wrapper.appendChild(bubble);

		const updateBubble = (value) => {
			const pct = (value - min) / (max - min);
			const thumbW = 25;
			const trackW = slider.offsetWidth || slider.getBoundingClientRect().width;
			const offset = pct * (trackW - thumbW) + thumbW / 2;

			bubble.textContent = value.toLocaleString("de-DE");
			bubble.style.left = offset + "px";
			bubble.style.transform = "translateX(-50%)";
			slider.style.setProperty("--value-pct", `${pct * 100}%`);
		};

		const onSliderChange = () => {
			const value = parseInt(slider.value);
			if (input) input.value = value;
			updateBubble(value);
			callback(value);
		};

		const onInputChange = () => {
			if (!input) return;
			const value = parseInt(input.value);
			
			if (isNaN(value) || input.value === "") {
			    callback(value);
			    return;
			}

			if (value >= min && value <= max) {
				slider.value = value;
				updateBubble(value);
			}
			callback(value);
		};

		slider.addEventListener("input", onSliderChange);
		if (input) {
			input.addEventListener("input", onInputChange);
			input.addEventListener("blur", () => {
				let value = parseInt(input.value);
				if (isNaN(value)) value = min;
				value = Math.max(min, Math.min(max, value));
				input.value = value;
				slider.value = value;
				updateBubble(value);
				callback(value);
			});
		}

		onSliderChange();
	},
};
