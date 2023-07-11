import React, { useEffect, useState ,useRef} from "react";
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
  Divider,
} from "@mui/material";
import Appbar from "../../Appbar/Appbar";
import ImageIcon from "@mui/icons-material/Image";
import MovieIcon from "@mui/icons-material/Movie";
import ArticleIcon from "@mui/icons-material/Article";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Share";
import ReportIcon from "@mui/icons-material/Report";
import Post from "../Modal.js/PostsModal";
import "./Posts.css";
import axiosInstance from "../../../api/axiosinstance";
import PostLikeButton from "../Button/PostLikeButton";
// import placeholder from "client/public/post placeholder.jpeg"

function Posts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const videoRef = useRef(null);


  const [showModal, setShowModal] = useState(false);
  const [postData, setpostData] = useState("");

  const authState = useSelector((state) => {
    return state.auth.authState;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("authorization.user");
    dispatch(clearAuth());
    navigate("/login");
  };

  const handlePosts = () => {
    console.log("clicked");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    console.log("closed");
    setShowModal(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let endpoint = `/post/${authState._id}`;
        console.log(endpoint);
        const response = await axiosInstance.get(endpoint);
        setpostData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
  
    if (videoElement) {
      videoElement.play();
  
      const handleTouchStart = () => {
        videoElement.pause();
      };
  
      videoElement.addEventListener("touchstart", handleTouchStart);
  
      return () => {
        videoElement.removeEventListener("touchstart", handleTouchStart);
      };
    }
  }, []);


  
  return (
    <>
      <Appbar />
      <div style={{ marginBottom: "40px" }}>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <Grid container spacing={5}>
        {/* left */}
        <Grid item lg={3}>
          <Card
            className="left-card"
            style={{ position: "fixed", top: "5rem", width: "20%" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "20px",
                backgroundImage: authState.backgroundPic
                  ? `url(${authState.backgroundPic})`
                  : `url(${process.env.PUBLIC_URL}/jobcyback.jpeg)`,
                backgroundSize: "cover",
              }}
            >
              {authState.profPic ? (
                <Avatar
                  src={authState.profPic}
                  style={{ width: 80, height: 80 }}
                />
              ) : (
                <Avatar style={{ width: 80, height: 80 }}>
                  {authState.username[0]}
                </Avatar>
              )}{" "}
            </div>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {authState.name}
              </Typography>
              <Typography gutterBottom variant="body2" component="div">
                {authState.designation}
              </Typography>
              <Divider style={{ marginTop: "1rem" }} />

              <Typography variant="body2" style={{ textAlign: "center" }}>
                {authState.about}
              </Typography>
              <Divider style={{ marginTop: "1rem" }} />
            </CardContent>
            <Divider style={{ marginTop: "1rem" }} />

            <CardActions
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                size="small"
                style={{
                  border: "0.5px solid black",
                  marginTop: "10px",
                  width: "100%",
                  color: "#ff6e14",
                }}
                onClick={() => navigate("/profile")}
              >
                {" "}
                Edit Profile
              </Button>
              <Button
                size="small"
                style={{
                  border: "0.5px solid black",
                  marginTop: "10px",
                  width: "100%",
                  color: "#ff6e14",
                }}
              >
                {" "}
                Connections
              </Button>
            </CardActions>
            <Divider style={{ marginTop: "1rem" }} />
          </Card>
        </Grid>

        <Grid item lg={6} spacing={2}>
          <Card className="center-card" style={{ marginTop: "1.4rem" }}>
            <CardContent sx={{ display: "flex" }}>
              {authState.profPic ? (
                <Avatar
                  src={authState.profPic}
                  style={{ width: 50, height: 50, marginRight: "4px" }}
                />
              ) : (
                <Avatar style={{ width: 80, height: 80 }}>
                  {authState.username[0]}
                </Avatar>
              )}{" "}
              <Button
                sx={{ width: "90%" }}
                variant="outlined"
                size="small"
                className="text-field"
                onClick={handlePosts}
              >
                Post your thoughts...
              </Button>
              {showModal && <Post onClose={handleCloseModal} />}
            </CardContent>
            <CardActions
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              <Button size="small" className="post-icon">
                <IconButton size="small" style={{ color: "green" }}>
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
                <IconButton size="small" style={{ color: "red" }}>
                  <ArticleIcon />
                </IconButton>
                Article
              </Button>
            </CardActions>
          </Card>

          {/* posts card */}
          {postData.length === 0 ? (
            <Box
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                marginLeft: "0rem",
                marginTop: "1rem",
              }}
              className="posts"
            >
              {/* User details */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "left",
                  marginBottom: "0.5rem",
                  marginTop: "0.5rem",
                  paddingLeft: "0.5rem",
                  paddingRight: "0.2rem",
                }}
              >
                {/* <Avatar src="" sx={{ marginRight: "10px" }} /> */}
                <Box sx={{ marginRight: "1rem" }}>
                  <Box>
                    <Typography
                      sx={{ textAlign: "left", fontSize: "0.9rem" }}
                      variant="body1"
                    ></Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{ textAlign: "left", fontSize: "0.7rem" }}
                      variant="subtitle1"
                    ></Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{ textAlign: "left", fontSize: "0.6rem" }}
                      variant="subtitle2"
                    ></Typography>
                  </Box>
                </Box>
              </Box>

              {/* Post content */}
              <Box className="Post-image">
                <Card sx={{ maxWidth: 700 }} className="Post-card">
                  <CardActionArea>
                    <Typography
                      variant="body2"
                      className="post-text"
                      align="left"
                      style={{ paddingBottom: "10px" }}
                    ></Typography>

                    <CardMedia
                      component="img"
                      height="400"
                      src="/nopost.png"
                      alt="Posts image"
                      style={{ objectFit: "cover" }}
                    />
                  </CardActionArea>
                </Card>
              </Box>

              {/* Post actions */}
              <CardActions>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                  }}
                ></Box>
              </CardActions>
            </Box>
          ) : (
            postData.map((post) => (
              <Box
                key={post._id}
                sx={{
                  justifyContent: "space-between",
                  alignItems: "left",
                  width: "100%",
                }}
                className="posts"
              >
                {/* User details */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "left",
                    marginBottom: "0.5rem",
                    marginTop: "0.3rem",
                    paddingLeft: "0.5rem",
                    paddingRight: "0.2rem",
                  }}
                >
                  <Avatar
                    src={post.userProfileImage}
                    sx={{ marginRight: "10px" }}
                  />
                  <Box sx={{ marginRight: "1rem" }}>
                    <Box>
                      <Typography
                        sx={{ textAlign: "left", fontSize: "0.9rem" }}
                        variant="body1"
                      >
                        {post.username}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{ textAlign: "left", fontSize: "0.7rem" }}
                        variant="subtitle1"
                      >
                        {post.designation}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{ textAlign: "left", fontSize: "0.6rem" }}
                        variant="subtitle2"
                      >
                        {post.location}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Post content */}
                <Box className="Post-image">
                  <Card sx={{ maxWidth: 700 }} className="Post-card">
                    <CardActionArea>
                      <Typography
                        variant="body2"
                        className="post-text"
                        align="left"
                        style={{ paddingBottom: "10px" }}
                      >
                        {post.description}
                      </Typography>
                      {post.image ? (
                        <CardMedia
                          component="img"
                          height="400"
                          src={post.image}
                          alt="Posts image"
                        />
                      ) : (
                        <CardMedia
                          component="video"
                          controls
                          height="400"
                          src={post.video}
                          alt="Posts video"
                          ref={videoRef}

                        />
                      )}
                    </CardActionArea>
                  </Card>
                </Box>

                {/* Post actions */}
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
                    {/* <Typography style={{ color: "grey" }}>
                      <IconButton size="small">
                        <ThumbUpIcon />
                      </IconButton>{" "}
                      Like
                    </Typography> */}
                    <PostLikeButton />
                    <Typography style={{ color: "#1976D2" }}>
                      <IconButton size="small" sx={{ color: "#1976D2" }}>
                        <SendIcon />
                      </IconButton>{" "}
                      Sent
                    </Typography>
                    <Typography style={{ color: "red" }}>
                      <IconButton size="small" sx={{ color: "red" }}>
                        <ReportIcon />
                      </IconButton>{" "}
                      Report
                    </Typography>
                  </Box>
                </CardActions>
              </Box>
            ))
          )}
        </Grid>

        <Grid item lg={3}>
          <Card
            className="right-card"
            sx={{ position: "fixed", marginTop: "1.4rem" }}
          >
            <CardMedia
              sx={{ height: 140 }}
              image="/JOBCY ICON.png"
              title="green iguana"
            />
            <CardContent>
              <Typography variant="body2" textAlign="auto">
                Unlock your career potential and discover endless opportunities
                with our comprehensive job portal, connecting talented
                individuals with top-tier employers worldwide.
              </Typography>
            </CardContent>
            <CardActions>
              <Box
                sx={{ display: "grid", width: "100%", alignItems: "center" }}
              >
                <Button
                  size="small"
                  sx={{
                    border: "0.1px solid #ff6e14",
                    color: "#ff6e14",
                    marginBottom: "5px",
                  }}
                >
                  Find Jobs
                </Button>
                <Button
                  size="small"
                  sx={{ border: "0.1px solid #ff6e14", color: "grey" }}
                >
                  Discover More
                </Button>
              </Box>
            </CardActions>
          </Card>
          <Card
            className="right-card-bottom"
            style={{ position: "fixed", top: "35rem", paddingLeft: "25px" }}
          >
            <CardContent style={{ color: "#ff6e14" }}>
              <Typography gutterBottom variant="h5" component="div">
                JOBCY
              </Typography>
              <Typography variant="body2" component="div">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                      <li>About</li>
                      <li>Accessibility</li>
                      <li>Help Center</li>
                    </ul>
                  </div>
                  <div>
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                      <li>Privacy &amp; Terms</li>
                      <li>Ad Choices</li>
                      <li>Advertising</li>
                    </ul>
                  </div>
                </div>
              </Typography>
              <Typography variant="body2" style={{ fontSize: "0.7rem" }}>
                JOCY Corporation © 2023
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Posts;
