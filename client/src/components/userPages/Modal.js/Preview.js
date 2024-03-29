import { Button, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../api/axiosinstance";
import { Document } from "react-pdf";

function Preview() {
  const authState = useSelector((state) => {
    return state.auth.authState;
  });

  const [open, setOpen] = useState(false);
  const [resumeData, setResumeData] = useState(null);

  const handleOpen = async () => {
    try {
      const endpoint = `/resume/${authState._id}`;
      const response = await axiosInstance(endpoint);
      setResumeData(response.data);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching resume:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
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
          marginLeft: "21rem",
          marginTop: "3rem",
        }}
        open={open}
        onClose={handleClose}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100rem",
            height:"50rem"
          }}
        >
          {resumeData && (
            
            <object width="100%" height="80%" data={resumeData} type="application/pdf">   </object>

          )}
        </div>
      </Modal>
    </>
  );
}

export default Preview;
