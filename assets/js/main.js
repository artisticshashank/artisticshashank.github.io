/*-----------------------------------------------
                Toggle Menu
-------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById('menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  // Toggle mobile menu visibility
  menuToggle.addEventListener('click', function () {
    mobileMenu.classList.toggle('active');
    const icon = menuToggle.querySelector('i');

    if (mobileMenu.classList.contains('active')) {
      icon.classList.remove('bi-list');
      icon.classList.add('bi-x');
    } else {
      icon.classList.remove('bi-x');
      icon.classList.add('bi-list');
    }
  });

});

let options = {
  root: document.querySelector("menu-button"),
  rootMargin: "0px",
  threshold: 0.2,
};

let observer = new IntersectionObserver((arg) => {
  const isIntersecting = arg.some(item => item.isIntersecting); 
  const isMobile = window.matchMedia("(width < 900px)").matches
  const menuToggle = document.getElementById('menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const icon = menuToggle.querySelector('i');
  const nav = document.querySelector('#nav')
  if (isIntersecting && !isMobile) {
    menuToggle.style.display = 'none';
    nav.style.display = 'flex';
    icon.classList.remove('bi-x');
    icon.classList.add('bi-list');
    mobileMenu.classList.remove('active')
  }
  else {
    menuToggle.style.display = 'block';
    nav.style.display = 'none';
  }
}, options);
observer.observe(document.querySelector("#home"));

/*-------------------------------------------
          Arts Section Gallery
---------------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {

  const isMobile = window.matchMedia("(width < 1080px)").matches

  if (!isMobile) {
    let slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
      showSlides(slideIndex += n);
    }

    function currentSlide(n) {
      showSlides(slideIndex = n);
    }

    function showSlides(n) {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      let dots = document.getElementsByClassName("dot");
      if (n > slides.length) { slideIndex = 1 }
      if (n < 1) { slideIndex = slides.length }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
    }

    // Expose functions to global scope to be accessible from HTML
    window.plusSlides = plusSlides;
    window.currentSlide = currentSlide;
  }
});

/*---------------------------------------------------
                  Theme Button
-----------------------------------------------------*/
const mobileThemeBtn = document.querySelector('#mobiletheme-btn');
const themeToggleBtn = document.querySelector('#theme-toggle');

// Mobile Action button
mobileThemeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  toggleTheme();
});

// Pc theme button
themeToggleBtn.addEventListener('click', toggleTheme);

function toggleTheme() {

  if (document.documentElement.getAttribute('data-theme') === 'dark') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  // Update icons and text
  toggleThemeIconsAndText();

}

function toggleThemeIconsAndText() {
  if (document.documentElement.getAttribute('data-theme') === 'dark') {
    // Set icon and text for light mode
    themeToggleBtn.innerHTML = '<i class="bi bi-brightness-high-fill"></i> Light Mode';
    mobileThemeBtn.innerHTML = '<i class="bi bi-brightness-high-fill"></i> Light Mode';
  } else {
    // Set icon and text for dark mode
    themeToggleBtn.innerHTML = '<i class="bi bi-moon-fill"></i> Dark Mode';
    mobileThemeBtn.innerHTML = '<i class="bi bi-moon-fill"></i> Dark Mode';
  }
}

// Function to detect and set theme based on user's preference
function setThemeBasedOnUserPreference() {
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (prefersDarkScheme) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  // Update icons and text based on initial theme
  toggleThemeIconsAndText();
}

// Call the function to set theme based on user's preference on page load
document.addEventListener('DOMContentLoaded', function () {
  setThemeBasedOnUserPreference();
});

/*-------------------------------------------
             Back to top buton
---------------------------------------------*/
const backToTopButton = document.querySelector('.back-to-top');

if (backToTopButton) {
  const toggleBackToTop = () => {
    backToTopButton.classList.toggle('active', window.scrollY > 100);
  };

  window.addEventListener('scroll', toggleBackToTop);
}

