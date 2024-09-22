export function addPostInDb(post) {
  if (!checkPostExists(post.id)) {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));
    const postIds = JSON.parse(localStorage.getItem("postIds")) || [];
    postIds.push(post.id);
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

export function getPostById(postId) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  return posts.find((post) => post.id === postId);
}

export function toggleLike(postId) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const updatedPosts = posts.map((post) => {
    if (post.id === postId) {
      if (post.isLiked) {
        post.likeCount = --post.likeCount;
      } else {
        post.likeCount = ++post.likeCount;
      }
      post.isLiked = !post.isLiked;
    }
    return post;
  });
  localStorage.setItem("posts", JSON.stringify(updatedPosts));
  return updatedPosts;
}

export function toggleSave(postId) {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  const updatedPosts = posts.map((post) => {
    if (post.id === postId) {
      post.isSaved = !post.isSaved;
    }
    return post;
  });
  localStorage.setItem("posts", JSON.stringify(updatedPosts));
  return updatedPosts;
}
