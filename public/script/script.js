var navIcons = document.querySelectorAll(".nav-icon");
var mobileMenu = document.querySelector(".m-menu-container");

navIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        mobileMenu.classList.toggle("m-menu-show");
    });
});

