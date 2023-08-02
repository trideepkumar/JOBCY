import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import axiosInstance from "../../../api/axiosinstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function JobCard() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const response = await axiosInstance.get("/admin/getJobs");
      setJobs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBlock = async (jobId) => {
    const response = await axiosInstance.patch("/admin/blockJob", { jobId });
    fetchJobs();
    toast.success("Job blocked successfully", {
      className: "toast-success",
      bodyClassName: "toast-body",
      progressClassName: "toast-progress",
    });
  };

  const handleUnblock = async (jobId) => {
    const response = await axiosInstance.patch("/admin/unblockJob", { jobId });
    fetchJobs();
    toast.success("Job Recovered successfully");
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      {jobs.map((job) => (
        <Box
          key={job._id}
          sx={{
            width: "60rem",
            overflow: { xs: "auto", sm: "initial" },
        
          }}
        >
          <ToastContainer />
          <Card
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              p: 3,
              height: "6rem",
              paddingLeft: "0px",
              marginLeft: "20rem",  
              width: "60vw",
              borderRadius:'10px',
              border:'0.01px solid grey'
            }}
            className="orgCard"
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold">
                {job.jobTitle}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                fontWeight="bold"
              >
                Organisation: {job.orgName}
              </Typography>
            </CardContent>

            <Box sx={{ display: "flex", marginLeft: "auto", gap: "3rem" }}>
              <Box>
                <Typography variant="body2" fontWeight="bold">
                  Total applicants
                </Typography>
                <Typography variant="body1">{job.totalApplicants}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" fontWeight="bold" color="red">
                  Total Reports
                </Typography>
                <Typography variant="body1" color="red">
                  {job.totalReports}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 2, ml: 10, gap: "3rem" }}>
              {job.isDeleted ? (
                <Button
                  variant="outlined"
                  sx={{
                    ml: 1,
                    color: "green",
                    background: "white",
                    border: "0.1px solid green",
                  }}
                  onClick={() => {
                    handleUnblock(job._id);
                  }}
                >
                  Recover
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  sx={{
                    ml: 1,
                    color: "red",
                    background: "white",
                    border: "0.1px solid red",
                  }}
                  onClick={() => {
                    handleBlock(job._id);
                  }}
                >
                  Delete
                </Button>
              )}
            </Box>
          </Card>
        </Box>
      ))}
    </div>
  );
}

export default JobCard;
