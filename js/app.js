/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
const navItems = document.getElementById("navbar_list");
const sections = document.querySelectorAll("section");
const mobileScreenSize = 768;
/**
 * End Global Variables
 * Start Helper Functions
 *
 */
function createNavItem(section) {
	const listItem = document.createElement("li");
	const link = document.createElement("a");

	const sectionName = section.getAttribute("data-nav");
	const sectionId = section.id;

	link.href = "#" + sectionId;
	link.className = "menu__link";
	link.textContent = sectionName;
	link.style.padding = "1rem";

	listItem.appendChild(link);

	return {
		listItem: listItem,
		link: link,
	};
}

function isInViewport(section) {
	const rect = section.getBoundingClientRect();
	const viewportHeight = window.innerHeight;

	let activeArea;
	if (window.innerWidth <= mobileScreeSize) {
		activeArea = viewportHeight / 4;
	} else {
		activeArea = viewportHeight / 3;
	}
	return rect.top >= -activeArea && rect.top <= activeArea;
}

function isMobileDevice() {
	return window.innerWidth <= mobileScreenSize;
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */
// build the nav
function buildNav() {
	sections.forEach(function (section) {
		const navElements = createNaveItem(section);

		if (isMobileDevice()) {
			navElements.link.style.display = "block";
			navElements.link.style.width = "100%";
		}

		navItems.appendChild(navElements.listItem);
	});
}

// Add class 'active' to section when near top of viewport
function setActiveSection() {
	sections.forEach(function (section) {
		if (isInViewport(section)) {
			sections.forEach(function (allSections) {
				allSections.classList.remove("active-area");
			});

			section.classList.add("active-area");

			const currentLink = document.querySelector('a[href="#' + section.id + '"]');
			if (currentLink) {
				currentLink.classList.add("active");
			}
		}
	});
}

// Scroll to anchor ID using scrollTO event
function scrollToSection(event) {
	event.preventDefault();

	const targetId = event.target.getAttribute("href").slice(1);
	const targetSection = document.getElementById(targetId);

	if (isMobileDevice()) {
		setTimeout(function () {
			targetSection.scrollIntoView({ behaviour: "smooth" });
		}, 100);
	} else {
		targetSection.scrollIntoView({ behavior: "smooth" });
	}
}
/**
 * End Main Functions
 * Begin Events
 *
 */
// Build menu
buildNav();

// Scroll to section on link click
document.querySelectorAll(".menu__link").forEach(function (link) {
	link.addEventListener("click", scrollToSection);
	link.addEventListener("touchend", function (event) {
		scrollToSection(event);
	});
});

// Set sections as active
window.addEventListener("scroll", setActiveSection);
window.addEventListener("resize", function () {
	setActiveSection();

	if (navItems.replaceChildren.length === 0) {
		buildNav();
	}
});
