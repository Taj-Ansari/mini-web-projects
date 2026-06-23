const body = document.querySelector("body");
const colors = document.querySelectorAll(".color-btn");

colors.forEach((item, idx, nodelist) => {
  item.style.backgroundColor = item.getAttribute("id");
  item.addEventListener("click", (event) => {
    body.style.backgroundColor = event.target.getAttribute("id");
  });
});
