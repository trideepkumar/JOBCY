import {
  Grid,
  Card,
  Avatar,
  CardContent,
  Box,
  Typography,
  Button,
  Divider,
  Chip,
  IconButton,
  Modal
} from "@mui/material";
import { Cancel as CancelIcon } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useParams } from "react-router";
import axiosInstance from "../../../api/axiosinstance";

function UserprofileModal() {
    const { userId } = useParams();

  const [user, setUser] = useState();
  const [resume , setResume] = useState(false)
  const [open, setOpen] = useState(false);


  const findCandidate = async () => {
    try {
      const response = await axiosInstance.get(`/user/${userId}`);
      setUser(response.data.user);
      console.log("user:", user);
    } catch (err) {
      console.log(err);
    }
  };

  const handleResume = ()=>{
    setOpen(true)
     setResume(true)
     console.log(resume)
  }

  const handleClose = ()=>{
    setOpen(false)
  }

  useEffect(() => {
    findCandidate();
  }, [userId]);
  return (
    <>
      {user && (
         
        <Grid sx={{ width: "90vw" }}>
          <Card
            className="left-card-profile"
            style={{ marginTop: "5rem", marginLeft: "3rem" }}
          >
            <div
              style={{
                paddingTop: "20px",
                backgroundImage: `url(${
                  user.backgroundImage || process.env.PUBLIC_URL
                }/jobcyback.jpeg)`,
                backgroundSize: "contain",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 15px",
                height: "45%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ position: "relative", color: "white" }}>
                  <Avatar
                    src={user.profPic}
                    style={{
                      width: 100,
                      height: 100,
                      marginLeft: "15px",
                      marginTop: "1rem",
                    }}
                  >
                    {!user.profPic && <PersonIcon />}
                  </Avatar>
                  <div
                    style={{
                      position: "absolute",
                      top: "90px",
                      left: "55px",
                      cursor: "pointer",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <CardContent style={{ display: "grid", justifyContent: "left" }}>
              <Box style={{ display: "flex", justifyContent: "space-between" }}>
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
                        {user.name}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                        style={{ display: "flex", justifyContent: "left" }}
                      >
                        {user.designation}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        style={{
                          display: "flex",
                          justifyContent: "left",
                          textAlign: "left",
                        }}
                      >
                        {user.place}
                        <br />
                        {user.state}
                        <br />
                        {user.country}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Button></Button>
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
                  <Typography variant="body2" style={{ textAlign: "justify" }}>
                    {user.about}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "10px",
              }}
            >
              <Button sx={{ display: "flex", border: "0.5px solid #ff6e14",background:'#ff6e14',color:'white',borderRadius:"17px" }} onClick={handleResume}>
                View Resume
              </Button>
            </div>
          </Card>

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
              {user.skills.map((jobtitle, index) => (
                <Chip
                  key={index}
                  label={jobtitle.jobtitle}
                  onDelete={() => handleDelete(jobtitle._id)}
                  onClick={() => console.log("Chip clicked")}
                  sx={{
                    background: "#FF6E14",
                    color: "white",
                    marginLeft: "10px",
                    marginBottom: "10px",
                  }}
                  deleteIcon={
                    <IconButton size="small" aria-label="delete">
                      <CancelIcon fontSize="small" />
                    </IconButton>
                  }
                />
              ))}
            </Box>
          </Card>

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
              {user.jobtitles.map((jobtitle, index) => (
                <Chip
                  key={index}
                  label={jobtitle.jobtitle}
                  sx={{
                    background: "#FF6E14",
                    color: "white",
                    marginLeft: "10px",
                    marginBottom: "10px",
                  }}
                  deleteIcon={
                    <IconButton size="small" aria-label="delete">
                      <CancelIcon fontSize="small" />
                    </IconButton>
                  }
                />
              ))}
            </Box>
          </Card>

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
            </Box>
            <Divider style={{ marginBottom: "1rem" }} />
            <Box
              item
              lg={12}
              sx={4}
              style={{ display: "grid", justifyContent: "left" }}
              className="experience-box"
            >
              {user.experience.map((experience, index) => (
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
                  {index < user.experience.length - 1 && (
                    <Divider style={{ marginBottom: "1rem" }} />
                  )}
                </Box>
              ))}
            </Box>
          </Card>

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
            </Box>
            <Divider style={{ marginBottom: "1rem" }} />
            {user.education.map((education, index) => (
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
                {index < user.education.length - 1 && (
                  <Divider style={{ marginBottom: "1rem" }} />
                )}
              </Box>
            ))}
          </Card>
        </Grid>
      )}


{resume === '' ? (
  <Modal sx={{ background: 'white' }}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100rem', height: '56rem', color: 'white' }}>
      <Typography
        variant="h5"
        align="center"
        mt={"20%"}
        ml={"30%"}
        width={"50%"}
        height={"20%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        border={"0.5px solid #f6e14"}
        sx={{ background: 'white' }}
      >
        Resume not updated yet...
      </Typography>
    </div>
  </Modal>
) : (
  <Modal
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: '50vw',
      maxHeight: '90vh',
      border: '10px solid #ff6e14',
      marginLeft: '21rem',
      marginTop: '3rem',
    }}
    open={open}
    onClose={handleClose}
  >
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100rem', height: '56rem' }}>
      {user && user.resume && (
        <object width="100%" height="80%" data={user.resume} type="application/pdf"></object>
      )}
    </div>
  </Modal>
)}



    </>
  );
}

export default UserprofileModal;
