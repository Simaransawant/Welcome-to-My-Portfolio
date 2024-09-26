document.addEventListener('DOMContentLoaded', () => {
    const phrases = [
        "Simaran",
        "Developer",
        "Designer"
    ];
    const dynamicText = document.getElementById('dynamic-text');
    const staticText = document.getElementById('static-text').innerHTML;
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            dynamicText.innerHTML = currentPhrase.substring(0, charIndex--);
            if (charIndex < 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, 500); // Pause before typing new phrase
            } else {
                setTimeout(type, 100); // Adjust typing speed here (in milliseconds)
            }
        } else {
            dynamicText.innerHTML = currentPhrase.substring(0, charIndex++);
            if (charIndex > currentPhrase.length) {
                isDeleting = true;
                setTimeout(type, 1500); // Pause before deleting
            } else {
                setTimeout(type, 100); // Adjust typing speed here (in milliseconds)
            }
        }
    }

    type();
});
window.addEventListener('load', function() {
    window.scrollTo(0, 0);
});
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.hash) {
        window.location.hash = "";
    }
});

document.addEventListener('scroll', function() {
    const educationItems = document.querySelectorAll('.education-item');
    const educationSection = document.getElementById('Education');
    const sectionPosition = educationSection.getBoundingClientRect();
    
    if (sectionPosition.top < window.innerHeight && sectionPosition.bottom >= 0) {
        educationItems.forEach((item, index) => {
            // Adjusting the delay to 0.4 seconds for a slower staggered effect
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 400); // Increased delay for slower effect
        });
    } else {
        educationItems.forEach((item) => {
            item.classList.remove('visible');
        });
    }
});

var form = document.getElementById('sheetdb-form');

form.addEventListener("submit", function (e) {
    e.preventDefault();  // Prevent default form submission

    fetch(form.action, {
        method: "POST",
        body: new FormData(form),  // Send form data
    })
    .then(response => response.json())  // Convert response to JSON
    .then((data) => {
        if (data && data.created) {
            showPopup('success-popup');  // Show success popup
            form.reset();  // Optionally reset the form after success
        } else {
            showPopup('error-popup');  // Show error popup
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        showPopup('general-error-popup');  // Show general error popup
    });
});

// Function to show popup
function showPopup(popupId) {
    var popup = document.getElementById(popupId);
    popup.style.display = 'block';

    // Close popup manually when clicking the close button
    var closeBtn = popup.querySelector('.close-btn');
    closeBtn.addEventListener('click', function () {
        hidePopup(popupId);
    });

    // Automatically close popup after 3 seconds
    setTimeout(function () {
        hidePopup(popupId);
    }, 3000);
}

// Function to hide popup
function hidePopup(popupId) {
    var popup = document.getElementById(popupId);
    popup.style.display = 'none';
}
