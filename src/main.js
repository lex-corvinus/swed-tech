import { Header } from './partials/Header.js';
import { Footer } from './partials/Footer.js';

import {initRouter} from "./router";

import "./styles/calculator.css";
import "./styles/header.css";
import "./styles/footer.css";

const initLayout = () => {
    const headerContainer = document.querySelector('header');
    const footerContainer = document.querySelector('footer');

    headerContainer.innerHTML = Header();
    footerContainer.innerHTML = Footer();
};
document.addEventListener("DOMContentLoaded", () => {

    initLayout();

    initRouter();
});