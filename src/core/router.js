import { LoanCalculator } from "../pages/calculator/LoanCalculator.js";
import { Home } from "../pages/home/Home.js";
import { Extras } from "../pages/extras/Extras.js";

const routes = {
	"/": { title: "Home", component: Home },
	"/loan-calculator": { title: "Loan Calculator", component: LoanCalculator },
	"/extras": { title: "Extras", component: Extras },

	404: { title: "404", render: () => "<h1>Page Not Found</h1>" },
};

let activeComponentInstance = null;

const getPathFromHash = () => {
	const hash = window.location.hash.slice(1);
	return hash ? hash : "/";
};

const renderPage = () => {
	const path = getPathFromHash();
	const route = routes[path] || routes["404"];
	document.title = route.title;

	const appRoot = document.getElementById("app-root");

	if (activeComponentInstance) {
		activeComponentInstance.destroy();
		activeComponentInstance = null;
	}

	appRoot.innerHTML = "";

	if (route.component) {
		activeComponentInstance = new route.component(appRoot);
		activeComponentInstance.updateDOM();
	} else if (route.render) {
		appRoot.innerHTML = route.render();
		if (route.init) {
			route.init();
		}
	}

	updateActiveNavbarLink(path);
};

export const navigateTo = (url) => {
	window.location.hash = url;
};

const updateActiveNavbarLink = (currentPath) => {
	const navLinks = document.querySelectorAll("a[data-link]");

	navLinks.forEach((link) => {
		link.classList.remove("active");

		const href = link.getAttribute("href");
		const linkPath = href.startsWith("#") ? href.slice(1) : href;

		if (linkPath === currentPath) {
			link.classList.add("active");
		}
	});
};

export const initRouter = () => {
	window.addEventListener("hashchange", renderPage);
	renderPage();
};
