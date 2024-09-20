import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Feed = (props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <>
      <div>i m feed</div>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
};

export default Feed;
