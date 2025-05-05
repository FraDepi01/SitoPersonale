document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.portfolio-gallery');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    if (leftArrow && rightArrow && gallery) {
        leftArrow.addEventListener('click', () => {
            gallery.scrollBy({ left: -200, behavior: 'smooth' }); // Scroll left
        });

        rightArrow.addEventListener('click', () => {
            gallery.scrollBy({ left: 200, behavior: 'smooth' }); // Scroll right
        });
    }

    const pdfLinks = document.querySelectorAll('.pdf-link');
    const popup = document.getElementById('pdf-popup');
    const popupIframe = document.getElementById('popup-iframe');
    const popupTitle = document.getElementById('popup-title');
    const closePopupButton = document.querySelector('.close-popup');

    if (pdfLinks && popup && popupIframe && popupTitle && closePopupButton) {
        pdfLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const pdfUrl = link.getAttribute('href');
                const title = link.getAttribute('data-title');
                popupIframe.src = pdfUrl;
                popupTitle.textContent = title;
                popup.classList.add('visible');
            });
        });

        closePopupButton.addEventListener('click', () => {
            popup.classList.remove('visible');
            popupIframe.src = ''; // Clear the iframe source
        });

        popup.addEventListener('click', (event) => {
            if (event.target === popup) {
                popup.classList.remove('visible');
                popupIframe.src = ''; // Clear the iframe source
            }
        });
    }
});