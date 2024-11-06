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
const navItems = document.getElementById("navbar__list");
const sections = document.querySelectorAll("section");
const mobileScreenSize = 768;	//defines screen size for mobile
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
	link.className = "menu__link"; //css class to style links
	link.textContent = sectionName; 
	link.style.padding = "1rem";

	listItem.appendChild(link);

	return {
		listItem: listItem,
		link: link,
	};
}

//checks if a section is visible in the viewport
function isInViewport(section) {
	const rect = section.getBoundingClientRect();	//gets the size and position of section relative to viewport
	const viewportHeight = window.innerHeight;

	//determines how much of the section needs to be visible
	let activeArea;	
	if (window.innerWidth <= mobileScreenSize) {
		activeArea = viewportHeight / 4;
	} else {
		activeArea = viewportHeight / 3;
	}
	return rect.top >= -activeArea && rect.top <= activeArea;	//returns true if section is in active viewing area
}

//checks if a device is mobile based on screen width
function isMobileDevice() {
	return window.innerWidth <= mobileScreenSize;
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */
// build the nav
//builds navigation menu for the sections
function buildNav() {
	sections.forEach(function (section) {
		const navElements = createNavItem(section);	//creates navigation item for current section

		if (isMobileDevice()) {
			navElements.link.style.display = "block";
			navElements.link.style.width = "100%";
		}

		navItems.appendChild(navElements.listItem);	//adds the new nav item to the menu
	});
}

// Add class 'active' to section when near top of viewport

//highlights the active-section and the link that corresponds
function setActiveSection() {
	sections.forEach(function (section) {
		if (isInViewport(section)) {
			sections.forEach(function (allSections) {
				allSections.classList.remove("active-area");
			});

			section.classList.add("active-area");	//adds 'active-area' class to the current section
						
			const currentLink = document.querySelector('a[href="#' + section.id + '"]');	//finds nav link that corresponds to the section
			if (currentLink) {
				currentLink.classList.add("active");
			}
		}
	});
}

// Scroll to anchor ID using scrollTO event

//function for smooth scrolling
function scrollToSection(event) {	
	event.preventDefault();	//prevents default anchor click behavior

	const targetId = event.target.getAttribute("href").slice(1);	//gets target section's ID from clicked link
	const targetSection = document.getElementById(targetId);	//finds target section
	
	//controls smooth scrolling for mobile devices
	if (isMobileDevice()) {
		setTimeout(function () {
			targetSection.scrollIntoView({ behavior: "smooth" });
		}, 100);
	} else {
		targetSection.scrollIntoView({ behavior: "smooth" });	//smooth scroll for desktop
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

//adds event listeners to navigation menu links
document.querySelectorAll(".menu__link").forEach(function (link) {
	link.addEventListener("click", scrollToSection);	//adds click event for desktop mouse interacion
	link.addEventListener("touchend", function (event) {	//adds touchend event for mobile touch devices
		scrollToSection(event);
	});
});

// Set sections as active
window.addEventListener("scroll", setActiveSection);	//monitors scrolling to update active-section higlighting
window.addEventListener("resize", function () {	//handles window resizing events
	setActiveSection();

	if (navItems.children.length === 0) {	//checks if nav item exists
		buildNav();
	}
});
