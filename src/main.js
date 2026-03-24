import { Header, initHeader } from "./partials/Header.js";
import { Footer } from "./partials/Footer.js";

import { initRouter } from "./core/router.js";
import { initI18n } from "./core/i18n.js";
import { settingsStorage, THEMES, LANGUAGES } from "./core/storage.js";

import "./styles/calculator.css";
import "./styles/header.css";
import "./styles/footer.css";
import "./styles/home.css";
import "./styles/steps.css";
import "./styles/extras.css";

const initLayout = () => {
	const headerContainer = document.querySelector("header");
	const footerContainer = document.querySelector("footer");

	headerContainer.innerHTML = Header();
	footerContainer.innerHTML = Footer();

	initHeader();
};
document.addEventListener("DOMContentLoaded", () => {
	document.documentElement.setAttribute(
		"data-theme",
		settingsStorage.getTheme(),
	);

	initI18n();

	initLayout();

	initRouter();

	document.body.addEventListener("click", (e) => {
		const themeBtn = e.target.closest("#theme-toggle");

		if (themeBtn) {
			const currentTheme = document.documentElement.getAttribute("data-theme");
			const newTheme =
				currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;

			document.documentElement.setAttribute("data-theme", newTheme);
			settingsStorage.setTheme(newTheme);
		}

		const langBtn = e.target.closest("[data-lang]");
		if (langBtn) {
			const newLanguage = langBtn.getAttribute("data-lang");

			if (Object.values(LANGUAGES).includes(newLanguage)) {
				settingsStorage.setLanguage(newLanguage);

				window.location.reload();
			}
		}
	});
});
