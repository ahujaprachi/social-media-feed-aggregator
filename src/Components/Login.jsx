import React, { useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    let users = JSON.parse(localStorage.getItem("users"));
    if (Object.keys(users).includes(user.email)) {
      alert("userfound");
    }
    console.log(Object.keys(users).includes(user.email));
    console.log(Object.keys(users));
    console.log(user.email);
    navigate("/feed");
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
      </form>
    </Paper>
  );
};

export default Login;
