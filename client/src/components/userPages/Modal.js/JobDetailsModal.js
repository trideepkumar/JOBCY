import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar
} from "@mui/material";
import axiosInstance from '../../../api/axiosinstance'

function JobDetailsModal({ jobId, handleClose }) {

  const [jobDetails ,setJobDetails] = useState("")

  const fetchJob = async(jobId)=>{
   try{
     const endpoint = '/getJobDetails'
     const response = await axiosInstance.get(endpoint,{params:{
        jobId:jobId
     }})
     setJobDetails(response.data)

   }catch(err){
    console.log(err)
   }
  }

  useEffect(()=>{
     fetchJob(jobId)
  },[jobId])

  return (
    <Dialog open={true} onClose={handleClose} fullWidth maxWidth="sm" sx={{border:'0.5px solid #ff6e14'}}>
    <DialogTitle sx={{color:"#ff6e14",fontFamily:'fantasy'}}>Job Details</DialogTitle>
    <DialogContent>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar
          src="/path/to/organization/avatar" 
          alt={jobDetails.orgName}
          style={{ marginRight: "10px" }}
        />
        <div>
          <h2>{jobDetails.jobTitle}</h2>
          <p>
            Organization: {jobDetails.orgName}
          </p>
        </div>
      </div>
      <p>Location: {jobDetails.location}</p>
      <p>Job Type: {jobDetails.jobType}</p>
      <p>Hiring Process: {jobDetails.hiringProcess}</p>
      <p>Qualification: {jobDetails.qualification}</p>
      <p>Salary: {jobDetails.salaryMin} - {jobDetails.salaryMax}</p>
      <p>Description: {jobDetails.jobDescription}</p>
      {/* Add other job details as needed */}
    </DialogContent>

  </Dialog>
  );
}

export default JobDetailsModal;
