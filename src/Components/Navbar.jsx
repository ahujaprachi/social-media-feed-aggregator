import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { TiHomeOutline } from "react-icons/ti";
import { Link } from "react-router-dom";

export const Navbar = ({ handleLogout }) => {
  console.log(handleLogout);

  return (
    <Box paddingTop={8} paddingX={"5%"} borderBottom={"1px solid lightgray"}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        padding={1}
      >
        <Link to={"/"} className="no-anchor">
          <Stack
            direction={"row"}
            spacing={1}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <TiHomeOutline fontSize={25} />
            <Typography fontSize={22}>Home</Typography>
          </Stack>
        </Link>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Stack>
    </Box>
  );
};
