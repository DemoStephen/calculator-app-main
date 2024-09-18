const bodyTag = document.querySelector("body");
const themes = document.querySelectorAll("[data-themes]");
for (const theme of themes) {
  theme.addEventListener("change", (event) => {
    let newTheme = theme.dataset.themes;
    bodyTag.setAttribute("class", "d-flex");
    bodyTag.classList.add(`${newTheme}`);
  });
}
