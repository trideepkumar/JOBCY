import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { clearAuth } from "../../../app/features/auth/authSlice";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Avatar,
  CardActionArea,
  Divider
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import MovieIcon from "@mui/icons-material/Movie";
import ArticleIcon from "@mui/icons-material/Article";
import { IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SendIcon from "@mui/icons-material/Share";
import ReportIcon from "@mui/icons-material/Report";

import "./Posts.css";

function Posts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => {
    return state.auth;
  });

  console.log(authState);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("authorization.user");
    dispatch(clearAuth());
    navigate("/login");
  };

  return (
    <>
      <div style={{ marginBottom: "40px" }}>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <Grid container spacing={5}>


        <Grid item lg={3}>
          <Card
            className="left-card"
            style={{ position: "sticky", top: "3rem" }}
          >
             <div style={{ display: "flex", justifyContent: "center" ,paddingTop:'20px' , backgroundImage: `url(${process.env.PUBLIC_URL}/backgroundllinkedin.jpg)`, backgroundSize: 'cover'}}>
            <Avatar src="/public/signupmain.jpeg"  style={{ width: 80, height: 80 }}/>
            </div>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                User Name
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                Description
              </Typography>
              <Divider style={{ marginTop: "1rem" }} />

              <Typography variant="body2" style={{textAlign:'justify'}}>
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica...
              </Typography>
              <Divider style={{ marginTop: "1rem" }} />
            </CardContent>
            <Divider style={{ marginTop: "1rem" }} />

            <CardActions  style={{ display: "flex", justifyContent: "center" ,alignItems:'center'}}>
              <Button size="small" style={{ border: "0.5px solid black" ,marginTop:'10px',width:'100%',color:'#ff6e14'}} > Edit Profile</Button>
              <Button size="small" style={{ border: "0.5px solid black",marginTop:'10px',width:'100%',color:'#ff6e14' }}> Connections</Button>
            </CardActions>
            <Divider style={{ marginTop: "1rem" }} />

          </Card>
        </Grid>


        <Grid item lg={6} spacing={2}>
          <Card className="center-card">
            <CardContent sx={{ display: "flex"}}>
              <Avatar sx={{ marginRight: "7px" }} />
              <Button
                sx={{ width: "90%" }}
                variant="outlined"
                size="small"
                className="text-field"
              >
                Post your thoughts...
              </Button>
            </CardContent>
            <CardActions
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              <Button size="small" className="post-icon">
                <IconButton size="small" style={{color:'green'}}  >
                  <ImageIcon />
                </IconButton>
                Image
              </Button>
              <Button size="small" className="post-icon">
                <IconButton size="small" color="primary">
                  <MovieIcon />
                </IconButton>
                Video
              </Button>
              <Button size="small" className="post-icon">
                <IconButton size="small" style={{color:'red'}} >
                  <ArticleIcon />
                </IconButton>
                Article
              </Button>
            </CardActions>
          </Card>

          {/* posts card */}
          <Box
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
            className="posts"
          >
            <Box
              key="item._id"
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "0.5rem",
                marginTop: "0.3rem",
                paddingLeft: "0.5rem",
                paddingRight: "0.2rem",
              }}
            >
              <Avatar
                src="/public/signupmain.jpeg"
                sx={{ marginRight: "10px" }}
              />
              <Box sx={{ marginRight: "1rem" }}>
                <Typography sx={{ textAlign: "left" }} variant="body1">
                  Username
                </Typography>
                <Typography variant="body2">Designation</Typography>
              </Box>
            </Box>
            <Box className="Post-image">
              <Card sx={{ maxWidth: 700 }} className="Post-card">
                <CardActionArea>
                  <Typography
                    variant="body2"
                    className="post-text"
                    align="left"
                    style={{ paddingBottom: "10px" }}
                  >
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica....
                  </Typography>
                  <CardMedia
                    component="img"
                    height="400"
                    src={process.env.PUBLIC_URL + "/postsimge.jpeg"}
                    alt="Posts image"
                  />
                </CardActionArea>
              </Card>
            </Box>
            <CardActions>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  paddingLeft: "15px",
                  paddingRight: "15px",
                }}
              >
                <Typography style={{ color: "grey" }}>
                  <IconButton size="small">
                    <ThumbUpIcon />
                  </IconButton>{" "}
                  Like
                </Typography>
                <Typography style={{ color: "grey" }}>
                  <IconButton size="small">
                    <SendIcon />
                  </IconButton>{" "}
                  Sent
                </Typography>
                <Typography style={{ color: "grey" }}>
                  <IconButton size="small">
                    <ReportIcon />
                  </IconButton>{" "}
                  Report
                </Typography>
              </Box>
            </CardActions>
          </Box>

          <Box
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
            className="posts"
          >
            <Box
              key="item._id"
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "0.5rem",
                marginTop: "0.3rem",
                paddingLeft: "0.5rem",
                paddingRight: "0.2rem",
              }}
            >
              <Avatar src="/public/signupmain.jpeg" />
              <Box sx={{ marginRight: "1rem" }}>
                <Typography sx={{ textAlign: "left" }}>Username</Typography>
                <Typography>Designationdddddfffgghhhh</Typography>
              </Box>
            </Box>
            <Box className="Post-image">
              <Card sx={{ maxWidth: 700 }} className="Post-card">
                <CardActionArea>
                  <Typography
                    variant="body2"
                    className="post-text"
                    align="left"
                    style={{ paddingBottom: "10px" }}
                  >
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica....
                  </Typography>
                  <CardMedia
                    component="img"
                    height="400"
                    src={process.env.PUBLIC_URL + "/postsimge.jpeg"}
                    alt="Posts image"
                  />
                </CardActionArea>
              </Card>
            </Box>
            <CardActions>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  paddingLeft: "15px",
                  paddingRight: "15px",
                }}
              >
                <Typography style={{ color: "grey" }}>
                  <IconButton size="small">
                    <ThumbUpIcon />
                  </IconButton>{" "}
                  Like
                </Typography>
                <Typography style={{ color: "grey" }}>
                  <IconButton size="small">
                    <SendIcon />
                  </IconButton>{" "}
                  Sent
                </Typography>
                <Typography style={{ color: "grey" }}>
                  <IconButton size="small">
                    <ReportIcon />
                  </IconButton>{" "}
                  Report
                </Typography>
              </Box>
            </CardActions>
          </Box>

          <Box
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
            className="posts"
          >
            <Box
              key="item._id"
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "0.5rem",
                marginTop: "0.3rem",
                paddingLeft: "0.5rem",
                paddingRight: "0.2rem",
              }}
            >
              <Avatar src="/public/signupmain.jpeg" />
              <Box sx={{ marginRight: "1rem" }}>
                <Typography sx={{ textAlign: "left" }}>Username</Typography>
                <Typography>Designationdddddfffgghhhh</Typography>
              </Box>
            </Box>
            <Box className="Post-image">
              <Card sx={{ maxWidth: 700 }} className="Post-card">
                <CardActionArea>
                  <Typography
                    variant="body2"
                    className="post-text"
                    align="left"
                    style={{ paddingBottom: "10px" }}
                  >
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica....
                  </Typography>
                  <CardMedia
                    component="img"
                    height="400"
                    src={process.env.PUBLIC_URL + "/postsimge.jpeg"}
                    alt="Posts image"
                  />
                </CardActionArea>
              </Card>
            </Box>
            <CardActions>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  paddingLeft: "15px",
                  paddingRight: "15px",
                }}
              >
                <Typography style={{ color: "grey" }}>
                  <IconButton size="small">
                    <ThumbUpIcon />
                  </IconButton>{" "}
                  Like
                </Typography>
                <Typography style={{ color: "grey" }}>
                  <IconButton size="small">
                    <SendIcon />
                  </IconButton>{" "}
                  Sent
                </Typography>
                <Typography style={{ color: "grey" }}>
                  <IconButton size="small">
                    <ReportIcon />
                  </IconButton>{" "}
                  Report
                </Typography>
              </Box>
            </CardActions>
          </Box>
        </Grid>


        <Grid item lg={3}>
          <Card className="right-card">
            <CardMedia
              sx={{ height: 140 }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
          <Card
            className="right-card-bottom"
            style={{ position: "sticky", top: "5rem" }}
          >
            <CardMedia
              sx={{ height: 140 }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            />
            <CardContent style={{color:'#ff6e14'}}>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          
          </Card>
        </Grid>


      </Grid>
    </>
  );
}

export default Posts;
