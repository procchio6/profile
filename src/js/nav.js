(function () {
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach( navLink => {
    const href = navLink.getAttribute('href');
    const element = document.querySelector(href);

    if (!element) {
      return;
    }

    navLink.addEventListener('click', (e) => {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: $(element).offset().top - 42
      }, 500);
    });

    function applyActiveClass(e) {
      const scrollHeight = window.scrollY + 200;
      const elementHeight = element.clientHeight;
      const elementTopPos = element.offsetTop;

      if (scrollHeight > elementTopPos && scrollHeight < elementTopPos + elementHeight) {
        navLink.classList.add('active');
      } else {
        navLink.classList.remove('active');
      }
    }

    window.addEventListener('scroll', applyActiveClass);
  });
})()
