import { Home } from './pages/Home.js';

const routes = {
    "/": { title: "Home", render: Home },
    "/intro": { title: "Intro", render: () => "<h1>Intro</h1>" },
    "/loan-calculator": { title: "Loan Calculator", render: () => "<h1>Loan Calculator</h1>" },
    "/test": { title: "Test", render: () => "<h1>TEST</h1>" },

    "404": { title: "404", render: () => "<h1>Page Not Found</h1>" }
};

const renderPage = () => {
    const path = window.location.pathname;
    const route = routes[path] || routes["404"];
    document.title = route.title;

    document.getElementById("app-root").innerHTML = route.render();

    // updating navbar
    updateActiveLink();
};
export const navigateTo = (url) => {
    window.history.pushState(null, null, url);
    renderPage();
};
export const initRouter = () => {
    window.addEventListener("popstate", renderPage);
    renderPage();
};

// tracking page state
const updateActiveLink = () => {
    const path = window.location.pathname;

    // Select all links in your navbar
    const navLinks = document.querySelectorAll('.navbar a');

    navLinks.forEach(link => {
        // Remove active class from everyone first
        link.classList.remove('active');

        // Add active class if the href matches the current path
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        }
    });
};