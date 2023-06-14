import "./Profile.css";
import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Avatar,
  Divider,
  CardMedia,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from '../../../api/axiosinstance';

function Profile() {

  const [abouts,setAbouts] = useState()
 

  const authState = useSelector((state) => {
    return state.auth.authState;
  })

  const handleAbout = async (event)=>{
    console.log('1')
    const endpoint = `/updateAbout/${authState._id}`;
    const data = {
      username : authState.name,
      designation : authState.designation,
      place : authState.place,
      state : authState.state,
      country : authState.country,
      about : authState.about
    };

    const response = await axiosInstance.post(endpoint, data);
    if (response.data?.success) {
       setAbouts(response.data)
    }

    console.log(endpoint)
    
  }

  

  return (
    <>
      {authState && (
        <Grid container spacing={5}>
          <Grid item lg={9} sm={12}>
            {/* maincard */}
            <Card
              className="left-card-profile"
              style={{ marginTop: "5rem", marginLeft: "3rem" }}
            >
              <div
                style={{
                  paddingTop: "20px",
                  backgroundImage: `url(${process.env.PUBLIC_URL}/backgroundllinkedin.jpg)`,
                  backgroundSize: "cover",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 20px",
                  height: "35%",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ color: "white" }}>
                    <Button>
                      <Avatar
                        src="/public/signupmain.jpeg"
                        style={{
                          width: 80,
                          height: 80,
                          marginLeft: "15px",
                          marginTop: "1rem",
                        }}
                      />
                    </Button>
                  </div>
                </div>
              </div>

              <CardContent style={{ display: "grid", justifyContent: "left" }}>
                <Box
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Box
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box>
                      <Box>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          style={{ display: "flex", justifyContent: "left" }}
                        >
                          {authState.name}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="body1"
                          component="div"
                          style={{ display: "flex", justifyContent: "left" }}
                        >
                          {authState.designation}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="body2"
                          component="div"
                          style={{ display: "flex", justifyContent: "left" }}
                        >
                          {authState.place},{authState.state},
                          {authState.country}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <Button onClick={handleAbout}>
                      <EditIcon
                        size="small"
                        style={{ color: "#ff6e14", marginRight: "100%" }}
                      />
                    </Button>
                  </Box>
                </Box>

                <Divider style={{ marginTop: "1rem", width: "50rem" }} />

                <Box>
                  <Box>
                    <Typography
                      style={{ display: "flex", justifyContent: "left" }}
                      variant="h6"
                      gutterBottom
                    >
                      About
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{ textAlign: "justify" }}
                    >
                      {authState.about}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* skills */}
            <Card
              item
              sm={6}
              style={{
                marginTop: "2rem",
                marginLeft: "3rem",
                display: "grid",
                textAlign: "left",
              }}
              className="skill-main-card"
            >
              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="h6"
                  style={{ textAlign: "left", paddingLeft: "1rem" }}
                  gutterBottom
                >
                  Skills
                </Typography>
                <EditIcon
                  size="small"
                  style={{ color: "#ff6e14", marginRight: "1rem" }}
                />
              </Box>
              <Divider style={{ marginBottom: "1rem" }} />
              <Box
                item
                lg={12}
                sx={6}
                style={{ display: "flex", justifyContent: "left" }}
                className="skill-box"
              >
                <Button className="skill-button">HTML</Button>
                <Button className="skill-button">CSS</Button>
                <Button className="skill-button">JAVASCRIPT</Button>
                <Button className="skill-button">NODE JS</Button>
                <Button className="skill-button">EXPRESS JS</Button>
                <Button className="skill-button">MONGO DB</Button>
                <Button className="skill-button">TYPESCRIPT</Button>
                <Button className="skill-button">REACT</Button>
                <Button
                  style={{
                    background: "#25916f",
                    color: "white",
                    marginLeft: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  ADD SKILLS +
                </Button>
              </Box>
            </Card>

            {/* Experience */}
            <Card
              item
              sm={12}
              style={{
                marginTop: "2rem",
                marginLeft: "3rem",
                display: "grid",
                textAlign: "left",
              }}
            >
              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="h6"
                  style={{ textAlign: "left", paddingLeft: "1rem" }}
                  gutterBottom
                >
                  Experience
                </Typography>
                <EditIcon
                  size="small"
                  style={{
                    color: "#ff6e14",
                    marginRight: "1rem",
                    marginTop: "0.5rem",
                  }}
                />
              </Box>
              <Divider style={{ marginBottom: "1rem" }} />
              <Box
                item
                lg={12}
                sx={4}
                style={{ display: "grid", justifyContent: "left" }}
                className="experience-box"
              >
                <Box style={{ marginBottom: "1rem" }}>
                  <Typography
                    variant="body1"
                    style={{ textAlign: "left", paddingLeft: "1rem" }}
                  >
                    {" "}
                    COMPANYS NAME
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ textAlign: "left", paddingLeft: "1rem" }}
                  >
                    Company's About
                  </Typography>
                </Box>
                <Box style={{ marginBottom: "1rem" }}>
                  <Typography
                    variant="body1"
                    style={{ textAlign: "left", paddingLeft: "1rem" }}
                  >
                    {" "}
                    COMPANYS NAME
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ textAlign: "left", paddingLeft: "1rem" }}
                  >
                    Company's About
                  </Typography>
                </Box>
                <Box style={{ marginBottom: "1rem" }}>
                  <Typography
                    variant="body1"
                    style={{ textAlign: "left", paddingLeft: "1rem" }}
                  >
                    {" "}
                    COMPANYS NAME
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ textAlign: "left", paddingLeft: "1rem" }}
                  >
                    Company's About
                  </Typography>
                </Box>
              </Box>
            </Card>

            {/* EDUCATION */}
            <Card
              item
              sm={12}
              style={{
                marginTop: "2rem",
                marginLeft: "3rem",
                display: "grid",
                textAlign: "left",
              }}
            >
              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                  variant="h6"
                  style={{ textAlign: "left", paddingLeft: "1rem" }}
                  gutterBottom
                >
                  Education
                </Typography>
                <EditIcon
                  size="small"
                  style={{
                    color: "#ff6e14",
                    marginRight: "1rem",
                    marginTop: "0.5rem",
                  }}
                />
              </Box>
              <Divider style={{ marginBottom: "1rem" }} />
              <Box
                item
                lg={12}
                sx={4}
                style={{ display: "grid", justifyContent: "left" }}
                className="experience-box"
              >
                <Box style={{ marginBottom: "1rem" }}>
                  <Typography
                    variant="body1"
                    style={{ textAlign: "left", paddingLeft: "1rem" }}
                  >
                    {" "}
                    EDUCATIONAL INSTITUTIONAL NAME
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ textAlign: "left", paddingLeft: "1rem" }}
                  >
                    About Education
                  </Typography>
                </Box>
                <Box style={{ marginBottom: "1rem" }}>
                  <Typography
                    variant="body1"
                    style={{ textAlign: "left", paddingLeft: "1rem" }}
                  >
                    {" "}
                    EDUCATIONAL INSTITUTIONAL NAME
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ textAlign: "left", paddingLeft: "1rem" }}
                  >
                    About Education
                  </Typography>
                </Box>
                <Box style={{ marginBottom: "1rem" }}>
                  <Typography
                    variant="body1"
                    style={{ textAlign: "left", paddingLeft: "1rem" }}
                  >
                    {" "}
                    EDUCATIONAL INSTITUTIONAL NAME
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ textAlign: "left", paddingLeft: "1rem" }}
                  >
                    About Education
                  </Typography>
                </Box>
              </Box>
            </Card>

            {/* PROJECTS */}

            <Card
              item
              sm={12}
              style={{
                marginTop: "2rem",
                marginLeft: "3rem",
                display: "grid",
                textAlign: "left",
              }}
            >
              <Typography
                variant="h6"
                style={{ textAlign: "left", paddingLeft: "1rem" }}
                gutterBottom
              >
                PROJECTS
              </Typography>
              <Divider style={{ marginBottom: "1rem" }} />
              <Box
                item
                lg={12}
                sx={4}
                style={{ display: "flex", justifyContent: "left" }}
                className="experience-box"
              ></Box>
            </Card>
          </Grid>

          <Grid item lg={3} className="right-grid">
            <Card
              className="right-card"
              style={{ position: "sticky", top: "5rem", marginTop: "5rem" }}
            >
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
              <CardContent style={{ color: "#ff6e14" }}>
                <Typography gutterBottom variant="h5" component="div">
                  JOBCY
                </Typography>
                <Typography variant="body2">
                  Find out your best jobs here... You can find the job according
                  to your skills.. India's perfect job providing application...
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default Profile;
