// html
const resume = require("./resume.html");
// scss
require("./styles/index.scss");

function matches(el, selector) {
  return (
    el.matches ||
    el.matchesSelector ||
    el.msMatchesSelector ||
    el.mozMatchesSelector ||
    el.webkitMatchesSelector ||
    el.oMatchesSelector
  ).call(el, selector);
}

function contains(nodeList, element) {
  for (entry in nodeList.entries) {
    debugger;
    if (entry === element) {
      return true;
    }
  }
  return false;
}

function toggleReadSection(element) {
  if (element.getAttribute("data-more") === "0") {
    readMore(element);
  } else {
    readLess(element);
  }
}

function readMore(element) {
  element.parentElement.querySelectorAll(".long-text")[0].style.display =
    "inline";
  element.parentElement.querySelectorAll(".text-dots")[0].style.display =
    "none";
  element.setAttribute("data-more", 1);
  element.innerHTML = "Read Less";
}

function readLess(element) {
  element.parentElement.querySelectorAll(".long-text")[0].style.display =
    "none";
  element.parentElement.querySelectorAll(".text-dots")[0].style.display =
    "inline";
  element.setAttribute("data-more", 0);
  element.innerHTML = "Read More";
}

function setupNavigation() {
  const navbar = document.querySelector("#navbar");
  document.querySelectorAll("#navbar a[data-nav-section]").forEach(el => {
    el.addEventListener("click", event => {
      event.preventDefault();
      const section = el.getAttribute("data-nav-section");
      const targetEl = document.querySelector(`[data-section=${section}]`);
      if (!!targetEl) {
        targetEl.scrollIntoView({
          block: 'start',
          behavior: 'smooth'
        });
      }

      if (matches(navbar, ":not([hidden])")) {
        navbar.classList.remove("in");
        const ariaExpanded = document.createAttribute("aria-expanded");
        ariaExpanded.value = false;
        navbar.attributes.setNamedItem(ariaExpanded);
        document
          .querySelector(".js-colorlib-nav-toggle")
          .classList.remove("active");
      }

      return false;
    });
  });
}

function setupHamburgerMenu() {
  const hamburger = document.querySelector(".js-colorlib-nav-toggle");
  hamburger.addEventListener("click", event => {
    event.preventDefault();

    if (document.body.classList.contains("offcanvas")) {
      hamburger.classList.remove("active");
      document.body.classList.remove("offcanvas");
    } else {
      hamburger.classList.add("active");
      document.body.classList.add("offcanvas");
    }
  });
}

function setupSidebarMobileSupport() {
  document.addEventListener("click", e => {
    const container = document.querySelectorAll(
      "#colorlib-aside, .js-colorlib-nav-toggle"
    );
    if (
      container !== e.target &&
      contains(container, e.target) &&
      document.body.classList.contains("offcanvas")
    ) {
      document.body.classList.remove("offcanvas");
      document
        .querySelector(".js-colorlib-nav-toggle")
        .classList.remove("active");
    }
  });

  window.onscroll = () => {
    if (document.body.classList.contains("offcanvas")) {
      document.body.classList.remove("offcanvas");
      document
        .querySelector(".js-colorlib-nav-toggle")
        .classList.remove("active");
    }
  };
}

document.body.innerHTML = resume;

document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(".show-more-button")
    .forEach(el => el.addEventListener("click", () => toggleReadSection(el)));
  setupHamburgerMenu();
  setupNavigation();
  setupSidebarMobileSupport();
});
