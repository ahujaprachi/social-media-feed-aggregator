import { Avatar, Button, Stack, Step } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
} from "@mui/material";
import { getLoggedInUser } from "../utils/User";
import { TbSettingsStar } from "react-icons/tb";
import FeedService from "../services/FeedService";
import { pages } from "../utils/PageTokens";
import { addPostInDb } from "../utils/Db";
import { PostsContext } from "../context/PostContext";

const Feed = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState("Unknown");
  const { addposts, addPost } = useContext(PostsContext);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") == null) {
      navigate("/login");
    } else {
      setUser(getLoggedInUser());
      const posts = JSON.parse(localStorage.getItem("posts")) || [];
      posts.map((post) => {
        addPost(post);
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const arr = [];
  return (
    <>
      <Container>
        <Typography marginTop={3}>Welcome, {user}</Typography>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography variant="h4" fontWeight={"bold"} marginBottom={5}>
            Social Media Feeds
          </Typography>

          <Stack direction={"row"}>
            <Button onClick={handleLogout}>Logout</Button>
          </Stack>
        </Stack>
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          justifyContent={"space-evenly"}
        >
          {JSON.parse(localStorage.getItem("posts"))?.map((item) => {
            return (
              <div key={item}>
                <Card sx={{ maxWidth: 345, margin: "10px", boxShadow: 3 }}>
                  <CardContent>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                      <Avatar src={item.profile} />
                      <Typography variant="h6" component="div" gutterBottom>
                        {item.username}
                      </Typography>
                    </Stack>
                  </CardContent>
                  <CardMedia
                    component="img"
                    height="240"
                    image={item.post.full_picture} // Replace with your image URL
                    alt="Post"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {item.post.message}
                    </Typography>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Stack justifyContent={"center"} alignItems={"center"}>
                        <CiHeart style={{ fontSize: "30px" }} />
                        <Typography>
                          {item.post.likes?.data?.length
                            ? item.post.likes?.data?.length
                            : 0}
                        </Typography>
                      </Stack>
                      <CiBookmark style={{ fontSize: "30px" }} />
                    </Stack>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </Stack>
      </Container>
    </>
  );
};

export default Feed;
