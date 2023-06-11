import React, { useState } from "react";
import axiosInstance from "../api/axiosinstance";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../app/features/auth/authSlice";

const Login = ({ loginType }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);
  const [respons, setResponse] = useState("");
  const dispatch = useDispatch();

  const validateFormData = (formData) => {
    const validationErrors = {};

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(formData.email)) {
        validationErrors.email = "Invalid email format";
      }
    }

    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (formData.password.trim().length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    return validationErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    const validationErrors = validateFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name],
    }));

    const isFormValid = Object.keys(validationErrors).length === 0;
    setIsFormValid(isFormValid);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const validationErrors = validateFormData(formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        let loginEndpoint = "";
        let redirectRoute = "";
        
        if (loginType === "organisation") {
          loginEndpoint = "/organisation/login"; 
          redirectRoute = "/organisation/dashboard"; 
        } 
        if(loginType === "user") {
          loginEndpoint = "/login"; 
          redirectRoute = "/posts"; 
        }
  
        const response = await axiosInstance.post(loginEndpoint, formData);
  
        if (response.data?.success) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          dispatch(setAuth());
          navigate(redirectRoute) 
        } else {
          setResponse(response?.data?.message);
          setErrors({ message: response?.data?.message });
        }
      } catch (error) {
        console.error("Error logging in:", error.response.data.message);
        setErrors({ message: "An error occurred during login" });
        setResponse(error.response?.data?.message);
      }
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
      {loginType === "user" && (
        <>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  my: 8,
                  mx: 6,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "0.1px solid #ff6e14",
                  borderRadius: "8px",
                  padding: "16px",
                }}
              >
                <Typography component="h1" variant="h5">
                  Login
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
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
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                  />
                  {respons && !respons?.data?.success && (
                    <Typography
                      sx={{
                        my: 1,
                        textAlign: "center",
                        color: "red",
                        fontFamily: "Courier New, monospace",
                      }}
                    >
                      {respons}
                    </Typography>
                  )}

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, bgcolor: "#ff6e14" }}
                    disabled={!isFormValid}
                  >
                    Login
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="/forgot-password" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/signup" variant="body2">
                        Don't have an account? Sign Up
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    m: 4,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={process.env.PUBLIC_URL + "/signupmain.jpeg"}
                    alt=""
                    style={{
                      width: "500%",
                      height: "auto",
                      maxWidth: "500%",
                      margin: "4px",
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
   
      {loginType === "organisation" && (
        <>
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />
            <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    m: 4,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={process.env.PUBLIC_URL + "/organisationlogin.jpeg"}
                    alt=""
                    style={{
                      width: "500%",
                      height: "auto",
                      maxWidth: "500%",
                      margin: "4px",
                    }}
                  />
                </Box>
              </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  my: 8,
                  mx: 6,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "0.1px solid #ff6e14",
                  borderRadius: "8px",
                  padding: "16px",
                }}
              >
                <Typography component="h1" variant="h5">
                  Organisation Log
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
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
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                  />
                  {respons && !respons?.data?.success && (
                    <Typography
                      sx={{
                        my: 1,
                        textAlign: "center",
                        color: "red",
                        fontFamily: "Courier New, monospace",
                      }}
                    >
                      {respons}
                    </Typography>
                  )}

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, bgcolor: "#ff6e14" }}
                    disabled={!isFormValid}
                  >
                    Organisation Login
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="/forgot-password" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/organisation/signup" variant="body2">
                        Don't have an account? Sign Up
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              
            </Grid>
          </Grid>
        </>
      )}
    </ThemeProvider>
  );
};

export default Login;
