import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../api/axiosinstance';
import { useSelector } from 'react-redux';
import { Card, Typography, CardContent, Box, Button, Avatar } from '@mui/material';
import { useNavigate } from 'react-router';


function Connection() {
  const authState = useSelector((state) => {
    return state.auth.authState;
  });

  const navigate = useNavigate()
  const [friends, setFriends] = useState([]);

  const fetchFriends = async () => {
    const endpoint = '/friends';
    const response = await axiosInstance.get(endpoint, {
      params: {
        _id: authState._id,
      },
    });
    setFriends(response.data.friends);
  };

  const handleIdClick = async (friendId) => {
    console.log(friendId)
    navigate(`/profile/${friendId}`)
  }

  useEffect(() => {
    fetchFriends();
  }, []);

 
 

  return (
    <>
      <Typography textAlign={"left"} fontFamily={"fantasy"}>Connected peoples</Typography>
      {friends.map((friend) => (
        <Card
          key={friend._id} // Use friend._id as the key attribute
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
            src={friend.profPic}
            alt="User Avatar"
            style={{ padding: '10px', objectFit: 'cover'}}
          />
          <CardContent>
            <Box>
              <Typography variant="h6" fontWeight="bold" textAlign={'left'}  fontFamily={'fantasy'}>
                {friend.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary"  fontFamily={'fantasy'} fontWeight="bold" textAlign={'left'}>
                {friend.designation}
              </Typography>
            </Box>
          </CardContent>
          <Box sx={{ mt: 2, ml: 10, gap: '3rem' }}>
            <Button
              variant="outlined"
              sx={{
                ml: 1,
                color: 'light blue',
                background: 'white',
                border: '0.0px solid white',
              }}
              onClick={() => {
                handleIdClick(friend._id);
              }}
            >
              View Profile
            </Button>
          
          </Box>
        </Card>
      ))}
    </>
  );
}

export default Connection;
