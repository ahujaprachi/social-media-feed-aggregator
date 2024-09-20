import { Button, Stack, Step } from "@mui/material";
import React from "react";
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

const Feed = (props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <>
      <div>
        <Container>
          <h1>Instagram Postcard</h1>
          <Card sx={{ maxWidth: 345, margin: "auto", boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom>
                username_here
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              height="240"
              image="https://media.istockphoto.com/id/1412834907/photo/group-of-multiethnic-businesspeople-discussing-about-financial-strategy-renewable-power.jpg?s=1024x1024&w=is&k=20&c=kdMm22YmQwXzhs-Ut5GIxOK1g5dJi8MGIgS9Ip5E5gc=" // Replace with your image URL
              alt="Post"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary"></Typography>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <CiHeart />
                <CiBookmark />
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </div>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
};

export default Feed;
