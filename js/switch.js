var savedTheme = localStorage.getItem("dark-mode-storage") || "light",
  toggle1 = document.getElementById("dark-mode-toggle-1"),
  toggle2 = document.getElementById("dark-mode-toggle-2"),
  icon_toggle1 = document.getElementById("dark-mode-toggle-icon1"),
  icon_toggle2 = document.getElementById("dark-mode-toggle-icon2"),
  darkTheme = document.getElementById("dark-mode-theme");
const userPrefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  userPrefersLight =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches;
function setTheme(e) {
  "dark" === e
    ? ((darkTheme.disabled = !1),
      (icon_toggle1.className =
        "icon-sun inline-flex align-middle leading-normal text-lg mr-2"),
      (icon_toggle2.className =
        "icon-sun inline-flex align-middle leading-normal text-lg ml-2"),
      localStorage.setItem("dark-mode-storage", e))
    : "light" === e &&
      ((darkTheme.disabled = !0),
      (icon_toggle1.className =
        "icon-moon inline-flex align-middle leading-normal text-lg mr-2"),
      (icon_toggle2.className =
        "icon-moon inline-flex align-middle leading-normal text-lg ml-2"),
      localStorage.setItem("dark-mode-storage", e));
}
userPrefersDark && setTheme("dark"),
  "dark" == savedTheme && setTheme(savedTheme),
  "light" == savedTheme && setTheme(savedTheme),
  toggle1.addEventListener("click", () => {
    "icon-moon inline-flex align-middle leading-normal text-lg mr-2" ===
    icon_toggle1.className
      ? setTheme("dark")
      : "icon-sun inline-flex align-middle leading-normal text-lg mr-2" ===
          icon_toggle1.className && setTheme("light");
  }),
  toggle2.addEventListener("click", () => {
    "icon-moon inline-flex align-middle leading-normal text-lg ml-2" ===
    icon_toggle2.className
      ? setTheme("dark")
      : "icon-sun inline-flex align-middle leading-normal text-lg ml-2" ===
          icon_toggle2.className && setTheme("light");
  });
