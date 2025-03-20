function n(e) {
  this.init(e || {});
}

n.prototype = {
  init: function (e) {
      this.phase = e.phase || 0;
      this.offset = e.offset || 0;
      this.frequency = e.frequency || 0.001;
      this.amplitude = e.amplitude || 1;
  },
  update: function () {
      return (
          (this.phase += this.frequency),
          (e = this.offset + Math.sin(this.phase) * this.amplitude)
      );
  },
  value: function () {
      return e;
  },
};

function Line(e) {
  this.init(e || {});
}

Line.prototype = {
  init: function (e) {
      this.spring = e.spring + 0.1 * Math.random() - 0.02;
      this.friction = E.friction + 0.01 * Math.random() - 0.002;
      this.nodes = [];
      for (var t, n = 0; n < E.size; n++) {
          t = new Node();
          t.x = pos.x;
          t.y = pos.y;
          this.nodes.push(t);
      }
  },
  update: function () {
      var e = this.spring,
          t = this.nodes[0];
      t.vx += (pos.x - t.x) * e;
      t.vy += (pos.y - t.y) * e;
      for (var n, i = 0, a = this.nodes.length; i < a; i++)
          (t = this.nodes[i]),
          0 < i &&
          ((n = this.nodes[i - 1]),
              (t.vx += (n.x - t.x) * e),
              (t.vy += (n.y - t.y) * e),
              (t.vx += n.vx * E.dampening),
              (t.vy += n.vy * E.dampening)),
          (t.vx *= this.friction),
          (t.vy *= this.friction),
          (t.x += t.vx),
          (t.y += t.vy),
          (e *= E.tension);
  },
  draw: function () {
      var e,
          t,
          n = this.nodes[0].x,
          i = this.nodes[0].y;
      ctx.beginPath();
      ctx.moveTo(n, i);
      for (var a = 1, o = this.nodes.length - 2; a < o; a++) {
          e = this.nodes[a];
          t = this.nodes[a + 1];
          n = 0.5 * (e.x + t.x);
          i = 0.5 * (e.y + t.y);
          ctx.quadraticCurveTo(e.x, e.y, n, i);
      }
      e = this.nodes[a];
      t = this.nodes[a + 1];
      ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
      ctx.stroke();
      ctx.closePath();
  },
};

function onMousemove(e) {
  function o() {
      lines = [];
      for (var e = 0; e < E.trails; e++)
          lines.push(new Line({ spring: 0.4 + (e / E.trails) * 0.025 }));
  }

  function c(e) {
      e.touches
          ? ((pos.x = e.touches[0].pageX), (pos.y = e.touches[0].pageY))
          : ((pos.x = e.clientX), (pos.y = e.clientY)),
          e.preventDefault();
  }

  function l(e) {
      1 == e.touches.length &&
      ((pos.x = e.touches[0].pageX), (pos.y = e.touches[0].pageY));
  }

  document.removeEventListener('mousemove', onMousemove),
  document.removeEventListener('touchstart', onMousemove),
  document.addEventListener('mousemove', c),
  document.addEventListener('touchmove', c),
  document.addEventListener('touchstart', l),
  c(e),
  o(),
  render();
}

function render() {
  if (ctx.running) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = 'hsla(' + Math.round
      (f.update()) + ',50%,20%,0.8)';
      ctx.lineWidth = 3;
      for (var e, t = 0; t < E.trails; t++) {
          (e = lines[t]).update();
          e.draw();
      }
      ctx.frame++;
      window.requestAnimationFrame(render);
  }
}

function resizeCanvas() {
  ctx.canvas.width = window.innerWidth - 20;
  ctx.canvas.height = window.innerHeight;
}

var ctx,
  f,
  e = 0,
  pos = {},
  lines = [],
  E = {
      debug: true,
      friction: 0.5,
      trails: 20,
      size: 50,
      dampening: 0.25,
      tension: 0.98,
  };

function Node() {
  this.x = 0;
  this.y = 0;
  this.vy = 0;
  this.vx = 0;
}

const renderCanvas = function () {
  ctx = document.getElementById('canvas').getContext('2d');
  ctx.running = true;
  ctx.frame = 1;
  f = new n({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
  });
  document.addEventListener('mousemove', onMousemove);
  document.addEventListener('touchstart', onMousemove);
  document.body.addEventListener('orientationchange', resizeCanvas);
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('focus', () => {
      if (!ctx.running) {
          ctx.running = true;
          render();
      }
  });
  window.addEventListener('blur', () => {
      ctx.running = true;
  });
  resizeCanvas();
};

window.onload = function () {
  renderCanvas();
};
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

