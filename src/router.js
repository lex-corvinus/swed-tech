import { Home } from './pages/home/Home.js';
import { LoanCalculator } from './pages/calculator/LoanCalculator.js';

const routes = {
    "/": { title: "Home", render: Home },
    "/loan-calculator": { title: "Loan Calculator", render: LoanCalculator.render, init: LoanCalculator.init},
    "/test": { title: "Test", render: () => "<h1>TEST</h1>" },

    "404": { title: "404", render: () => "<h1>Page Not Found</h1>" }
};

const getPathFromHash = () => {
    let hash = window.location.hash.slice(1);
    return hash ? hash : "/";
};

const renderPage = () => {
    const path = getPathFromHash();
    const route = routes[path] || routes["404"];
    document.title = route.title;

    document.getElementById("app-root").innerHTML = route.render();

    if (route.init) {
        route.init();
    }

    updateActiveNavbarLink(path);
};

export const navigateTo = (url) => {
    window.location.hash = url;
};

const updateActiveNavbarLink = (currentPath) => {
    const navLinks = document.querySelectorAll('a[data-link]');

    navLinks.forEach(link => {
        link.classList.remove('active');

        const href = link.getAttribute('href');
        const linkPath = href.startsWith('#') ? href.slice(1) : href;

        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
};

export const initRouter = () => {
    window.addEventListener("hashchange", renderPage);
    renderPage();
};