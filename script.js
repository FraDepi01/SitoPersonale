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
    window.openImagePopup = (imagePath, title, description) => {
        popupTitle.textContent = title;
        popupImage.src = imagePath;
        document.getElementById('popup-description').textContent = description; // Add description
        imagePopup.style.display = 'flex'; // Show the popup
    };
    window.closeImagePopup = () => closePopup('image');

    const carouselTrack = document.querySelector('.carousel-track');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const itemWidth = carouselItems[0].offsetWidth + 10; // Include gap between items
    let currentScrollPosition = 0;

    window.scrollCarousel = (direction) => {
        const maxScroll = carouselTrack.scrollWidth - carouselTrack.offsetWidth;

        // Calculate the new scroll position
        currentScrollPosition += direction * itemWidth;
        currentScrollPosition = Math.max(0, Math.min(currentScrollPosition, maxScroll));

        // Scroll the carousel
        carouselTrack.scrollTo({ left: currentScrollPosition, behavior: 'smooth' });
    };

    const projects = [
        { image: 'bottle FINALE edited.png', title: 'Packaging Salsa', description: 'Un design unico per il packaging di una salsa piccante.' },
        { image: 'De_Pinto_Francesco_CartaCreativa.png', title: 'Poster CR7', description: 'Poster creativo dedicato a Cristiano Ronaldo.' },
        { image: 'Screenshot 2025-03-31 104216.png', title: 'Rebrand ALSP', description: 'Rebranding completo per il marchio ALSP.' },
        { image: 'Packaging Brexidol.jpg', title: 'Riprogettazione del packaging "Brexidol"', description: 'Descrizione fittizia per il progetto 4.' },
        { image: 'Infografica Pogba.jpg', title: 'Poster Pogba 12/16', description: 'Descrizione fittizia per il progetto 5.' }
    ];

    let currentProjectIndex = 0;

    window.openProjectPopup = (index) => {
        const project = projects[index];
        currentProjectIndex = index;

        const popup = document.getElementById('project-popup');
        popup.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
        `;

        popup.style.display = 'flex'; // Ensure the popup is displayed
        setTimeout(() => {
            popup.classList.add('visible');
        }, 10); // Add a slight delay for the transition effect
    };

    window.closeProjectPopup = () => {
        const popup = document.getElementById('project-popup');
        popup.classList.remove('visible');
        setTimeout(() => {
            popup.style.display = 'none'; // Hide the popup after the transition
        }, 300); // Match the CSS transition duration
    };

    const navButtons = document.querySelectorAll('.nav-buttons a');

    navButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = button.getAttribute('href').substring(1); // Get the target section ID
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the section
            }
        });
    });
});