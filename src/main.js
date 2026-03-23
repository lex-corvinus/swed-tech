import { Header, initHeader } from './partials/Header.js';
import { Footer } from './partials/Footer.js';

import { initRouter } from "./core/router.js";

import "./styles/calculator.css";
import "./styles/header.css";
import "./styles/home.css";
import "./styles/steps.css";

const initLayout = () => {
	const headerContainer = document.querySelector("header");
	const footerContainer = document.querySelector("footer");

    headerContainer.innerHTML = Header();
    footerContainer.innerHTML = Footer();

    initHeader();
};
document.addEventListener("DOMContentLoaded", () => {

    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);


    initLayout();

    initRouter();

    document.body.addEventListener("click", e => {
        const themeBtn = e.target.closest("#theme-toggle");

        if (themeBtn) {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        }
    });
});
