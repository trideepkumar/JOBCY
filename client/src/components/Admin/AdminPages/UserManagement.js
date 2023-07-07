import { Grid } from "@mui/material";
import React from "react";
import Navbar from "../../Appbar/Navbar";
import UserCard from "../UserCard/UserCard";
import Sidebar from "../Sidebar/Sidebar";

function UserManagement() {
  return (
    <div>
      <Navbar />
      <Grid sx={{ display: "flex", gap: "3rem" }}>
        <Grid>
          <Sidebar /> 
        </Grid>
        <Grid >
          <UserCard />
        </Grid>
      </Grid>
    </div>
  );
}

export default UserManagement;
