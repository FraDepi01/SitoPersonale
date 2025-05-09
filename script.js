// ...existing code...

document.addEventListener("DOMContentLoaded", () => {
    const burgerMenu = document.querySelector(".burger-menu");
    const menuLinks = document.querySelector(".menu-links");

    burgerMenu.addEventListener("click", () => {
        burgerMenu.classList.toggle("active"); // Animate the burger menu
        menuLinks.classList.toggle("active"); // Show or hide the menu
    });

    const dynamicText = document.querySelector('.dynamic-text');
    const roles = ["Graphic Designer", "Illustratore", "Brand Designer", "Modellatore 3D", "Montatore video"];
    let index = 0;

    function changeText() {
        dynamicText.textContent = roles[index];
        index = (index + 1) % roles.length; // Loop through roles
    }

    setInterval(changeText, 1750); // Change text every 2 seconds
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});