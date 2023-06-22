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

function Userjob() {
  const [jobPosts, setJobPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/jobs");
        const jobs = response.data.jobs || [];
        console.log(jobs);

        setJobPosts(jobs);
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
              alignItems: "center",
              width: "100%",
              height: "615px",
              overflowY: "auto",
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
                  marginBottom: "0.2rem",
                  width: "94%",
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
                    style={{  width: "94%" }}
                    key={jobpost._id}
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
                          style={{
                            width: 40,
                            height: 40,
                            marginBottom: "6rem",
                          }}
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
                          paddingLeft: "50px",
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
                        <Button
                          sx={{
                            background: "#ff6e14",
                            color: "white",
                            textTransform: "none",
                            border: "0.1px solid grey",
                          }}
                          className="apply"
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
