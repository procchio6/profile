'use strict';

(function () {
  var navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(function (navLink) {
    var href = navLink.getAttribute('href');
    var element = document.querySelector(href);

    if (!element) {
      return;
    }

    navLink.addEventListener('click', function (e) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: $(element).offset().top - 42
      }, 500);
    });

    function applyActiveClass(e) {
      var scrollHeight = window.scrollY + 200;
      var elementHeight = element.clientHeight;
      var elementTopPos = element.offsetTop;

      if (scrollHeight > elementTopPos && scrollHeight < elementTopPos + elementHeight) {
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    }

    window.addEventListener('scroll', applyActiveClass);
  });
})();