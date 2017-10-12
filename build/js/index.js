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

var postList = document.querySelector('#blog');

fetch('/posts').then(function (resp) {
  return resp.json();
}).then(function (json) {
  var posts = json.payload.references.Post;

  Object.keys(posts).forEach(function (postId) {
    var post = posts[postId];

    var title = post.title;
    var subtitle = post.content.subtitle;
    var publishedAtDate = new Date(post.firstPublishedAt);

    renderPost(title, subtitle, publishedAtDate);
  });
});

function renderPost(title, subtitle, publishedAtDate) {
  console.log('rendering post', title);
}