document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  linkEffect();
});

const linkEffect = () => {
  const links = document.querySelectorAll("[data-line-effect]");

  if (!links.length) return;

  links.forEach((link) => {
    // init animation duration
    const animSpeed = link.getAttribute("data-line-effect")
      ? link.getAttribute("data-line-effect")
      : 200;

    // styles for hover elements
    const transition = `transition: transform ${animSpeed}ms ease;`,
      effectHover = `transform: translate3d(0px, 0%, 0px);`,
      top = `transform: translate3d(0px, -100%, 0px);`,
      bottom = `transform: translate3d(0px, 100%, 0px);`;

    // insert hover elements to each link
    link.insertAdjacentHTML(
      "beforeend",
      `
			<span style="transform: translate3d(0px,100%,0px);" class="hover">
				<span style="transform: translate3d(0px,-100%,0px);" class="hover__text">${link.textContent}</span>
			</span>
		`
    );

    // enter and leave cursor listeners
    link.onmouseenter = link.onmouseleave = (e) => {
      const menuLink = e.target,
        hover = link.querySelector(".hover"),
        hoverText = link.querySelector(".hover__text");

      // get half of link's height
      const linkHeight = link.offsetHeight / 2;

      // get cursor position
      const linkPos =
        e.pageY - (menuLink.getBoundingClientRect().top + scrollY);

      if (e.type === "mouseenter") {
        hover.style.cssText = linkPos > linkHeight ? bottom : top;
        hoverText.style.cssText = linkPos > linkHeight ? top : bottom;

        setTimeout(() => {
          hover.style.cssText = effectHover + transition;
          hoverText.style.cssText = effectHover + transition;
        }, 5);
      }

      if (e.type === "mouseleave") {
        hover.style.cssText =
          linkPos > linkHeight ? bottom + transition : top + transition;
        hoverText.style.cssText =
          linkPos > linkHeight ? top + transition : bottom + transition;
      }
    };
  });
};
