import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Feed from "./Components/Feed";
import { Route, Routes, useNavigate } from "react-router-dom";
import Error404 from "./Components/Error404";
import { getLoggedInUser } from "./utils/User";
import FeedService from "./services/FeedService";
import { pages } from "./utils/PageTokens";
import { addPostInDb } from "./utils/Db";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const feedService = new FeedService();
    pages.map(async (page) => {
      await feedService.getPosts(page).then(async (response) => {
        const pageName = await feedService.getPageName(page);
        response.data.data.map((post) => {
          addPostInDb({
            username: pageName.data.name,
            profile: pageName.data.picture?.data.url,
            post: post,
          });
        });
      });
    });
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Feed />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
