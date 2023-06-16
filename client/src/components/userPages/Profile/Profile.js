import "./Profile.css";
import React, { useEffect } from "react";
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
  Chip,
} from "@mui/material";
import { useState } from "react";
import { Delete } from "@mui/icons-material";
import { useSelector } from "react-redux";
import UserModal from "../Modal.js/userModal";

function Profile() {
  const authState = useSelector((state) => {
    return state.auth.authState;
  });

  const [showModal, setShowModal] = useState(false);

  const handlePorfpic = () => {
    console.log("hi pro");
    setShowModal(true);

    console.log(showModal);
  };

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
                  <div style={{ position: "relative", color: "white" }}>
                    <Avatar
                      src="/public/signupmain.jpeg"
                      style={{
                        width: 100,
                        height: 100,
                        marginLeft: "15px",
                        marginTop: "1rem",
                      }}
                      onClick={handlePorfpic}
                    />  
                    <div style={{ position: "absolute", top: '90px', left: '55px',cursor:'pointer' }}>
                      <UserModal type="profile" />
                    </div>
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
                    <Button>
                      <UserModal type="about" />
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
                  Job Title
                </Typography>
                <UserModal type="jobtitle" />
              </Box>
              <Divider style={{ marginBottom: "1rem" }} />
              <Box
                item
                lg={12}
                xs={6}
                sm={6}
                style={{ display: "flex", justifyContent: "left" }}
                className="skill-box"
              >
                {authState.jobtitles.map((jobtitle, index) => (
                  <Chip
                    key={index}
                    label={jobtitle.jobtitle}
                    // onClick={handleClick}
                    // onDelete={handleDelete}
                    deleteIcon="delete"
                    sx={{
                      background: "#FF6E14",
                      color: "white",
                      marginLeft: "10px",
                      marginBottom: "10px",
                    }}
                  />
                ))}
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

                <UserModal type="experience" />
              </Box>
              <Divider style={{ marginBottom: "1rem" }} />
              <Box
                item
                lg={12}
                sx={4}
                style={{ display: "grid", justifyContent: "left" }}
                className="experience-box"
              >
                {authState.experience.map((experience, index) => (
                  <Box
                    key={index}
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
                        {experience.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{ textAlign: "left", paddingLeft: "1rem" }}
                      >
                        {experience.companyName}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{ textAlign: "left", paddingLeft: "1rem" }}
                      >
                        {experience.duration}
                      </Typography>
                    </Box>
                    {index < authState.experience.length - 1 && (
                      <Divider style={{ marginBottom: "1rem" }} />
                    )}
                  </Box>
                ))}
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
                <UserModal type="education" />
              </Box>
              <Divider style={{ marginBottom: "1rem" }} />
              {authState.education.map((education, index) => (
                <Box
                  key={index}
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
                      {education.institutionName}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{ textAlign: "left", paddingLeft: "1rem" }}
                    >
                      {education.qualification}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{ textAlign: "left", paddingLeft: "1rem" }}
                    >
                      {education.aboutEdu}
                    </Typography>
                  </Box>
                  {index < authState.education.length - 1 && (
                    <Divider style={{ marginBottom: "1rem" }} />
                  )}
                </Box>
              ))}
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
