import React, { useState } from "react";
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
import { SvgIcon } from "@mui/material";

const GoogleIcon = (props) => (
  <SvgIcon {...props}>{/* Google Icon SVG Paths */}</SvgIcon>
);

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsCheckboxChecked(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = {};
    if (!formData.name.trim()) {
      validationErrors.name = "Name is required";
    }
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
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(validationErrors).length === 0) {
      console.log(formData);
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
                  />
                }
                label="I agree to the terms and conditions"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1, bgcolor: "#ff6e14" }}
                disabled={!isCheckboxChecked}
              >
                Sign Up
              </Button>
              <Typography sx={{ my: 1, textAlign: "center" }}>OR</Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2, bgcolor: "#ff6e14" }}
              >
                <GoogleIcon sx={{ marginRight: "0.5em", color: "blue" }} />
                Sign Up with Google
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Grid container justifyContent="flex-end">
                    <Grid
                      item
                      xs={12}
                      sx={{ textAlign: "center", paddingRight: { xs: "45px" } }}
                    >
                      <Typography variant="body2">
                        <Link href="#" variant="body2">
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
    </ThemeProvider>
  );
};

export default Signup;
