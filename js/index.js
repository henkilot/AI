const burgerButtonActiveToggle = () => {
    let burgerButton = document.querySelector(".hamburger");
    let dropdownMenu = document.querySelector(".dropdown-menu");
    burgerButton.classList.toggle("is-active");
    dropdownMenu.classList.toggle("active");
}