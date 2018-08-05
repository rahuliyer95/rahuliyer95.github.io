// html
const resume = require("./resume.html");
// scss
require("./styles/index.scss");
// js
import "../node_modules/fullpage.js/vendors/scrolloverflow";
import fullpage from "fullpage.js";

function rebuildFpSection(element, fp) {
  if (element.getAttribute("data-more") === "0") {
    readMore(element);
  } else {
    readLess(element);
  }
  fp.reBuild();
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

function stylizeSideNav(destination) {
  const color = destination === 0 ? "#fff" : "#000";
  document.querySelectorAll("#fp-nav > ul > li").forEach((e, i) => {
    e.querySelectorAll("a > span")[0].style["background-color"] = color;
    const tooltip = e.querySelectorAll(".fp-tooltip")[0];
    tooltip.style.color = color;
    tooltip.style.width = "auto";
    if (i === destination) {
      tooltip.style.opacity = 1;
      setTimeout(() => {
        tooltip.classList.add("fadeout");
        setTimeout(() => {
          tooltip.classList.remove("fadeout");
          tooltip.style.opacity = "";
          tooltip.style.width = "";
        }, 500);
      }, 1500);
    } else {
      tooltip.style.width = "";
      tooltip.style.opacity = "";
    }
  });
}

document.body.innerHTML = resume;

document.addEventListener("DOMContentLoaded", () => {
  const fp = new fullpage("#fullpage", {
    licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
    anchors: ["home", "resume", "works"],
    autoScrolling: true,
    navigation: true,
    navigationPosition: "right",
    navigationTooltips: ["Home", "Resume", "Works"],
    scrollingSpeed: 750,
    scrollOverflow: true,
    scrollOverflowOptions: {
      scrollbars: false
    },
    verticalCentered: true,
    afterRender: () => stylizeSideNav(0),
    onLeave: (_, dest) => stylizeSideNav(dest.index)
  });

  document
    .querySelectorAll(".show-more-button")
    .forEach(elem =>
      elem.addEventListener("click", () => rebuildFpSection(elem, fp))
    );
});
