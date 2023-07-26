import React, { useEffect, useState, lazy, Suspense } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  Avatar,
  Typography,
  Button,
  Divider,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  Stack,
  Link,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import axiosInstance from "../../../api/axiosinstance";
import "./Userjob.css";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Appbar from "../../Appbar/Appbar";

function Userjob() {
  const authState = useSelector((state) => {
    return state.auth.authState;
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const [jobPosts, setJobPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [chipFilter,setChipFilter] = useState("")

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/jobs");
      const jobs = response.data.jobs || [];
      console.log(jobs);

      const hasApplied = jobs
        .flatMap((job) => job.appliedCandidates)
        .some((candidate) => candidate[0] === authState._id);

      console.log(hasApplied);
      console.log("again");
      if (selectedCategory) {
        setJobPosts(jobs.filter((job) => job.category === selectedCategory));
      } else {
        setJobPosts(jobs);
      }
      setAppliedJobs({ id: authState._id, isApplied: hasApplied });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChipClick = (category) => {
    setSearchQuery(category);
    setChipFilter(category); 
  };

  const handleApply = async (jobId) => {
    console.log("job applied", jobId);
    const userId = authState._id;
    console.log(userId);
    const endpoint = `/applyjob/${jobId}`;
    console.log(endpoint);

    try {
      const response = await axiosInstance.post(endpoint, {
        userId: userId,
        jobId: jobId,
      });
      console.log(response);
      if (response.status === 200) {
        console.log("done");
        toast.success("Job Applied successfully", {
          className: "  ",
          bodyClassName: "toast-body",
          progressClassName: "toast-progress",
        });
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  useEffect(() => {
    console.log("jobposts");
    console.log(appliedJobs);
  });

  return (
    <>
      <Appbar />
      <ToastContainer />
      <Grid container spacing={5}>
        {/* left */}

        <Grid item lg={3} sm={12} xs={12} >
          <Box className="new-search">
            <Card
              style={{
                background: "white",
                margin: "5.4rem 0rem 0rem 2rem",
                borderRadius: "5px",
                boxShadow: "1px 1px 2px white",
                marginTop: "3.4rem",
                width: "20rem",
                border: "0.01px solid lightgrey",
                top: "2rem",
                position: "fixed",
              }}
              className="car search-card"
            >
              <Box sx={{ p: 2 }} className="searc">
                <Typography variant="body2" component="div" textAlign="left">
                  Search
                </Typography>
                <Divider sx={{ my: 2 }} />
                <TextField
                  label="Search your jobs here..."
                  variant="outlined"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  fullWidth
                />
              </Box>
            </Card>
          </Box>

          {/* categories */}
          <Card
            style={{
              background: "white",
              margin: "4rem 5rem 3rem 2rem",
              borderRadius: "5px",
              boxShadow: "1px 1px 2px white",
              marginTop: "14rem",
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

              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <FormControlLabel
                    value=""
                    control={<Radio color="primary" />}
                    label="All"
                  />
                  <FormControlLabel
                    value="Construction"
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

        {/* center */}
        <Grid
          item
          lg={6}
          sm={12}
          xs={12}
          spacing={4}
          sx={{ marginTop: "5.5rem" }}
          className="suggestions"
        >
          <Card
            className="center-card"
            style={{ position: "fixed", width: "45.4rem" }}
          >
            <CardContent sx={{ display: "grid", textAlign: "left" }}>
              <Typography> Suggested job searches</Typography>
              <br></br>
              <Stack direction="row" spacing={1} className="suggestion-icon">
              <Chip
                label="All"
                variant="outlined"
                className="chip"
                onClick={() => handleChipClick("")}
              />
              <Chip
                label="React Developer"
                variant="outlined"
                className="chip"
                onClick={() => handleChipClick("React Developer")}
              />
              <Chip
                label="Fullstack Developer"
                variant="outlined"
                className="chip"
                onClick={() => handleChipClick("Fullstack Developer")}
              />
              <Chip
                label="Software Engineer"
                variant="outlined"
                className="chip"
                onClick={() => handleChipClick("Software Engineer")}
              />
              <Chip
                label="Intern"
                variant="outlined"
                className="chip"
                onClick={() => handleChipClick("Intern")}
              />
              <Chip
                label="HR Recruiter"
                variant="outlined"
                className="chip"
                onClick={() => handleChipClick("HR Recruiter")}
              />
              </Stack>
            </CardContent>
          </Card>

          {/* posts card */}

          <Suspense fallback={<div>Loading...</div>}>
            <Grid item xs={12} sm={12} md={6}>
              <Box
                sx={{
                  justifyContent: "space-between",
                  // alignItems: "center",
                  height: "570px",
                  marginTop: "8rem",
                  overflowY: "auto",
                  border: "0.1px solid grey",
                  position: "fixed",
                }}
                className="posts"
              >
                {jobPosts.length === 0 ||
                jobPosts.filter((jobpost) =>
                  jobpost.jobTitle
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                ).length === 0 ? (
                  <Card
                    className="main"
                    style={{
                      border: "0.1px solid grey",
                    }}
                  >
                    <CardContent>
                      <Typography sx={{ color: "grey" }}>
                        No job posts available.
                      </Typography>
                    </CardContent>
                  </Card>
                ) : (
                  jobPosts
                    .filter((jobpost) =>
                      jobpost.jobTitle
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((jobpost) => (
                      <Grid>
                        <Card
                          className="main"
                          style={{
                            width: "85%",
                            border: "0.01px solid #ECEEF1",
                            height: "10%",
                            paddingTop: "20px",
                            paddingLeft: "35px",
                            paddingBottom:"1px",
                            
                          }}
                          key={jobpost._id}
                        >
                          <Box display="flex" alignItems="center">
                            <div
                              style={{
                                display: "flex",
                                textAlign: "left",
                                // marginRight: "10px",
                              }}
                            >
                              <Avatar
                                src="/public/signupmain.jpeg"
                                style={{
                                  width: 40,
                                  height: 40,
                                  marginBottom: "6rem",
                                }}
                              />
                            </div>
                            <Box flexGrow={1} sx={{}}>
                              <Typography
                                variant="h5"
                                textAlign="left"
                                color="#0d65c2"
                              >
                                {jobpost.jobTitle}
                              </Typography>
                              <Typography textAlign="left" variant="body1">
                                {jobpost.orgName}
                              </Typography>
                              <Typography
                                textAlign="left"
                                variant="body2"
                                color="grey"
                              >
                                {`${jobpost.location}, ${jobpost.hiringProcess}, ${jobpost.jobType}`}
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
                                Salary: {jobpost.salaryMin} -{" "}
                                {jobpost.salaryMax}
                              </Typography>
                              <Typography
                                textAlign="left"
                                variant="body2"
                                color="grey"
                              >
                                {new Date(jobpost.createdAt).toLocaleString()}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                gap: "10px",
                                // paddingLeft: "100px",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: "10px",
                                  // paddingLeft: "100px",
                                }}
                              >
                                <Button
                                  sx={{
                                    textTransform: "none",
                                    border: "0.1px solid grey",
                                  }}
                                  className="details"
                                >
                                  Details
                                </Button>
                                {jobpost.appliedCandidates.includes(
                                  authState._id
                                ) ? (
                                  <Button
                                    sx={{
                                      textTransform: "none",
                                      border: "0.1px solid grey",
                                    }}
                                    className="applied-button"
                                    disabled
                                  >
                                    Applied
                                    {/* <Send
                                      sx={{
                                        transform: "rotate(310deg)",
                                        fontSize: "small",
                                        marginLeft: "4px",
                                      }}
                                    /> */}
                                  </Button>
                                ) : (
                                  <Button
                                    sx={{
                                      background: "#ff6e14",
                                      color: "white",
                                      textTransform: "none",
                                      border: "0.1px solid grey",
                                    }}
                                    className="apply"
                                    onClick={() => handleApply(jobpost._id)}
                                  >
                                    Apply
                                    <Send
                                      sx={{
                                        transform: "rotate(310deg)",
                                        fontSize: "small",
                                        marginLeft: "4px",
                                      }}
                                    />
                                  </Button>
                                )}
                              </Box>
                            </Box>
                          </Box>
                        </Card>
                      </Grid>
                    ))
                )}
              </Box>
            </Grid>
          </Suspense>
        </Grid>

        {/* right */}
        <Grid item lg={3} sx={{ marginTop: "5.6rem" }}>
          <Card className="right-card">
            <CardContent sx={{ textAlign: "left" }}>
              <Typography
                variant="body1"
                style={{ fontSize: "1.2rem", color: "#ff6e14" }}
              >
                Job seeker guidance
              </Typography>
              <Typography variant="body2" style={{ marginBottom: "1rem" }}>
                Explore our curated guide of expert-led courses, such as how to
                improve your resume and grow your network, to help you land your
                next opportunity.
              </Typography>
              <Link href="/profile">Do you want to improve your resume?</Link>{" "}
            </CardContent>
          </Card>

          <Card
            className="right-card-bottom"
            style={{ position: "fixed", top: "35rem", paddingLeft: "25px" }}
          >
            <CardContent style={{ color: "grey" }}>
              <Typography gutterBottom variant="h5" component="div">
                JOBCY
              </Typography>
              <Typography variant="body2" component="div">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                      <li>About</li>
                      <li>Accessibility</li>
                      <li>Help Center</li>
                    </ul>
                  </div>
                  <div>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                      <li>Privacy &amp; Terms</li>
                      <li>Ad Choices</li>
                      <li>Advertising</li>
                    </ul>
                  </div>
                </div>
              </Typography>
              <Typography variant="body2" style={{ fontSize: "0.7rem" }}>
                JOCY Corporation © 2023
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
      </Grid>
    </>
  );
}

export default Userjob;
