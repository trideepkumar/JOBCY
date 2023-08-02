import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosinstance";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {  Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";



const Signup = ({ signupType }) => {
  
  const clientId = process.env.REACT_APP_CLIENT_ID
  const onSuccess = (res) => {
    axiosInstance
      .post("/auth/google", { token: res.tokenId })
      .then((res) => {
        if (res.data?.success) {
        }
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  };
  const onFailure = (res) => {
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [organizationFormData, setorganisationFormData] = useState({
    orgName: "",
    email: "",
    category: "",
    place: "",
    numberOfEmployees: "",
    registrationNumber: "",
    password: "",
    confirmPassword: "",
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: "#ff6e14",
      },
    },
  });

  const [errors, setErrors] = useState({});
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [respons, setResponse] = useState("");

  const handleCheckboxChange = (event) => {
    setIsCheckboxChecked(event.target.checked);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (signupType === "user") {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    } else if (signupType === "organisation") {
      setorganisationFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    // Validate the field
    const validationErrors = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name],
    }));
  };

  const validateField = (name, value) => {
    const validationErrors = {};

    switch (name) {
      case "name":
        if (!value.trim()) {
          validationErrors.name = " name is required";
        } else if (value.trim().length < 3) {
          validationErrors.name = "enter a valid name";
        }
        break;
      case "orgName":
        if (!value.trim()) {
          validationErrors.orgName = "organisation name is required";
        } else if (value.trim().length < 4) {
          validationErrors.orgName = "enter a valid organisation name";
        }
        break;
      case "email":
        if (!value.trim()) {
          validationErrors.email = "Email is required";
        } else {
          const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
          if (!emailRegex.test(value)) {
            validationErrors.email = "Invalid email format";
          }
        }
        break;
      case "category":
        if (!value.trim()) {
          validationErrors.category = "category is required";
        } else if (value.trim().length < 4) {
          validationErrors.category = "enter a valid category";
        }
        break;
      case "place":
        if (!value.trim()) {
          validationErrors.place = "place is required";
        } else if (value.trim().length < 3) {
          validationErrors.place = "enter a valid place";
        }
        break;
      case "numberOfEmployees":
        if (!value.trim()) {
          validationErrors.numberOfEmployees =
            "numberofEmployees number is required";
        }
        break;
      case "registrationNumber":
        if (!value.trim()) {
          validationErrors.registrationNumber =
            "registration number is required";
        } else if (value.trim().length < 4) {
          validationErrors.registrationNumber =
            "enter a valid registration number";
        }
        break;
      case "password":
        if (!value.trim()) {
          validationErrors.password = "Password is required";
        } else if (value.trim().length < 6) {
          validationErrors.password = "Password must be at least 6 characters";
        }
        break;
        case "confirmPassword":
          if (signupType === "user" && value !== formData.password) {
            validationErrors.confirmPassword = "Passwords do not match";
          } else if (signupType === "organisation" && value !== organizationFormData.password) {
            validationErrors.confirmPassword = "Passwords do not match";
          }
          break;
      default:
        break;
    }
    
    return validationErrors;
  };

  const validateFormData = (formData) => {
    const validationErrors = {};

    for (const field in formData) {
      const value = formData[field];
      const fieldErrors = validateField(field, value);
      if (Object.keys(fieldErrors).length > 0) {
        validationErrors[field] = fieldErrors[field];
      }
    }
    setErrors(validationErrors);
    return validationErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let validationErrors = {};
    if (signupType === "organisation") {
      validationErrors = validateFormData(organizationFormData);
    } else if (signupType === "user") {
      validationErrors = validateFormData(formData);
    }


    if (Object.keys(validationErrors).length === 0) {
      try {
        let endpoint = "";
        let data;

        if (signupType === "organisation") {
          endpoint = "/organisation/signup";
          data = organizationFormData;
        } else if (signupType === "user") {
          endpoint = "/signup";
          data = formData;
        }

        const response = await axiosInstance.post(endpoint, data);
        if (response.data?.success) {
          setIsModalOpen(true);
          setIsCheckboxChecked(false);

          // Clear the form based on signupType
          if (signupType === "organisation") {
            setorganisationFormData({
              orgName: "",
              email: "",
              category: "",
              place: "",
              registrationNumber: "",
              password: "",
              confirmPassword: "",
              numberOfEmployees: "",
            });
          } else if (signupType === "user") {
            setFormData({
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            });
          }
        } else {
          setResponse(response?.data?.message);
        }
      } catch (error) {
        console.error("Error registering:", error.response.data.message);
        setErrors({ email: error.response.data.message });
      }
    }
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        {signupType === "user" && (
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
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography component="h1" variant="h5">
                    Sign up
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
                      id="name"
                      label="Name"
                      name="name"
                      autoComplete="name"
                      autoFocus
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                    />
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
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={handleChange}
                      error={!!errors.password}
                      helperText={errors.password}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmPassword"
                      autoComplete="new-password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="agree"
                          color="primary"
                          checked={isCheckboxChecked}
                          onChange={handleCheckboxChange}
                          disabled={
                            !!errors.name ||
                            !!errors.email ||
                            !!errors.password ||
                            !!errors.confirmPassword ||
                            !formData.name.trim() ||
                            !formData.email.trim() ||
                            !formData.password.trim() ||
                            !formData.confirmPassword.trim()
                          }
                        />
                      }
                      label="I agree to the terms and conditions"
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
                      sx={{ mt: 3, mb: 1, bgcolor: "#ff6e14" }}
                      disabled={!isCheckboxChecked}
                    >
                      Sign Up
                    </Button>
                    <Typography sx={{ my: 1, textAlign: "center" }}>
                      OR
                    </Typography>

                    {/* <div id="signInButton"  > */}
                    <GoogleLogin
                      clientId={clientId}
                      buttonText="SignUp with Google"
                      onSuccess={onSuccess}
                      onFailure={onFailure}
                      cookiePolicy={"single_host_origin"}
                      isSignedIn={true}
                      style={{ width: "100%" }}
                      sx={{ mt: 3, mb: 1, bgcolor: "#ff6e14" }}
                      className="custom-google-login"
                    />
                    {/* </div> */}
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Grid container justifyContent="flex-end">
                          <Grid
                            item
                            xs={12}
                            sx={{
                              textAlign: "center",
                              paddingRight: { xs: "45px" },
                            }}
                          >
                            <Typography variant="body2">
                              <Link href="/login">
                                Already have an account? Sign in
                              </Link>
                            </Typography>
                          </Grid>
                        </Grid>
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
                <Box sx={{ m: 4 }}>
                  <img
                    src={process.env.PUBLIC_URL + "/loginmain1.jpeg"}
                    alt=""
                    style={{ maxWidth: "100%" }}
                  />
                </Box>
              </Grid>
            </Grid>

            <Modal open={isModalOpen} onClose={handleModalClose}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: isMobile ? "90%" : "auto",
                  maxWidth: 400,
                  bgcolor: "background.paper",
                  border: "none",
                  boxShadow: 24,
                  p: 4,
                  mx: isMobile ? "auto" : 0,
                }}
              >
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                  Sign Up Successful!
                </Typography>
                <Typography variant="body1">
                  Congratulations! You have successfully signed up.
                </Typography>
                <Typography variant="body1">
                  A verification link is sent to your email. Please verify to
                  login.
                </Typography>
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: "text.secondary",
                  }}
                  onClick={handleModalClose}
                >
                  <CloseIcon />
                </IconButton>

                {/* Modal content */}
              </Box>
            </Modal>
          </>
        )}

        {signupType === "organisation" && (
          <>
            <Grid
              container
              component="main"
              sx={{
                height: "100vh",
                backgroundImage: `url(${process.env.PUBLIC_URL}/)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <CssBaseline />
              <Grid
                item
                xs={false}
                md={6}
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ m: 4 }}>
                  <img
                    src={process.env.PUBLIC_URL + "/organisationsignup.jpeg"}
                    alt=""
                    style={{ maxWidth: "100%" }}
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
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography component="h1" variant="h5">
                    Sign up
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                  >
                    {/* User Signup Fields */}
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="orgName"
                          label="Organization Name"
                          name="orgName"
                          autoComplete="organization-name"
                          value={organizationFormData.orgName}
                          onChange={handleChange}
                          error={!!errors.orgName}
                          helperText={errors.orgName}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          value={organizationFormData.email}
                          onChange={handleChange}
                          error={!!errors.email}
                          helperText={errors.email}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="new-password"
                          value={organizationFormData.password}
                          onChange={handleChange}
                          error={!!errors.password}
                          helperText={errors.password}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="confirmPassword"
                          label="Confirm Password"
                          type="password"
                          id="confirmPassword"
                          autoComplete="new-password"
                          value={organizationFormData.confirmPassword}
                          onChange={handleChange}
                          error={!!errors.confirmPassword}
                          helperText={errors.confirmPassword}
                        />
                      </Grid>

                      {/* Organization Signup Fields */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="category"
                          label="Category"
                          name="category"
                          autoComplete="category"
                          value={organizationFormData.category}
                          onChange={handleChange}
                          error={!!errors.category}
                          helperText={errors.category}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="place"
                          label="Place"
                          name="place"
                          autoComplete="place"
                          value={organizationFormData.place}
                          onChange={handleChange}
                          error={!!errors.place}
                          helperText={errors.place}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="registrationNumber"
                          label="Registration Number"
                          name="registrationNumber"
                          autoComplete="registration-number"
                          value={organizationFormData.registrationNumber}
                          onChange={handleChange}
                          error={!!errors.registrationNumber}
                          helperText={errors.registrationNumber}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="numberOfEmployees"
                          label="Number of Employees"
                          name="numberOfEmployees"
                          autoComplete="number-of-employees"
                          value={organizationFormData.numberOfEmployees}
                          onChange={handleChange}
                          error={!!errors.numberOfEmployees}
                          helperText={errors.numberOfEmployees}
                        />
                      </Grid>
                    </Grid>

                    <FormControlLabel
                      control={
                        <Checkbox
                          value="agree"
                          color="primary"
                          checked={isCheckboxChecked}
                          onChange={handleCheckboxChange}
                        />
                      }
                      label="I agree to the terms and conditions"
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
                      sx={{ mt: 3, mb: 1, bgcolor: "#ff6e14" }}
                      disabled={!isCheckboxChecked}
                    >
                      Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Grid container justifyContent="flex-end">
                          <Grid
                            item
                            xs={12}
                            sx={{
                              textAlign: "center",
                              paddingRight: { xs: "45px" },
                            }}
                          >
                            <Typography variant="body2">
                              <Link href="/organisation/login" variant="body2">
                                Already have an account? Sign in
                              </Link>
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            </Grid>

            <Modal open={isModalOpen} onClose={handleModalClose}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: isMobile ? "90%" : "auto",
                  maxWidth: 400,
                  bgcolor: "background.paper",
                  border: "none",
                  boxShadow: 24,
                  p: 4,
                  mx: isMobile ? "auto" : 0,
                }}
              >
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                  Sign Up Successful!
                </Typography>
                <Typography variant="body1">
                  Congratulations! You have successfully signed up.
                </Typography>
                <Typography variant="body1">
                  A verification link is sent to your email. Please verify to
                  login.
                </Typography>
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: "text.secondary",
                  }}
                  onClick={handleModalClose}
                >
                  <CloseIcon />
                </IconButton>

                {/* Modal content */}
              </Box>
            </Modal>
          </>
        )}
      </ThemeProvider>
    </>
  );
};

export default Signup;
