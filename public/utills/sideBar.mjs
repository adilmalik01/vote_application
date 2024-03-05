let sideBarOpen = document.querySelector(".sideBarOpen")
let sideBar = document.querySelector(".left")

sideBarOpen.addEventListener("click", (e) => {
  console.log(sideBar);
  sideBar.classList.toggle("toggle")
})