const postList = document.querySelector('#blog');

fetch('/posts')
.then(resp => resp.json())
.then(json => {
  let posts = json.payload.references.Post;

  Object.keys(posts).forEach(postId => {
    const post = posts[postId];

    const title = post.title;
    const subtitle = post.content.subtitle;
    const publishedAtDate = new Date(post.firstPublishedAt);

    renderPost(title, subtitle, publishedAtDate);

  });
});

function renderPost(title, subtitle, publishedAtDate) {
  console.log('rendering post', title);
}
