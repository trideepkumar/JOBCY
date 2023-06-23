import { Button, Modal } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../api/axiosinstance";

function Preview() {
  const authState = useSelector((state) => {
    return state.auth.authState;
  });

  const [open, setOpen] = useState(false); // State to control the modal
  const [resumeData, setResumeData] = useState(null); // State to store the resume data

  const handleOpen = async () => {
    try {
      const endpoint = `/resume/${authState._id}`;
      const response = await axiosInstance(endpoint);
      console.log(response.data);
      setResumeData(response.data);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching resume:", error);
    }
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
  };

  return (
    <>
      <Button
        size="small"
        sx={{
          width: "92%",
          border: "0.1px solid grey",
          background: "#ff6e14",
          color: "white",
        }}
        onClick={handleOpen}
      >
        Preview Resume
      </Button>

      {/* Modal to display the resume */}
      <Modal
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "50vw",
          maxHeight: "90vh",
        //   border:'1px solid black',
          marginLeft:'21rem',
          marginTop:'3rem'
        }}
        open={open}
        onClose={handleClose}
      >
        <div
          style={{
           
            maxWidth: "100%",
            maxHeight: "90%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width:'36rem',
            
          }}
        >
          {resumeData && (
            <img
              src={resumeData}
              alt="Resume"
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </div>
      </Modal>
    </>
  );
}

export default Preview;
