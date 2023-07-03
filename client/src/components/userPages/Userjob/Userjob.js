import React, { useEffect, useState } from "react";
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
// import Toast from "../Toasts/Toasts";
import Appbar from "../../Appbar/Appbar";

function Userjob() {
  const authState = useSelector((state) => {
    return state.auth.authState;
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const [jobPosts, setJobPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [Toasts, setToasts] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState([]);

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
      if (response.data.success) {
        console.log("done");
        setToasts(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/jobs");
        const jobs = response.data.jobs || [];
        console.log(jobs);

        const hasApplied = jobs
          .flatMap((job) => job.appliedCandidates)
          .some((candidate) => candidate[0] === authState._id);

        console.log(hasApplied);

        setJobPosts(jobs);
        setAppliedJobs({ [authState._id]: hasApplied });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("jobposts");
    console.log(jobPosts);
  });

  return (
    <>
      <Appbar />
      <Grid container spacing={5}>
        {/* left */}
        <Grid item lg={3}>
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
            className="card"
          >
            <Box sx={{ p: 2 }}>
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

        {/* center */}
        <Grid item lg={6} spacing={4} sx={{ marginTop: "5.5rem" }}>
          <Card
            className="center-card"
            style={{ position: "fixed", width: "43.8rem" }}
          >
            <CardContent sx={{ display: "grid", textAlign: "left" }}>
              <Typography> Suggested job searches</Typography>
              <br></br>
              <Stack direction="row" spacing={1}>
                <Chip label="Technology" variant="outlined" className="chip" />
                <Chip
                  label="Fullstack Developer"
                  variant="outlined"
                  className="chip"
                />
                <Chip
                  label="Full time jobs"
                  variant="outlined"
                  className="chip"
                />
                <Chip label="Student" variant="outlined" className="chip" />
                <Chip label="Technology" variant="outlined" className="chip" />
              </Stack>
            </CardContent>
          </Card>

          {/* posts card */}

          <Box
            sx={{
              justifyContent: "space-between",
              // alignItems: "center",
              width: "48.5%",
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
              jobpost.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
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
                  <Card
                    className="main"
                    style={{
                      width: "84.5%",
                      border: "0.01px solid smokegrey",
                      height: "12%",
                      paddingTop: "20px",
                      paddingLeft: "35px",
                    }}
                    key={jobpost._id}
                  >
                    <Box display="flex" alignItems="center">
                      <div
                        style={{
                          display: "flex",
                          textAlign: "left",
                          marginRight: "10px",
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
                          Salary: {jobpost.salaryMin} - {jobpost.salaryMax}
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
                          {appliedJobs[jobpost._id] ? (
                            <Button
                              sx={{
                                background: "#ff6e14",
                                color: "white",
                                textTransform: "none",
                                border: "0.1px solid grey",
                              }}
                              className="apply"
                              disabled
                            >
                              Applied
                              <Send
                                sx={{
                                  transform: "rotate(310deg)",
                                  fontSize: "small",
                                  marginLeft: "4px",
                                }}
                              />
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
                ))
            )}
          </Box>
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
            <CardContent style={{ color: "#ff6e14" }}>
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
