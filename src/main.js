import { Header } from './layouts/Header.js';
import { Footer } from './layouts/Footer.js';
import {initRouter} from "./router";

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