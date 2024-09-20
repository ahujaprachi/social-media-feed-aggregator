import { Button, Stack, Step } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import FeedService from "../services/FeedService";

const Feed = (props) => {
  const [feeds, setFeeds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const feedService = new FeedService();
    feedService.getPosts().then((response) => {
      setFeeds(response.data.data);
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  console.log(feeds);
  const arr = [];
  return (
    <>
      <Container>
        <Typography marginTop={3}>Welcome, {getLoggedInUser()}</Typography>
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
          {feeds?.map((item) => {
            console.log("LIKE", item.likes?.data?.length);
            return (
              <div key={item}>
                <Card sx={{ maxWidth: 345, margin: "10px", boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      username_here
                    </Typography>
                  </CardContent>
                  <CardMedia
                    component="img"
                    height="240"
                    image={item.full_picture} // Replace with your image URL
                    alt="Post"
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    ></Typography>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                      <Stack justifyContent={"center"} alignItems={"center"}>
                        <CiHeart style={{ fontSize: "30px" }} />
                        <Typography>
                          {item.likes?.data?.length
                            ? item.likes?.data?.length
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
