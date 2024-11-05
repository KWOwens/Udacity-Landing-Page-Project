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
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active
