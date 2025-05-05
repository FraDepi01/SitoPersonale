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
    const imagePopup = document.getElementById('image-popup');
    const popupImage = document.getElementById('popup-image');

    const openPopup = (type, contentPath, title) => {
        popupTitle.textContent = title;
        if (type === 'pdf') {
            popupIframe.src = contentPath;
            popup.classList.add('visible');
        } else if (type === 'image') {
            popupImage.src = contentPath;
            imagePopup.style.display = 'flex';
        }
    };

    const closePopup = (type) => {
        if (type === 'pdf') {
            popup.classList.remove('visible');
            popupIframe.src = ''; // Clear the iframe source
        } else if (type === 'image') {
            imagePopup.style.display = 'none';
            popupImage.src = ''; // Clear the image source
        }
    };

    if (pdfLinks && popup && popupIframe && popupTitle && closePopupButton) {
        pdfLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const pdfUrl = link.getAttribute('href');
                const title = link.getAttribute('data-title');
                openPopup('pdf', pdfUrl, title);
            });
        });

        closePopupButton.addEventListener('click', () => closePopup('pdf'));

        popup.addEventListener('click', (event) => {
            if (event.target === popup) closePopup('pdf');
        });
    }

    window.openPdfPopup = (filePath, title) => openPopup('pdf', filePath, title);
    window.closePdfPopup = () => closePopup('pdf');
    window.openImagePopup = (imagePath, title) => openPopup('image', imagePath, title);
    window.closeImagePopup = () => closePopup('image');
});