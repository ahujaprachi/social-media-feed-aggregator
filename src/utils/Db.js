export function addPostInDb(post) {
  console.log(post.post.id);

  if (!checkPostExists(post.post.id)) {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));
    const postIds = JSON.parse(localStorage.getItem("postIds")) || [];
    postIds.push(post.post.id);
    localStorage.setItem("postIds", JSON.stringify(postIds));
  }
}

function checkPostExists(postId) {
  const postIds = JSON.parse(localStorage.getItem("postIds")) || [];
  if (postIds.includes(postId)) {
    return true;
  } else {
    return false;
  }
}
