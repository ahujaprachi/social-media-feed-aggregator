import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  Stack,
} from "@mui/material";
import "./signup.css";
import { json, useNavigate } from "react-router-dom";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      ...JSON.parse(localStorage.getItem("users")),
      [email]: { username, password },
    };
    localStorage.setItem("users", JSON.stringify(newUser));

    navigate("/login");
  };

  return (
    <Stack justifyContent={"center"} alignItems={"center"} margin={10}>
      <Paper
        style={{
          padding: "16px",
          margin: "16px 0",
          height: "400px",
          width: "300px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h4">Signup</Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
          <Button
            variant="contained"
            padding="16px"
            margin="16px 0"
            color="primary"
            type="submit"
          >
            Signup
          </Button>
          <Typography variant="body2" align="center" style={{ marginTop: 16 }}>
            Already have an account?{" "}
            <Link href="/login" color="primary">
              Login
            </Link>
          </Typography>
        </form>
      </Paper>
    </Stack>
  );
};

export default Signup;
