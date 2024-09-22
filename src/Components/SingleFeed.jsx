import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById, toggleLike, toggleSave } from "../utils/Db";
import { FaBookmark, FaHeart } from "react-icons/fa6";
import { CiBookmark, CiHeart } from "react-icons/ci";

export const SingleFeed = () => {
  let { feedId } = useParams();
  const [post, setPost] = useState(getPostById(feedId));
  const [isEditing, setIsEditing] = useState(false);

  function handleEditing() {
    setIsEditing((prev) => !prev);
  }

  const handleLike = (postId) => {
    toggleLike(postId);
    setPost(getPostById(feedId));
  };

  const handleSave = (postId) => {
    toggleSave(postId);
    setPost(getPostById(feedId));
  };

  return (
    <div>
      <Stack
        direction={"column"}
        flexWrap={"wrap"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <Typography variant="h4">The Feed</Typography>
        <Card
          sx={{
            maxWidth: 345,
            margin: "10px",
            boxShadow: 3,
          }}
        >
          <CardContent>
            <Box textAlign={"end"}>
              <Button onClick={() => handleEditing()}>Edit</Button>
            </Box>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <Avatar src={post.profile} />
              <Typography variant="h6" component="div" gutterBottom>
                {post.username}
              </Typography>
            </Stack>
          </CardContent>
          <CardMedia
            component="img"
            height="240"
            image={post.fullPicture} // Replace with your image URL
            alt="Post"
          />
          <Typography variant="body2" color="text.secondary" margin={1}>
            {post.message}
          </Typography>
          <CardContent>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Stack justifyContent={"center"} alignItems={"center"}>
                <Container sx={{ height: 30 }}>
                  {post.isLiked ? (
                    <FaHeart
                      style={{
                        fontSize: "25px",
                        cursor: "pointer",
                        color: "red",
                      }}
                      onClick={() => handleLike(post.id)}
                    />
                  ) : (
                    <CiHeart
                      style={{
                        fontSize: "30px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleLike(post.id)}
                    />
                  )}
                </Container>

                <Typography>{post.likeCount || 0}</Typography>
              </Stack>
              {post.isSaved ? (
                <FaBookmark
                  style={{ fontSize: "30px", cursor: "pointer" }}
                  onClick={() => handleSave(post.id)}
                />
              ) : (
                <CiBookmark
                  style={{ fontSize: "30px", cursor: "pointer" }}
                  onClick={() => handleSave(post.id)}
                />
              )}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </div>
  );
};
