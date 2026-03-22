import { Home } from './pages/home/Home.js';
import { LoanCalculator } from './pages/calculator/LoanCalculator.js';

const routes = {
    "/": { title: "Home", render: Home },
    "/intro": { title: "Intro", render: () => "<h1>Intro</h1>" },
    "/loan-calculator": { title: "Loan Calculator", render: LoanCalculator.render, init: LoanCalculator.init},
    "/test": { title: "Test", render: () => "<h1>TEST</h1>" },

    "404": { title: "404", render: () => "<h1>Page Not Found</h1>" }
};

const renderPage = () => {
    const path = window.location.pathname;
    const route = routes[path] || routes["404"];
    document.title = route.title;

    document.getElementById("app-root").innerHTML = route.render();

    if (route.init) {
        route.init();
    }
};
export const navigateTo = (url) => {
    window.history.pushState(null, null, url);
    renderPage();
};
export const initRouter = () => {
    window.addEventListener("popstate", renderPage);
    renderPage();
};