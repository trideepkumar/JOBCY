import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import axiosInstance from "../../../api/axiosinstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function SentMail({ onClose }) {
  const authState = useSelector((state) => state.organisationauth.authState);
  const { userId } = useParams();
  const cleanedUserId = userId.replace(":", "");

  const navigate = useNavigate()
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const orgEmail = authState.email;
    const data = {
      subject: subject,
      body: body,
      email: orgEmail,
      userId: cleanedUserId,
    };

    try {
      setLoading(true); // Show loading state
      const response = await axiosInstance.post(
        "/organisation/sentEmail",
        data
      );
      setLoading(false); // Hide loading state
      if (response.status === 200) {
        toast.success("Email sent successfully!", { autoClose: 3000 });
        handleClose();
      } else {
        toast.error("Error sending email!", { autoClose: 3000 });
      }
    } catch (error) {
      setLoading(false);  
      toast.error("Error sending email!", { autoClose: 3000 });
    }
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/organisation/jobs')
  };

  return (
    <Modal
      open={true}
      onClose={handleClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box sx={{ width: 700, p: 4, bgcolor: "white", height: "80vh" }}>
        <ToastContainer />
        <Typography variant="h5" gutterBottom color={"#ff6e14"}>
          Compose Email
        </Typography>
        <TextField
          label="Subject"
          fullWidth
          variant="outlined"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          sx={{ mb: 2, border: "0.5px solid #ff6e14", borderRadius: "5px" }}
        />
        <ReactQuill
          value={body}
          onChange={(value) => setBody(value)}
          modules={{
            toolbar: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link"],
              ["clean"],
            ],
          }}
          formats={[
            "header",
            "bold",
            "italic",
            "underline",
            "strike",
            "list",
            "bullet",
            "link",
          ]}
          style={{
            height: "420px",
            marginBottom: "10px",
            borderRadius: "5px",
            marginBottom: "5rem",
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "1rem",
          }}
        >
          <Button
            onClick={handleClose}
            color="secondary"
            sx={{ mr: 2, border: "0.5px solid red", color: "red" }}
          >
            Cancel
          </Button>
          {loading ? (
            <Button
              variant="contained"
              sx={{
                background: "white",
                color: "green",
                border: "0.5px solid green",
              }}
            >
              sending mail...
            </Button>
          ) : (
            <Button
              onClick={handleSend}
              variant="contained"
              sx={{ background: "#ff6e14" }}
            >
              send
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
}

export default SentMail;
