import {
  Avatar,
  Box,
  Button,
  Input,
  InputAdornment,
  Stack,
  Step,
  Tab,
  Tabs,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
} from "@mui/material";
import { getLoggedInUser } from "../utils/User";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { addPostInDb, toggleLike, toggleSave } from "../utils/Db";
import { PostsContext } from "../context/PostContext";
import { MdAccountCircle } from "react-icons/md";

const Feed = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState("Unknown");
  const [searchText, setSearchText] = useState("");
  const { posts, initializePosts, theme } = useContext(PostsContext);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") == null) {
      navigate("/login");
    } else {
      setUser(getLoggedInUser());
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const handleLike = (postId) => {
    toggleLike(postId);
    filterPosts();
  };

  const handleSave = (postId) => {
    toggleSave(postId);
    filterPosts();
  };

  const [filter, setFilter] = useState(1);

  function filterPosts() {
    if (filter == 2) {
      initializePosts(
        JSON.parse(localStorage.getItem("posts")).filter((post) => post.isSaved)
      );
    } else if (filter == 3) {
      initializePosts(
        JSON.parse(localStorage.getItem("posts")).filter((post) => post.isLiked)
      );
    } else {
      initializePosts(JSON.parse(localStorage.getItem("posts")));
    }
  }

  useEffect(() => {
    filterPosts();
  }, [filter]);

  const handleChange = (event, appliedFilter) => {
    setFilter(appliedFilter);
  };

  const handleSearch = (e) => {
    console.log("called");

    setSearchText(e.target.value);
    initializePosts(
      JSON.parse(localStorage.getItem("posts")).filter((post) => {
        if (
          post.message.toLowerCase().includes(e.target.value.toLowerCase()) ||
          e.target.value === ""
        ) {
          return true;
        } else {
          return false;
        }
      })
    );
  };

  const arr = [];
  return (
    <>
      <Container>
        <Typography marginTop={3}>Welcome, {user}</Typography>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          margin={2}
        >
          <Typography variant="h4" fontWeight={"bold"}>
            Social Media Feeds
          </Typography>

          <Stack direction={"row"}>
            <Button onClick={handleLogout}>Logout</Button>
          </Stack>
        </Stack>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={filter}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    label="All"
                    value="1"
                    sx={{ color: theme === "dark-theme" ? "white" : "black" }}
                  />
                  <Tab
                    label="Saved"
                    value="2"
                    sx={{ color: theme === "dark-theme" ? "white" : "black" }}
                  />
                  <Tab
                    label="Liked"
                    value="3"
                    sx={{ color: theme === "dark-theme" ? "white" : "black" }}
                  />
                </TabList>
                <Box
                  sx={{
                    width: "20%",
                  }}
                >
                  <Input
                    id="input-with-icon-adornment"
                    startAdornment={
                      <InputAdornment position="start">
                        <FaSearch
                          style={{
                            color: theme === "dark-theme" ? "white" : "black",
                          }}
                        />
                      </InputAdornment>
                    }
                    value={searchText}
                    placeholder="Posts..."
                    onChange={(e) => handleSearch(e)}
                    sx={{
                      color: theme === "dark-theme" ? "white" : "black",
                    }}
                  />
                </Box>
              </Stack>
            </Box>
          </TabContext>
        </Box>
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          justifyContent={"space-evenly"}
        >
          {posts?.map((item) => {
            return (
              <div key={item}>
                <Card
                  sx={{
                    maxWidth: 345,
                    margin: "10px",
                    boxShadow: 3,
                  }}
                >
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
                    image={item.fullPicture} // Replace with your image URL
                    alt="Post"
                    sx={{ cursor: "pointer" }}
                  />
                  <Typography variant="body2" color="text.secondary" margin={1}>
                    {item.message}
                  </Typography>
                  <CardContent>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Stack justifyContent={"center"} alignItems={"center"}>
                        <Container sx={{ height: 30 }}>
                          {item.isLiked ? (
                            <FaHeart
                              style={{
                                fontSize: "25px",
                                cursor: "pointer",
                                color: "red",
                              }}
                              onClick={() => handleLike(item.id)}
                            />
                          ) : (
                            <CiHeart
                              style={{
                                fontSize: "30px",
                                cursor: "pointer",
                              }}
                              onClick={() => handleLike(item.id)}
                            />
                          )}
                        </Container>

                        <Typography>{item.likeCount || 0}</Typography>
                      </Stack>
                      {item.isSaved ? (
                        <FaBookmark
                          style={{ fontSize: "30px", cursor: "pointer" }}
                          onClick={() => handleSave(item.id)}
                        />
                      ) : (
                        <CiBookmark
                          style={{ fontSize: "30px", cursor: "pointer" }}
                          onClick={() => handleSave(item.id)}
                        />
                      )}
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
