import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = {};
    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(formData.email)) {
        validationErrors.email = 'Invalid email format';
      }
    }
    if (!formData.password.trim()) {
      validationErrors.password = 'Password is required';
    } else if (formData.password.trim().length < 6) {
      validationErrors.password = 'Password must be at least 6 characters';
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
        main: '#ff6e14',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 6,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '0.1px solid #ff6e14', 
              borderRadius: '8px',
              padding: '16px',
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1, bgcolor: '#ff6e14' }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Grid container justifyContent="flex-end">
                    <Grid item xs={12} sx={{ paddingRight: { xs: '50px' } }}>
                      <Typography variant="body2">
                        <Link href="#" variant="body2">
                          Are You a New User ? SignUp
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ m: 4 }}>
            <img
              src={process.env.PUBLIC_URL + '/loginmain1.jpeg'}
              alt=""
              style={{ maxWidth: '100%' }}
            />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
