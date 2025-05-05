document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.portfolio-gallery');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    leftArrow.addEventListener('click', () => {
        gallery.scrollBy({ left: -200, behavior: 'smooth' }); // Scroll left
    });

    rightArrow.addEventListener('click', () => {
        gallery.scrollBy({ left: 200, behavior: 'smooth' }); // Scroll right
    });

    // Gestione popup
    const popup = document.getElementById('popup');
    const popupImg = document.getElementById('popup-img');

    window.openPopup = (src) => {
        popupImg.src = src;
        popup.style.display = 'block';
    };

    window.closePopup = () => {
        popup.style.display = 'none';
        popupImg.src = '';
    };
});