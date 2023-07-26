import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Appbar from "../Appbar/Appbar";
import axiosInstance from "../../api/axiosinstance";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const endpoint = "/forgot-password";
    try {
      const response = await axiosInstance.post(endpoint, formData);
      if (response.status === 200) {
        toast.success("Verification link sent to your email. Reset password through that.");
      } else {
        toast.error("An error occurred while sending the verification link.");
      }
    } catch (error) {
      toast.error("An error occurred while sending the verification link.");
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#ff6e14",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Appbar />
      <Box
        sx={{
          my: 18,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: "0.1px solid #ff6e14",
          borderRadius: "8px",
          padding: "16px",
          width: "15rem",
        }}
      >
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "#ff6e14", color: "white" }}
            onClick={handleSubmit}
          >
            Send Reset Link
          </Button>
          <Link to="/login">Back to Login</Link>
        </Box>
      </Box>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default ForgotPassword;
