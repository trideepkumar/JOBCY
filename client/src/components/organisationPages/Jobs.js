import React, { useEffect } from "react";
import {
  Box,
  Card,
  Grid,
  Typography,
  TextField,
  Divider,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Avatar,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Placeholder from "./placeholders/Placeholder";
import { useSelector } from "react-redux";
import axiosInstance from "../../api/axiosinstance";

function Jobs() {
  const authState = useSelector((state) => {
    return state.organisationauth.authState;
  });

  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [jobs, setJobs] = React.useState([]);
  const [searchInput, setSearchInput] = React.useState("");

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      let endpoint = `/organisation/jobs/${authState.orgName}`;
      const response = await axiosInstance.get(endpoint);
      const fetchedJobs = response.data;
      setJobs(fetchedJobs);
    };
    fetchJobs();
  }, [authState.orgName]);

  const filteredJobs = jobs.filter((jobpost) =>
    jobpost.jobTitle.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(() => {
    console.log(filteredJobs);
  }, [filteredJobs]);

  return (
    <>
      <Grid container spacing={0.5}>
        {/* left */}
        <Grid item lg={3} style={{ display: "grid" }}>
          <Card
            style={{
              background: "white",
              margin: "4.1rem 4rem 4rem 4rem",
              borderRadius: "5px",
              boxShadow: "1px 1px 2px white",
              marginTop: "3.4rem",
              width: "20rem",
              border: "0.01px solid lightgrey",
              top: "2rem",
              position: "fixed",
            }}
            className="card"
          >
            <Box sx={{ p: 2 }}>
              <Typography variant="body2" component="div" textAlign="left">
                Search Jobs
              </Typography>
              <Divider sx={{ my: 2 }} />
              <TextField
                label="Search jobs here..."
                variant="outlined"
                fullWidth
                value={searchInput}
                onChange={handleSearchInputChange}
              />
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

              <TextField
                style={{
                  width: "95%",
                  borderRadius: "3px",
                }}
                variant="outlined"
                placeholder="Search categories here..."
              />

              <Divider sx={{ my: 2 }} />

              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <FormControlLabel
                    value="construction"
                    control={<Radio color="primary" />}
                    label="Construction"
                  />
                  <FormControlLabel
                    value="Technology"
                    control={<Radio color="primary" />}
                    label="Technology"
                  />
                  <FormControlLabel
                    value="Health Sector"
                    control={<Radio color="primary" />}
                    label="Health Sector"
                  />
                  <FormControlLabel
                    value="Arts & crafts"
                    control={<Radio color="primary" />}
                    label="Arts & crafts"
                  />
                  <FormControlLabel
                    value="Mechanical Fields"
                    control={<Radio color="primary" />}
                    label="Mechanical Fields"
                  />
                  <FormControlLabel
                    value="Manufacturing"
                    control={<Radio color="primary" />}
                    label="Manufacturing"
                  />
                  <FormControlLabel
                    value="Industrial"
                    control={<Radio color="primary" />}
                    label="Industrial"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Card>
        </Grid>

        {/* right */}
        <Card
          item
          xs={6}
          style={{
            background: "white",
            margin: "3rem 3rem",
            borderRadius: "10px",
            boxShadow: "1px 1px 1px white",
            marginLeft: "28rem",
            height: "calc(100vh - 5.6rem)",
            border: "0.01px solid lightgrey",
            position: "fixed",
            top: "2.4rem",
            overflow: "auto",
            width: "60%",
            padding: "1rem 1rem 1rem 1rem",
          }}
          className="right-card"
        >
          <div className="scroll">
            {filteredJobs.length === 0 ? (
              <Card className="main" style={{ marginBottom: "1rem" }}>
                <Box sx={{ p: 2 }}>
                  <Placeholder />
                  <Typography variant="body1" style={{ color: "grey" }}>
                    No job posts available.
                  </Typography>
                </Box>
              </Card>
            ) : (
              filteredJobs.map((jobpost, index) => (
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
                      <Typography
                        variant="h5"
                        textAlign="left"
                        color="#0d65c2"
                      >
                        {jobpost.jobTitle}
                      </Typography>
                      <Typography textAlign="left" variant="body1">
                        {authState.orgName}
                      </Typography>
                      <Typography
                        textAlign="left"
                        variant="body2"
                        color="grey"
                      >
                        {jobpost.location}, {jobpost.hiringProcess},{" "}
                        {jobpost.jobType}
                      </Typography>
                      <Typography
                        textAlign="left"
                        variant="body2"
                        color="grey"
                      >
                        Qualifications: {jobpost.qualification}
                      </Typography>
                      <Typography
                        textAlign="left"
                        variant="body2"
                        color="grey"
                      >
                        Salary: {jobpost.salaryMin} - {jobpost.salaryMax}
                      </Typography>
                      <Typography
                        textAlign="left"
                        variant="body2"
                        color="grey"
                      >
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
              ))
            )}
          </div>
        </Card>
      </Grid>
    </>
  );
}

export default Jobs;