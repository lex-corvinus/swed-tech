import { Footer } from "./partials/Footer.js";
import { Header } from "./partials/Header.js";

import { initRouter } from "./core/router.js";

import "./styles/calculator.css";
import "./styles/header.css";
import "./styles/steps.css";

const initLayout = () => {
	const headerContainer = document.querySelector("header");
	const footerContainer = document.querySelector("footer");

	headerContainer.innerHTML = Header();
	footerContainer.innerHTML = Footer();
};
document.addEventListener("DOMContentLoaded", () => {
	initLayout();

	initRouter();
});
