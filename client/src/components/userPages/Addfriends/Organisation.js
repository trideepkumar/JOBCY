import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosinstance';
import { useSelector } from 'react-redux';
import { Card, Typography, CardContent, Box, Button, Avatar } from '@mui/material';

function Organisations() {
  const authState = useSelector((state) => {
    return state.auth.authState;
  });

  const [organisation, setOrganisation] = useState([]);

  const fetchOrg = async () => {
    const endpoint = '/connectedOrg';
    const response = await axiosInstance.get(endpoint, {
      params: {
        userId: authState._id,
      },
    });
    setOrganisation(response.data.orgFollowing);
  };

  useEffect(() => {
    fetchOrg();
  }, []);

  return (
    <>
      <Typography textAlign={'left'} fontFamily={'fantasy'}>
        Connected Organizations...
      </Typography>
      {organisation.map((org) => (
        <Card
          key={org._id}
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
          <Avatar
            src={org.profPic}
            alt="Org Avatar"
            style={{ padding: '10px', objectFit: 'cover', borderRadius: '50%', width: '3rem', height: '3rem' }}
          />
          <CardContent sx={{alignItems:'left'}}>
            <Box>
              <Typography variant="h6" fontWeight="bold" textAlign={'left'} fontFamily={'fantasy'}>
                {org.orgName
}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" fontFamily={'fantasy'} fontWeight="bold" textAlign={'left'}>
                {org.category}
              </Typography>
              total employees:{org.numberOfEmployees}
            </Box>
          </CardContent>
          <Box sx={{ mt: 2, ml: 10, gap: '3rem' }}>
            {/* Add any buttons or actions related to organizations here */}
          </Box>
          <Button>
            view Profile
          </Button>
        </Card>
      ))}
    </>
  );
}

export default Organisations;
