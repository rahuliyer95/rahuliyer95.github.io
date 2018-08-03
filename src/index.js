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

function stylizeSideNav(destination) {
  const color = destination === 0 ? "#fff" : "#000";
  $("#fp-nav > ul > li").each((i, e) => {
    $(e)
      .find("a > span")
      .css("background-color", color);
    $(e)
      .find(".fp-tooltip")
      .css({ color: color, width: "auto" });
    if (i === destination) {
      $(e)
        .find(".fp-tooltip")
        .animate({ opacity: 1 }, 350, "swing", () =>
          setTimeout(
            () =>
              $(e)
                .find(".fp-tooltip")
                .animate({ opacity: 0 }, 350),
            750
          )
        );
    } else {
      $(e)
        .find(".fp-tooltip")
        .css({ width: "", opacity: "" });
    }
  });
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
    verticalCentered: true,
    afterRender: () => stylizeSideNav(0),
    onLeave: (_, dest) => stylizeSideNav(dest.index)
  });

  $(".text-justify").expander({
    afterExpand: rebuildFpSection(fp),
    afterCollapse: rebuildFpSection(fp)
  });
});
