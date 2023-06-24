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
} from "@mui/material";
import { Send } from "@mui/icons-material";
import axiosInstance from "../../../api/axiosinstance";
import "./Userjob.css";
import { useSelector } from "react-redux";
import Toast from "../Toasts/Toasts";

function Userjob() {
  
  const authState = useSelector((state) => {
    return state.auth.authState;
  });

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
          .some((candidate) => candidate[0] === authState._id)

        console.log(hasApplied);

        setJobPosts(jobs);
        setAppliedJobs(hasApplied);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
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
        </Grid>

        {/* center */}
        <Grid item lg={6} spacing={4} sx={{ marginTop: "5.5rem" }}>
          <Card className="center-card">
            <CardContent sx={{ display: "flex" }}>search templates</CardContent>
          </Card>

          {/* posts card */}

          <Box
            sx={{
              justifyContent: "space-between",
              // alignItems: "center",
              width: "100%",
              height: "615px",
              overflowY: "auto",
              border: "0.1px solid grey",
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
                          {appliedJobs ? (
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
        <Grid item lg={3} sx={{ marginTop: "3.3rem" }}>
          <Card className="right-card">
            <CardContent></CardContent>
          </Card>
          <Card
            className="right-card-bottom"
            style={{ position: "sticky", top: "5rem" }}
          >
            <CardMedia
              sx={{ height: 140 }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            />
            <CardContent
              style={{ color: "#ff6e14", border: "0.1px solid grey" }}
            ></CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Userjob;
