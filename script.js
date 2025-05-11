document.addEventListener("DOMContentLoaded", () => {
    const burgerMenu = document.querySelector(".burger-menu");
    const menuLinks = document.querySelector(".menu-links");

    burgerMenu.addEventListener("click", () => {
        burgerMenu.classList.toggle("active"); // Animate the burger menu
        menuLinks.classList.toggle("active"); // Show or hide the menu
    });

    // Effetto scrittura/cancellazione per il testo dinamico
    const dynamicText = document.querySelector('.dynamic-text');
    const roles = [
        "Graphic Designer",
        "Illustratore",
        "Brand Designer",
        "Modellatore 3D",
        "Montatore video"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;
    let pauseAfterWord = 1200;

    function setDynamicTextWidth(text) {
        if (!dynamicText) return;
        // Crea uno span invisibile per calcolare la larghezza del testo
        const tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.position = 'absolute';
        tempSpan.style.whiteSpace = 'pre';
        tempSpan.style.fontFamily = window.getComputedStyle(dynamicText).fontFamily;
        tempSpan.style.fontSize = window.getComputedStyle(dynamicText).fontSize;
        tempSpan.style.fontWeight = window.getComputedStyle(dynamicText).fontWeight;
        // Se il testo è vuoto, usa un carattere fittizio per la larghezza
        tempSpan.textContent = text || 'A';
        document.body.appendChild(tempSpan);
        const width = tempSpan.offsetWidth;
        document.body.removeChild(tempSpan);

        const minWidth = 30; // px, puoi regolare la dimensione minima
        dynamicText.style.width = Math.max(width + 30, minWidth) + 'px';
        dynamicText.style.paddingLeft = '24px';
        dynamicText.style.paddingRight = '24px';
    }

    function typeEffect() {
        const currentWord = roles[wordIndex];
        if (isDeleting) {
            const newText = currentWord.substring(0, charIndex--);
            dynamicText.textContent = newText;
            setDynamicTextWidth(newText);
            if (charIndex < 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % roles.length;
                setTimeout(typeEffect, 400);
            } else {
                setTimeout(typeEffect, typingSpeed / 2);
            }
        } else {
            const newText = currentWord.substring(0, charIndex++);
            dynamicText.textContent = newText;
            setDynamicTextWidth(newText);
            if (charIndex > currentWord.length) {
                isDeleting = true;
                setTimeout(typeEffect, pauseAfterWord);
            } else {
                setTimeout(typeEffect, typingSpeed);
            }
        }
    }

    if (dynamicText) {
        setDynamicTextWidth('');
        typeEffect();
    }

    // Portfolio carousel arrows
    const carousel = document.querySelector('.portfolio-carousel');
    const leftArrow = document.querySelector('.portfolio-arrow.left');
    const rightArrow = document.querySelector('.portfolio-arrow.right');

    if (carousel && leftArrow && rightArrow) {
        leftArrow.addEventListener('click', () => {
            carousel.scrollBy({ left: -140, behavior: 'smooth' });
        });
        rightArrow.addEventListener('click', () => {
            carousel.scrollBy({ left: 140, behavior: 'smooth' });
        });
    }

    // Portfolio popup
    const modal = document.getElementById('portfolio-modal');
    const modalImg = document.getElementById('portfolio-modal-img');
    const modalDesc = document.getElementById('portfolio-modal-desc');
    const modalClose = document.querySelector('.portfolio-modal-close');
    const modalFullscreen = document.querySelector('.portfolio-modal-fullscreen');
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', function () {
            const img = this.querySelector('img');
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            modalDesc.textContent = this.getAttribute('data-description') || '';
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    // Chiudi popup cliccando fuori dal contenuto
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Fullscreen button
   

    // Fullscreen button: mostra l'immagine in una finestra popup integrata con pulsante di chiusura
    if (modalFullscreen && modalImg) {
        modalFullscreen.addEventListener('click', () => {
            // Se esiste già una popup, non crearne un'altra
            if (document.getElementById('fullscreen-img-popup')) return;

            // Crea overlay
            const overlay = document.createElement('div');
            overlay.id = 'fullscreen-img-popup';
            overlay.style.position = 'fixed';
            overlay.style.top = 0;
            overlay.style.left = 0;
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.background = 'rgba(0,0,0,0.97)';
            overlay.style.display = 'flex';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            overlay.style.zIndex = 9999;

            // Crea immagine
            const img = document.createElement('img');
            img.src = modalImg.src;
            img.alt = modalImg.alt;
            img.style.maxWidth = '96vw';
            img.style.maxHeight = '96vh';
            img.style.borderRadius = '18px';
            img.style.boxShadow = '0 4px 24px rgba(0,0,0,0.5)';
            img.style.background = '#111';

            // Crea pulsante chiusura
            const closeBtn = document.createElement('button');
            closeBtn.textContent = '×';
            closeBtn.setAttribute('aria-label', 'Chiudi immagine a tutto schermo');
            closeBtn.style.position = 'fixed';
            closeBtn.style.top = '32px';
            closeBtn.style.right = '48px';
            closeBtn.style.fontSize = '2.5rem';
            closeBtn.style.background = 'rgba(0,0,0,0.35)';
            closeBtn.style.color = '#fff';
            closeBtn.style.border = 'none';
            closeBtn.style.borderRadius = '50%';
            closeBtn.style.width = '54px';
            closeBtn.style.height = '54px';
            closeBtn.style.cursor = 'pointer';
            closeBtn.style.zIndex = 10001;
            closeBtn.style.transition = 'background 0.2s';
            closeBtn.onmouseenter = () => closeBtn.style.background = '#FFD600';
            closeBtn.onmouseleave = () => closeBtn.style.background = 'rgba(0,0,0,0.35)';
            closeBtn.onclick = () => document.body.removeChild(overlay);

            // Chiudi anche cliccando sull'overlay (ma non sull'immagine)
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    document.body.removeChild(overlay);
                }
            });

            overlay.appendChild(img);
            overlay.appendChild(closeBtn);
            document.body.appendChild(overlay);
        });
    }
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