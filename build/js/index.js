(function () {
  var navLinks = document.querySelectorAll('nav ul a');
  var navToggle = document.querySelector('.nav__toggle');
  var navList = document.querySelector('nav ul');

  navLinks.forEach(function (navLink) {
    var href = navLink.getAttribute('href');
    var element = document.querySelector(href);

    if (!element) {
      return;
    }

    navLink.addEventListener('click', function (e) {
      e.preventDefault();

      navList.classList.toggle('nav--open');

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

  navToggle.addEventListener('click', function (e) {
    e.preventDefault();
    navList.classList.toggle('nav--open');
  });
})();

var postList = document.querySelector('.posts-list');
var postLoader = document.querySelector('.posts-loading');

fetch('/posts').then(function (resp) {
  return resp.json();
}).then(function (json) {
  var posts = json.payload.references.Post;

  postLoader.style.display = 'none';

  Object.keys(posts).forEach(function (postId) {
    var post = posts[postId];

    var title = post.title;
    var subtitle = post.content.subtitle;
    var publishedAtDate = new Date(post.firstPublishedAt);

    renderPost(postId, title, subtitle, publishedAtDate);
  });
});

function renderPost(postId, title, subtitle, publishedAtDate) {

  var postHtml = '\n    <div class=\'post\' data-postId="' + postId + '">\n      <div class="post__header">\n        <div class="post__title">\n          ' + title + '\n        </div>\n        <div class="post__date">\n          ' + dateFormat(publishedAtDate, "mediumDate") + '\n        </div>\n      </div>\n      <div class="post__content">\n        <p class="post_body">\n          ' + subtitle + '\n          <a href="https://medium.com/posts/' + postId + '" class="post__more" target="_blank"> More</a>\n        </p>\n\n      </div>\n    </div>\n  ';

  postList.innerHTML += postHtml;
}

$(postList).on('click', 'div.post', function (e) {
  // Return if more button was clicked
  if ($(e.target).hasClass('post__more')) return;

  var postId = this.dataset.postid;
  window.open('https://medium.com/posts/' + postId, '_blank');
});