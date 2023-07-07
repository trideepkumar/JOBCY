import { Grid } from "@mui/material";
import React from "react";
import Navbar from "../../Appbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import OrganisationCard from "./OrganisationCard";
function OrganisationManagement() {
  return (
    <div>
      <Navbar />
      <Grid>
        <Grid>
          <Sidebar />
        </Grid>
        <Grid sx={{marginLeft:'3rem'}}>
          <OrganisationCard />
        </Grid>
      </Grid>
    </div>
  );
}

export default OrganisationManagement;
