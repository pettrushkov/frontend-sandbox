"use strict";

document.addEventListener("DOMContentLoaded", () => {
  colorTheme();
});

const colorTheme = () => {
  // html
  const htmlBlock = document.documentElement;

  // get current theme
  const saveUserTheme = localStorage.getItem("user-theme");

  // system settings
  let userTheme;
  if (window.matchMedia) {
    userTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      !saveUserTheme ? changeTheme() : null;
    });

  // click change theme
  const themeButton = document.querySelector(".page__theme");
  const resetButton = document.querySelector(".page__reset");
  if (themeButton) {
    themeButton.addEventListener("click", () => {
      resetButton.classList.add("active");
      changeTheme(true);
    });
  }
  if (resetButton) {
    resetButton.addEventListener("click", () => {
      resetButton.classList.remove("active");
      localStorage.setItem("user-theme", "");
    });
  }

  const setThemeClass = () => {
    if (saveUserTheme) {
      htmlBlock.classList.add(saveUserTheme);
      resetButton.classList.add("active");
    } else {
      htmlBlock.classList.add(userTheme);
    }
  };
  // add theme class on load
  setThemeClass();

  const changeTheme = (saveTheme = false) => {
    let currentTheme = htmlBlock.classList.contains("light") ? "light" : "dark";
    let newTheme;

    if (currentTheme === "light") {
      newTheme = "dark";
    } else if (currentTheme === "dark") {
      newTheme = "light";
    }
    htmlBlock.classList.remove(currentTheme);
    htmlBlock.classList.add(newTheme);
    saveTheme ? localStorage.setItem("user-theme", newTheme) : null;
		console.log('theme changed');
  };
};
