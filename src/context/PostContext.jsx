// PostsContext.js
import React, { createContext, useState } from "react";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [theme, setTheme] = useState("light-theme");

  const initializePosts = (posts) => {
    setPosts(posts);
  };

  const addPost = (post) => {
    setPosts((prevPosts) => [...prevPosts, post]);
  };

  const removePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const updatePostLikeStatus = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          post.isLiked = !post.isLiked;
        }
        return post;
      })
    );
  };

  const updatePostSaveStatus = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          post.isSaved = !post.isSaved;
        }
        return post;
      })
    );
  };

  const setAppTheme = (theme) => {
    setTheme(theme);
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        addPost,
        removePost,
        updatePostLikeStatus,
        updatePostSaveStatus,
        initializePosts,
        theme,
        setAppTheme,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
