export function setTheme(themeName: string) {
  localStorage.setItem("theme", themeName);
  document.documentElement.className = themeName;
}

export function keepTheme() {
  if (localStorage.getItem("theme")) {
    if (localStorage.getItem("theme") === "dark") {
      setTheme("dark");
    } else if (localStorage.getItem("theme") === "") {
      setTheme("");
    }
  }
}
