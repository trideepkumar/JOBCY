import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosinstance';
import { useSelector } from 'react-redux';
import { Card, Typography, CardContent, Box, Button, Avatar } from '@mui/material';

function Jobapplied() {
  const authState = useSelector((state) => {
    return state.auth.authState;
  });

  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const endpoint = '/getUserjob';
      const response = await axiosInstance.get(endpoint, {
        params: {
          userId: authState._id,
        },
      });
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <Typography textAlign={'left'} fontFamily={'fantasy'}>
        Jobs Applied
      </Typography>
      {jobs.map((job) => (
        <Card
          key={job._id} // Use job._id as the key attribute
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            p: 2,
            height: '3rem',
            paddingLeft: '0px',
            width: '65vw',
            marginBottom: '10px',
          }}
        >
          <CardContent>
            <Box>
              <Typography variant="h6" fontWeight="bold" textAlign={'left'} fontFamily={'fantasy'}>
                {job.jobTitle}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" fontFamily={'fantasy'} fontWeight="bold" textAlign={'left'}>
                {job.orgName}
              </Typography>
            </Box>
          </CardContent>
          <Box sx={{ mt: 2, ml: 10, gap: '3rem' }}>
            <Button variant="outlined" sx={{ ml: 1, color: 'light blue', background: 'white', border: '0.0px solid white' }}>
              View Details
            </Button>
          </Box>
        </Card>
      ))}
    </div>
  );
}

export default Jobapplied;
