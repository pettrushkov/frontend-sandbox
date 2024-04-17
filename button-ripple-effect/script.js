document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  buttonEffect();
});

const buttonEffect = () => {
  document.addEventListener("click", (e) => {
    const targetItem = e.target;
    if (targetItem.closest("[data-ripple]")) {
      const button = targetItem.closest("[data-ripple]");
      const ripple = document.createElement("span");
      // calc sizes of ripple circle
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;

      // position for ripple circle
      ripple.style.width = ripple.style.height = `${diameter}px`;
      ripple.style.left = `${
        e.pageX - (button.getBoundingClientRect().left + scrollX) - radius
      }px`;
      ripple.style.top = `${
        e.pageY - (button.getBoundingClientRect().top + scrollY) - radius
      }px`;
      ripple.classList.add("ripple");

      // remove contain ripple circle if clicked twice or more (optional)
      button.dataset.ripple === "once" && button.querySelector(".ripple")
        ? button.querySelector(".ripple").remove()
        : null;

      // add ripple circle to button
      button.appendChild(ripple);

      const timeOut = getAnimationDuration(ripple);

      setTimeout(() => {
        ripple ? ripple.remove() : null;
      }, timeOut);
    }
  });
};



const getAnimationDuration = (el) => {
	const aDuration = window.getComputedStyle(el).animationDuration;
	return aDuration.includes("ms")
		? aDuration.replace("ms", "")
		: aDuration.replace("s", "") * 1000;
};