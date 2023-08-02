import { Button, CardActions } from "@mui/material";
import React, { useState } from "react";
import axiosInstance from "../../../api/axiosinstance";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ResumeModal.css";

function ResumeModal() {
  const authState = useSelector((state) => {
    return state.auth.authState;
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadConfirmed, setUploadConfirmed] = useState(false);

  const notify = () =>
    toast("Resume added successfully", {
      progressClassName: "custom-progress",
      progressStyle: {
        background: "#ff6e14",
      },
    });

  const handleResume = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        const response = await axiosInstance.patch(
          `updateresume/${authState._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.success) {
          notify();
          setUploadConfirmed(true);
        }
      } catch (error) {
        console.error("Resume upload failed:", error);
      }
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setUploadConfirmed(false);
  };

  return (
    <div>
      <CardActions sx={{ justifyContent: "center" }}>
        {!selectedFile && !uploadConfirmed && (
          <label htmlFor="resume-upload" style={{ width: "100%" }}>
            <Button
              size="small"
              sx={{
                width: "100%",
                border: "0.1px solid grey",
                background: "#ff6e14",
                color: "white",
              }}
              className="resume"
              component="span"
            >
              Upload resume
            </Button>
            <input
              id="resume-upload"
              type="file"
              style={{ display: "none" }}
              onChange={handleResume}
              name="image"
              accept="application/pdf"
            />
          </label>
        )}
        {selectedFile && !uploadConfirmed && (
          <Button
            size="small"
            variant="contained"
            color="primary"
            disabled={!selectedFile}
            onClick={handleUpload}
            sx={{
              width: "100%",
              border: "0.1px solid grey",
              background: "#ff6e14",
              color: "white",
            }}
          >
            Confirm Upload
          </Button>
        )}
        {uploadConfirmed && (
          <Button
            size="small"
            sx={{
              width: "100%",
              border: "0.1px solid grey",
              background: "#ff6e14",
              color: "white",
              marginBottom:'10px'
            }}
            onClick={handleReset}
          >
            Upload resume
          </Button>
        )}
        <ToastContainer style={{marginTop:'39rem'}} /> 
      </CardActions>

    </div>
  );
}

export default ResumeModal;