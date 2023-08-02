import React, { useEffect, useState } from "react";
import { Card, Typography, Modal, CardContent, Box, Button, Avatar } from "@mui/material";
import axiosInstance from "../../../api/axiosinstance";
import { useNavigate } from "react-router";



function Appliedjobs({ show, onClose, jobId }) {

  const navigate = useNavigate()
  const [candidateList, setCandidateList] = useState([]);


  const fetchAppliedCandidates = async () => {
    try {
      const response = await axiosInstance.get("organisation/getAppliedcandidates", {
        params: {
          jobId: jobId,
        },
      });

      const list = response.data;
      setCandidateList(list);
    } catch (err) {
      console.log(err);
    }
  };

  const handleIdClick = async (userId) => {
    navigate(`/organisation/profile/${userId}`)
  }

  const handleSentEmail = async(userId)=>{
    navigate(`/organisation/sentEmail/:${userId}`)
  }

  useEffect(() => {
    fetchAppliedCandidates();
  }, [jobId]);

  return (
    <Modal
      open={show}
      onClose={onClose}
      sx={{
        width: "90%",
        height: "100%",
        mt: "4rem",
        border: "0.5 solid grey",
        overflow:"auto  "
      }}
    >
      {candidateList.length > 0 ? (
        <>
          {candidateList.map((candidate, index) => (
            <Card
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                p: 2,
                height: "5rem",
                paddingLeft: "0px",
                marginLeft: "20rem",
                width: "60vw",
                marginBottom: "10px",
              }}
            >
              <Avatar
                src={candidate.profPic}
                alt="User Avatar"
                style={{ width:'5rem',height:'5rem',padding:'10px' ,objectFit: "cover" }}
              />
              <CardContent>
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    {candidate.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" fontWeight="bold">
                    {candidate.designation}
                  </Typography>
                </Box>
              </CardContent>
              <Box sx={{ mt: 2, ml: 10, gap: "3rem" }}>
                <Button
                  variant="outlined"
                  sx={{
                    ml: 1,
                    color: "red",
                    background: "white",
                    border: "0.1px solid red",
                  }}
                  onClick={()=>{handleIdClick(candidate._id)}}
                >
                  view profile
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    ml: 1,
                    color: "green",
                    background: "white",
                    border: "0.1px solid green",
                  }}
                  onClick={()=>handleSentEmail(candidate._id)}
                >
                  Sent Email
                </Button>
              </Box>
            </Card>
          ))}
        </>
      ) : (
        <Typography
          variant="h5"
          align="center"
          mt={"20%"}
          ml={"30%"}
          width={"50%"}
          height={"20%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          border={"0.5px solid #f6e14"}
          sx={{ background: "white" }}
        >
          No candidates have applied Yet...
        </Typography>
      )}
    </Modal>

    
  );
}

export default Appliedjobs;
