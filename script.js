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