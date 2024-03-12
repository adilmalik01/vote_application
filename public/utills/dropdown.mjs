let showDropDown = document.querySelector(".menu button")
let dropDown = document.querySelector(".dropdown")
showDropDown.addEventListener("click", (e) => {
  dropDown.classList.toggle("show")
})