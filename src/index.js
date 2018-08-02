// html
const resume = require("./resume.html");
// scss
require("./styles/index.scss");
// js
import "../node_modules/fullpage.js/vendors/scrolloverflow";
import fullpage from "fullpage.js";
import "../node_modules/jquery-expander/jquery.expander";

function rebuildFpSection(fp) {
  return () => fp.reBuild();
}

$(document.body).append(resume);

$(() => {
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
    verticalCentered: true
  });

  $(".text-justify").expander({
    afterExpand: rebuildFpSection(fp),
    afterCollapse: rebuildFpSection(fp)
  });
});
