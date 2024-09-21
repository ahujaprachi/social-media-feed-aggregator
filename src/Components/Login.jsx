import React, { useContext, useState } from "react";
import { TextField, Button, Typography, Paper, Stack } from "@mui/material";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { PostsContext } from "../context/PostContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { initializePosts } = useContext(PostsContext);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    let users = JSON.parse(localStorage.getItem("users"));
    if (users && users[user.email] !== undefined) {
      if (users[user.email].password === user.password) {
        alert("Login success");
        localStorage.setItem("isLoggedIn", user.email);
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        initializePosts(posts);
        navigate("/");
      } else {
        alert("Username or password is incorrect");
      }
    } else {
      alert("Username or password is incorrect");
    }
  };

  return (
    <Stack justifyContent={"center"} alignItems={"center"} margin={10}>
      <Paper
        style={{
          padding: "0px 16px",
          margin: "16px 0",
          height: "350px",
          width: "300px",
          borderRadius: "10px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h4">Login</Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            inputProps={{
              autoComplete: "new-password",
              form: {
                autoComplete: "off",
              },
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
          <Typography variant="body2" align="center" style={{ marginTop: 16 }}>
            Don't have an account?{" "}
            <Link to="/signup" className="no-anchor">
              Sign Up
            </Link>
          </Typography>
        </form>
      </Paper>
    </Stack>
  );
};

export default Login;
