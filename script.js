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
});
