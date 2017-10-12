const https = require("https");

const url =
  "https://medium.com/@patrocc6/latest?format=json";
https.get(url, res => {
  res.setEncoding("utf8");
  let body = "";
  res.on("data", data => {
    body += data;
  });
  res.on("end", () => {
    body = JSON.parse(body.replace('])}while(1);</x>', ''));

    const posts = body.payload.references.Post;

    Object.keys(posts).forEach(postId => {
      const post = posts[postId];
      
      console.log(post.title);
      console.log(post.content.subtitle);

      const publishedAtDate = new Date(post.firstPublishedAt);

      console.log(publishedAtDate);

    });
  });
});
