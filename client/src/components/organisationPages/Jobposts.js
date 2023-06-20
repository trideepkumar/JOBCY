import React, { useState } from "react";
import "./Jobposts.css";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Grid,
  Box,
  Typography,
} from "@mui/material";

const Jobposts = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [qualification, setQualification] = useState("");
  const [location, setLocation] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [hiringProcess, setHiringProcess] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleJobTypeChange = (event) => {
    setJobType(event.target.value);
  };

  const handleQualificationChange = (event) => {
    setQualification(event.target.value);
  };

  const handleHiringProcessChange = (event) => {
    setHiringProcess(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(
      jobTitle,
      jobType,
      qualification,
      location,
      salaryMax,
      salaryMin,
      jobDescription,
      hiringProcess
    );
    // Here you can perform form submission logic
    // You can access the form data from the component's state variables
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh", width: "100vw" }}
    >
      <Box sx={{ display: "grid" }}>
        <Box>
          <Typography
            variant="h5"
            sx={{
              color: "#ff6e14",
              marginBottom: "5px",
              borderRadius: "10px",
              textAlign: "left",
            }}
          >
            Post Your Job Here...
          </Typography>
        </Box>
        <Box className="mainbox" xs={12}>
          <form onSubmit={handleSubmit}>
            <Box style={{ display: "flex", marginBottom: "1rem" }}>
              <TextField
                label="Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
                fullWidth
              />
              <FormControl
                fullWidth
                style={{ marginLeft: "1rem", textAlign: "left" }}
              >
                <InputLabel>Job Type</InputLabel>
                <Select value={jobType} onChange={handleJobTypeChange} required>
                  <MenuItem value="fulltime">Full-time</MenuItem>
                  <MenuItem value="part-time">Part-time</MenuItem>
                  <MenuItem value="internship">Internship</MenuItem>
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              style={{
                display: "flex",
                marginBottom: "1rem",
                textAlign: "left",
              }}
            >
              <FormControl fullWidth>
                <InputLabel>Qualification</InputLabel>
                <Select
                  value={qualification}
                  onChange={handleQualificationChange}
                  required
                >
                  <MenuItem value="secondary">Secondary</MenuItem>
                  <MenuItem value="highersecondary">Higher Secondary</MenuItem>
                  <MenuItem value="ba">B A</MenuItem>
                  <MenuItem value="bsc">B Sc</MenuItem>
                  <MenuItem value="btech">B Tech</MenuItem>
                  <MenuItem value="ma">M A</MenuItem>
                  <MenuItem value="msc">M Sc</MenuItem>
                  <MenuItem value="mcom">M Com</MenuItem>
                  <MenuItem value="mcom">M tech</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                fullWidth
                style={{ marginLeft: "1rem" }}
              />
            </Box>
            <div style={{ display: "flex", marginBottom: "1rem" }}>
              <TextField
                label="Salary Min"
                value={salaryMin}
                onChange={(e) => setSalaryMin(e.target.value)}
                type="number"
                required
                fullWidth
              />
              <TextField
                label="Salary Max"
                value={salaryMax}
                onChange={(e) => setSalaryMax(e.target.value)}
                type="number"
                required
                fullWidth
                style={{ marginLeft: "1rem" }}
              />
            </div>
            <FormControl component="fieldset">
              <FormGroup sx={{}}>
                <Box display="flex">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringProcess === "face-face"}
                        onChange={handleHiringProcessChange}
                        value="face-face"
                        sx={{
                          color:
                            hiringProcess === "face-face"
                              ? "#ff6e14"
                              : "inherit",
                          "&.Mui-checked": {
                            color: "#ff6e14",
                          },
                        }}
                      />
                    }
                    label="Face to Face"
                    sx={{ marginRight: "16px" }} // Adjust the margin as needed
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringProcess === "telephonic"}
                        onChange={handleHiringProcessChange}
                        value="telephonic"
                        sx={{
                          color:
                            hiringProcess === "telephonic"
                              ? "#ff6e14"
                              : "inherit",
                          "&.Mui-checked": {
                            color: "#ff6e14",
                          },
                        }}
                      />
                    }
                    label="Telephonic"
                  />
                </Box>
                <Box display="flex">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringProcess === "walk-in"}
                        onChange={handleHiringProcessChange}
                        value="walk-in"
                        sx={{
                          color:
                            hiringProcess === "walk-in"
                              ? "#ff6e14"
                              : "inherit",
                          "&.Mui-checked": {
                            color: "#ff6e14",
                          },
                        }}
                      />
                    }
                    label="Walk-in"
                    sx={{ marginRight: "55px" }} // Adjust the margin as needed
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringProcess === "written-test"}
                        onChange={handleHiringProcessChange}
                        value="written-test"
                        sx={{
                          color:
                            hiringProcess === "written-test"
                              ? "#ff6e14"
                              : "inherit",
                          "&.Mui-checked": {
                            color: "#ff6e14",
                          },
                        }}
                      />
                    }
                    label="Written Test"
                  />
                </Box>
                <Box display="flex">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={hiringProcess === "groupdiscussion"}
                        onChange={handleHiringProcessChange}
                        value="groupdiscussion"
                        sx={{
                          color:
                            hiringProcess === "groupdiscussion"
                              ? "#ff6e14"
                              : "inherit",
                          "&.Mui-checked": {
                            color: "#ff6e14",
                          },
                        }}
                      />
                    }
                    label="Group Discussion"
                  />
                </Box>
              </FormGroup>
            </FormControl>

            <TextField
              label="Job Description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              multiline
              rows={4}
              fullWidth
              style={{ marginBottom: "1rem" }}
            />
            <Button
              type="submit"
              className="btn"
              variant="contained"
              sx={{ background: "#ff6e14", width: "100%" }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </Grid>
  );
};

export default Jobposts;
