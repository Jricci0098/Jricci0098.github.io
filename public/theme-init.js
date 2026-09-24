// Runs before first paint to avoid a flash of the wrong theme.
(function () {
  var stored = localStorage.getItem("theme");
  var prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  var theme = stored || (prefersLight ? "light" : "dark");
  document.documentElement.classList.toggle("dark", theme === "dark");
})();
