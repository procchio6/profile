const postList = document.querySelector('.posts-list');
const postLoader = document.querySelector('.posts-loading');

fetch('/posts')
.then(resp => resp.json())
.then(json => {
  let posts = json.payload.references.Post;

  postLoader.style.display = 'none';

  Object.keys(posts).forEach(postId => {
    const post = posts[postId];

    const title = post.title;
    const subtitle = post.content.subtitle;
    const publishedAtDate = new Date(post.firstPublishedAt);

    renderPost(postId, title, subtitle, publishedAtDate);

  });
});

function renderPost(postId, title, subtitle, publishedAtDate) {

  let postHtml = `
    <div class='post' data-postId="${postId}">
      <div class="post__header">
        <div class="post__title">
          ${title}
        </div>
        <div class="post__date">
          ${dateFormat(publishedAtDate, "mediumDate")}
        </div>
      </div>
      <div class="post__content">
        <p class="post_body">
          ${subtitle}
          <a href="https://medium.com/posts/${postId}" class="post__more" target="_blank"> More</a>
        </p>

      </div>
    </div>
  `

  postList.innerHTML += postHtml;
}

$(postList).on('click', 'div.post', function(e) {
  // Return if more button was clicked
  if ($(e.target).hasClass('post__more')) return;

  const postId = this.dataset.postid;
  window.open(`https://medium.com/posts/${postId}`, '_blank');
});
