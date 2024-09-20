import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    let users = JSON.parse(localStorage.getItem("users"));
    console.log(users[user.email]);
    if (users[user.email] !== undefined) {
      if (users[user.email].password === user.password) {
        alert("Login success");
        localStorage.setItem("isLoggedIn", user.email);
        navigate("/");
      } else {
        alert("Username or password is incorrect");
      }
    } else {
      alert("Username or password is incorrect");
    }
  };

  return (
    <Paper
      style={{
        padding: "16px",
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
        <div
          style={{
            fontsize: "16px",
            textAlign: "left",
            marginTop: "10px",
            marginBottom: "30px",
          }}
        >
          Forget Password?
        </div>

        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
        <Typography variant="body2" align="center" style={{ marginTop: 16 }}>
          Don't have an account?{" "}
          <Link href="/signup" color="primary">
            Sign Up
          </Link>
        </Typography>
      </form>
    </Paper>
  );
};

export default Login;
