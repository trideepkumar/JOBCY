import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from '@mui/material/styles/styled';
import Appbar from '../../Appbar/Appbar'
import { useNavigate } from 'react-router';
import './landing.css'



const Container = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#F2F2ED',
  fontFamily:'fantasy'
});

const Heading = styled(Typography)({
  marginBottom: '1rem',
  color: '#333',
  fontFamily:'fantasy'
});

const Description = styled(Typography)({
  maxWidth: '600px',
  marginBottom: '2rem',
  textAlign: 'center',
  color: '#555',
  fontFamily:'fantasy'
});

const CTAButton = styled(Button)({
  padding: '12px 30px',
  borderRadius: '30px',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  width: '30%',
  fontFamily: 'fantasy',
  border: '0.5px solid #ff6e14',
  color: 'black',
  background: 'linear-gradient(90deg, white,#ff6e14, #ff9f42,white)', // Linear gradient
  '&:hover': {
    backgroundColor: '#e85a0b',
  },
});

function Landing() {
  const navigate = useNavigate()

  return (
    <>
    <Appbar/>
    <Container>
      <Heading variant="h3" component="h1"  className="fadeInAnimation">
        Welcome to Our <span>Jobcy</span> Job Portal
      </Heading>
      <Description variant="body1" className="fadeInAnimation">
        Find your dream job and boost your career with our job portal. Discover a wide range of job opportunities from top companies.
      </Description>
      <CTAButton variant="contained"  onClick={()=>navigate('/login')} className="fadeInAnimationBtn">Get Started</CTAButton>
    </Container>
    </>
  );
}

export default Landing;
