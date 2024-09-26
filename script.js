document.addEventListener("DOMContentLoaded", () => {
  const phrases = ["Simaran", "Developer", "Designer"];
  const dynamicText = document.getElementById("dynamic-text");
  const staticText = document.getElementById("static-text").innerHTML;
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
        setTimeout(type, 500);
      } else {
        setTimeout(type, 100);
      }
    } else {
      dynamicText.innerHTML = currentPhrase.substring(0, charIndex++);
      if (charIndex > currentPhrase.length) {
        isDeleting = true;
        setTimeout(type, 1500);
      } else {
        setTimeout(type, 100);
      }
    }
  }

  type();
});
window.addEventListener("load", function () {
  window.scrollTo(0, 0);
});
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.hash) {
    window.location.hash = "";
  }
});

document.addEventListener("scroll", function () {
  const educationItems = document.querySelectorAll(".education-item");
  const educationSection = document.getElementById("Education");
  const sectionPosition = educationSection.getBoundingClientRect();

  if (sectionPosition.top < window.innerHeight && sectionPosition.bottom >= 0) {
    educationItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("visible");
      }, index * 400);
    });
  } else {
    educationItems.forEach((item) => {
      item.classList.remove("visible");
    });
  }
});

var form = document.getElementById("sheetdb-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data && data.created) {
        showPopup("success-popup");
        form.reset();
      } else {
        showPopup("error-popup");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      showPopup("general-error-popup");
    });
});

function showPopup(popupId) {
  var popup = document.getElementById(popupId);
  popup.style.display = "block";

  var closeBtn = popup.querySelector(".close-btn");
  closeBtn.addEventListener("click", function () {
    hidePopup(popupId);
  });

  setTimeout(function () {
    hidePopup(popupId);
  }, 3000);
}

function hidePopup(popupId) {
  var popup = document.getElementById(popupId);
  popup.style.display = "none";
}
