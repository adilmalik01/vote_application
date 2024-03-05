let showDropDown = document.querySelector(".menu button")
let dropDown = document.querySelector(".dropdown")
showDropDown.addEventListener("click", (e) => {
  console.log(dropDown);
  dropDown.classList.toggle("show")
})