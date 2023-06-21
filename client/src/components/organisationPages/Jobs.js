import {
  Box,
  Card,
  Grid,
  Typography,
  Avatar,
  TextField,
  Divider,
  IconButton,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React, { useState } from "react";
import "./Jobs.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";

function Jobs() {
  const authState = useSelector((state) => {
    return state.organisationauth.authState;
  });

  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <>
      <Grid container spacing={0.5}>
        <Grid item lg={3} style={{ display: "grid" }}>
          <Card
            style={{
              background: "white",
              margin: "4rem 4rem 4rem 4rem",
              borderRadius: "5px",
              boxShadow: "1px 1px 2px white",
              marginTop: "3.4rem",
              width: "20rem",
              border: "0.01px solid lightgrey",
              position: "sticky",
              top: "2rem",
              position: "fixed",
            }}
            className="card"
          >
            <Box sx={{ p: 2 }}>
              <Typography variant="body2" component="div" textAlign="left">
                Search
              </Typography>
              <Divider sx={{ my: 2 }} />
              <TextField label="Search input" variant="outlined" fullWidth />
              <Button
                fullWidth
                style={{
                  backgroundColor: "#ff6e14",
                  color: "white",
                  marginTop: "1rem",
                }}
              >
                Search
              </Button>
            </Box>
          </Card>

          <Card
            style={{
              background: "white",
              margin: "4rem 4rem 4rem 4rem",
              borderRadius: "5px",
              boxShadow: "1px 1px 2px white",
              marginTop: "17rem",
              width: "20rem",
              border: "0.01px solid lightgrey",
              position: "sticky",
              top: "2rem",
              position: "fixed",
              textAlign: "left",
            }}
            className="card"
          >
            <Box sx={{ p: 2 }}>
              <Typography variant="body2" component="div" textAlign="left">
                Categories
              </Typography>
              <Divider sx={{ my: 2 }} />
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <FormControlLabel
                    value="construction"
                    control={
                      <Radio
                        color="primary"
                        checked={selectedCategory === "construction"}
                        style={{
                          color:
                            selectedCategory === "construction"
                              ? "#ff6e14"
                              : "",
                        }}
                      />
                    }
                    label="Construction"
                  />
                  <FormControlLabel
                    value="agriculture"
                    control={
                      <Radio
                        color="primary"
                        checked={selectedCategory === "agriculture"}
                        style={{
                          color:
                            selectedCategory === "agriculture" ? "#ff6e14" : "",
                        }}
                      />
                    }
                    label="Agriculture"
                  />
                  <FormControlLabel
                    value="technology"
                    control={
                      <Radio
                        color="primary"
                        checked={selectedCategory === "technology"}
                        style={{
                          color:
                            selectedCategory === "technology" ? "#ff6e14" : "",
                        }}
                      />
                    }
                    label="Technology"
                  />
                  <FormControlLabel
                    value="healthcare"
                    control={
                      <Radio
                        color="primary"
                        checked={selectedCategory === "healthcare"}
                        style={{
                          color:
                            selectedCategory === "healthcare" ? "#ff6e14" : "",
                        }}
                      />
                    }
                    label="Healthcare"
                  />
                  <FormControlLabel
                    value="marketing"
                    control={
                      <Radio
                        color="primary"
                        checked={selectedCategory === "marketing"}
                        style={{
                          color:
                            selectedCategory === "marketing" ? "#ff6e14" : "",
                        }}
                      />
                    }
                    label="Marketing"
                  />
                  <FormControlLabel
                    value="fashion"
                    control={
                      <Radio
                        color="primary"
                        checked={selectedCategory === "fashion"}
                        style={{
                          color:
                            selectedCategory === "fashion" ? "#ff6e14" : "",
                        }}
                      />
                    }
                    label="Fashion"
                  />
                  <FormControlLabel
                    value="manufacturing"
                    control={
                      <Radio
                        color="primary"
                        checked={selectedCategory === "manufacturing"}
                        style={{
                          color:
                            selectedCategory === "manufacturing"
                              ? "#ff6e14"
                              : "",
                        }}
                      />
                    }
                    label="Manufacturing"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Card>
        </Grid>

        {/* left */}
        <Card
          item
          xs={8}
          style={{
            background: "white",
            margin: "3rem 3rem",
            borderRadius: "10px",
            boxShadow: "1px 1px 1px white",
            marginTop: "5.6rem",
            height: "calc(100vh - 5.6rem)",
            border: "0.01px solid lightgrey",
            position: "sticky",
            top: "5.6rem",
            overflow: "auto",
          }}
          className="card"
        >
          <div
           className="scroll"
          >
            {authState.jobposts.map((jobpost, index) => (
              <Card
                key={index}
                className="main"
                style={{ marginBottom: "1rem" }}
              >
                <Box display="flex" alignItems="center">
                  <div
                    style={{
                      display: "flex",
                      textAlign: "left",
                      paddingTop: "0px",
                      marginRight: "10px",
                    }}
                  >
                    <Avatar
                      src="/public/signupmain.jpeg"
                      style={{ width: 80, height: 80 }}
                    />
                  </div>
                  <Box flexGrow={1}>
                    <Typography variant="h5" textAlign="left" color="#0d65c2">
                      {jobpost.jobTitle}
                    </Typography>
                    <Typography textAlign="left" variant="body1">
                      {authState.orgName}
                    </Typography>
                    <Typography textAlign="left" variant="body2" color="grey">
                      {jobpost.location}, {jobpost.hiringProcess},{" "}
                      {jobpost.jobType}
                    </Typography>
                    <Typography textAlign="left" variant="body2" color="grey">
                      Qualifications: {jobpost.qualification}
                    </Typography>
                    <Typography textAlign="left" variant="body2" color="grey">
                      Salary: {jobpost.salaryMin} - {jobpost.salaryMax}
                    </Typography>
                    <Typography textAlign="left" variant="body2" color="grey">
                      Created at: {jobpost.createdAt}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", gap: "10px", paddingLeft: "50px" }}
                  >
                    <IconButton style={{ color: "#ff6e14" }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      style={{ backgroundColor: "white", color: "red" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            ))}
          </div>
        </Card>
      </Grid>
    </>
  );
}

export default Jobs;
