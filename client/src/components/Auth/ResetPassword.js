import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Appbar from "../Appbar/Appbar";
import axiosInstance from "../../api/axiosinstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const { token } = useParams();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match. Please re-enter.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    const endpoint = `/reset-password/${token}`;
    try {
      const response = await axiosInstance.post(endpoint, formData);
      console.log(response);
      if (response.status === 200) {
        toast.success("Password reset successful. You can now log in with your new password.");
        setTimeout(()=>{
            navigate("/login");
        },5000)
      } else {
        toast.error("An error occurred while resetting the password.");
      }
    } catch (error) {
      toast.error("An error occurred while resetting the password.");
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#ff6e14",
      },
    },
  });

  useEffect(() => {
    console.log("reset-password");
  }, []);

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
          width: "18rem",
        }}
      >
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="New Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "#ff6e14", color: "white" }}
            onClick={handleSubmit}
          >
            Reset Password
          </Button>
        </Box>
      </Box>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default ResetPassword;
