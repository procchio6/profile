(function () {
  const navLinks = document.querySelectorAll('nav ul a');
  const navToggle = document.querySelector('.nav__toggle');
  const navList = document.querySelector('nav ul');

  navLinks.forEach( navLink => {
    const href = navLink.getAttribute('href');
    const element = document.querySelector(href);

    if (!element) {
      return;
    }

    navLink.addEventListener('click', (e) => {
      e.preventDefault();

      navList.classList.toggle('nav--open');
      
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


  navToggle.addEventListener('click', e => {
    e.preventDefault()
    navList.classList.toggle('nav--open');
  });
})()
