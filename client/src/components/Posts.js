import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { clearAuth } from "../app/features/auth/authSlice";
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@material-ui/core';



function Posts() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const authState = useSelector((state) => {
    return state.auth
  })

  console.log(authState);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("authorization.user");
    dispatch(clearAuth())
    navigate("/login");
  }



  return (
    <div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </div>
  );
}

export default Posts;
