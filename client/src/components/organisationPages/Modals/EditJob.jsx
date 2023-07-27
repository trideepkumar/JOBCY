import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosinstance";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

const EditJobModal = ({ show, onClose, jobId }) => {
  const [jobIdState, setJobIdState] = useState("");
  const [job, setJob] = useState({
    jobDescription: "",
    jobTitle: "",
    jobType: "",
    location: "",
    qualification: "",
    salaryMax: "",
    salaryMin: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("new Job", job);
    try {
      const endpoint = `/organisation/updateJob`;
      const response = await axiosInstance.patch(endpoint, {
        jobId: jobIdState,
        job: job,
      });

      console.log("Response",response.data)
      if(response.status===200){
        //give toast
      }

      

      onClose();
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const fetchJob = async (jobId) => {
    try {
      const endpoint = "/organisation/getJob";
      const response = await axiosInstance.get(endpoint, {
        params: { jobId: jobId },
      });
      setJob(response.data);
      setJobIdState(jobId);
    } catch (error) {
      console.error("Error fetching job:", error);
    }
  };

  useEffect(() => {
    fetchJob(jobId);
  }, [jobId]);

  return (
    <Modal open={show} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "0.5px solid #ff6e14",
          boxShadow: 24,
          borderRadius: "5px",
          p: 4,
        }}
      >
        <Typography variant="h6" fontFamily="fantasy" marginBottom="5px">
          Edit Job Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "grid", gridGap: "1rem" }}>
          <Box sx={{ display: "grid", gridGap: "1rem" }}>
            <TextField
              label="Job Title"
              variant="outlined"
              fullWidth
              value={job.jobTitle}
              onChange={(e) => setJob({ ...job, jobTitle: e.target.value })}
            />
            <TextField
              label="Job Description"
              variant="outlined"
              fullWidth
              value={job.jobDescription}
              onChange={(e) =>
                setJob({ ...job, jobDescription: e.target.value })
              }
            />
            <TextField
              label="Job Type"
              variant="outlined"
              fullWidth
              value={job.jobType}
              onChange={(e) => setJob({ ...job, jobType: e.target.value })}
            />
            <TextField
              label="Location"
              variant="outlined"
              fullWidth
              value={job.location}
              onChange={(e) => setJob({ ...job, location: e.target.value })}
            />
            <TextField
              label="Qualification"
              variant="outlined"
              fullWidth
              value={job.qualification}
              onChange={(e) =>
                setJob({ ...job, qualification: e.target.value })
              }
            />
            <TextField
              label="Salary Max"
              variant="outlined"
              fullWidth
              value={job.salaryMax}
              onChange={(e) => setJob({ ...job, salaryMax: e.target.value })}
            />
            <TextField
              label="Salary Min"
              variant="outlined"
              fullWidth
              value={job.salaryMin}
              onChange={(e) => setJob({ ...job, salaryMin: e.target.value })}
            />
          </Box>

          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                color: "black",
                background: "white",
                border: "0.5px solid #ff6e14",
                "&:hover": {
                  color: "#ff6e14",
                  background: "white",
                  border: "0.5px solid #ff6e14",
                },
              }}
            >
              Save Changes
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditJobModal;
