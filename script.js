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

<script>
    function openPopup(imageSrc) {
        const popup = document.getElementById('popup');
        const popupImg = document.getElementById('popup-img');
        popupImg.src = imageSrc; // Set the image source
        popup.style.display = 'flex'; // Show the popup
    }

    function closePopup() {
        const popup = document.getElementById('popup');
        popup.style.display = 'none'; // Hide the popup
    }
</script>