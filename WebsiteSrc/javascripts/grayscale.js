/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
(function() {
  "use strict"; // Start of use strict

  const mainNav = document.querySelector("#mainNav");

  if (mainNav) {
    const navbarCollapse = mainNav.querySelector(".navbar-collapse");

    if (navbarCollapse) {
      const collapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false,
      });

      const navbarItems = navbarCollapse.querySelectorAll("a");

      // Closes responsive menu when a scroll trigger link is clicked
      for (const item of navbarItems) {
        item.addEventListener("click", function(event) {
          collapse.hide();
        });
      }
    }

    // Collapse Navbar
    const collapseNavbar = function() {
      const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

      if (scrollTop > 100) {
        mainNav.classList.add("navbar-shrink");
      } else {
        mainNav.classList.remove("navbar-shrink");
      }
    };
    // Collapse now if page is not at top
    collapseNavbar();
    // Collapse the navbar when page is scrolled
    document.addEventListener("scroll", collapseNavbar);
  }
})(); // End of use strict

const t = document.getElementById("title");

if (t){
  setInterval(()=>{
    animate(t);
    if (t.innerText === "TsukariWA") {
      t.innerText = "つかりWA";
    } else {
      t.innerText = "TsukariWA";
    }
  }, 5000);
}

function animate(t) {
  setTimeout(()=>{
    t.classList.remove("animate");
  }, 1000);
  t.classList.add("animate");
}
