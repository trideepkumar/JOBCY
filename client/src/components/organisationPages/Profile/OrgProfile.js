import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Box,
  IconButton,
  Avatar
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import OrgModal from "../../userPages/Modal.js/OrgModal/OrgModal";
import { useSelector } from "react-redux";

function OrgProfile() {
  
  const authState = useSelector((state) => {
    return state.organisationauth.authState;
  });

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleOpenModal = (type) => {
    setOpenModal(true);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalType("");
  };

  return (
    <div>
      <Grid container spacing={5}>
        {/* profile side */}
        <Grid item lg={10} sm={12} style={{ marginLeft: "7rem" }}>
          {/* maincard */}
          <Card
            className="left-card-profile"
            style={{ marginTop: "5rem", marginLeft: "3rem" }}
          >
            <div
              style={{
                paddingTop: "20px",
                //   backgroundImage: "url(path_to_background_image)",
                background: "grey",
                backgroundSize: "contain",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 15px",
                height: "60%",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ position: "relative", color: "white" }}>
                  <Avatar
                    alt="Profile Picture"
                    src={authState.profPic}
                    style={{
                      width: 100,
                      height: 100,
                      marginLeft: "15px",
                      marginTop: "1rem",
                      backgroundColor: "black",
                      borderRadius: "50%", // Make the avatar appear in a square shape
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      top: "85px",
                      left: "48px",
                      cursor: "pointer",
                      color: "#ff6e14",
                    }}
                  >
                    <IconButton
                      color="inherit"
                      aria-label="Edit"
                      onClick={() => handleOpenModal("profilepic")}
                    >
                      <EditIcon />
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>

            <CardContent
              style={{
                display: "grid",
                justifyContent: "left",
                textAlign: "left",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <div>
                  <Typography variant="h5" component="div">
                    {authState.orgName}
                  </Typography>
                  <Typography variant="body1" component="div">
                    {authState.category}, {authState.numberOfEmployees}employees
                  </Typography>
                  <Typography variant="body2" component="div">
                    {authState.place}
                  </Typography>
                </div>
                <div
                  style={{
                    cursor: "pointer",
                    color: "#ff6e14",
                  }}
                >
                  <IconButton
                    color="inherit"
                    aria-label="Edit"
                    onClick={() => handleOpenModal("name")}
                  >
                    <EditIcon />
                  </IconButton>
                </div>
              </Box>
              <Divider style={{ marginTop: "1rem", width: "50rem" }} />
            </CardContent>
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
                style={{
                  textAlign: "left",
                  paddingLeft: "1.5rem",
                  paddingTop: "1rem",
                }}
              >
                About
              </Typography>
              <div
                style={{
                  paddingLeft: "27rem",
                  cursor: "pointer",
                  color: "#ff6e14",
                }}
              >
                <IconButton
                  color="inherit"
                  aria-label="Edit"
                  onClick={() => handleOpenModal("about")}
                >
                  <EditIcon />
                </IconButton>
              </div>

              <Button>{/* <UserModal type="skills" /> */}</Button>
            </Box>
            <Divider style={{ marginTop: "1rem", width: "90%" }} />
            <Box sx={{ marginLeft: "1.5rem", marginRight: "3rem" }}>
              <Box>
                <Typography variant="body1" style={{ textAlign: "justify" }}>
                  <div
                    dangerouslySetInnerHTML={{ __html: authState.about }}
                  ></div>
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* OrgModal */}
      <OrgModal type={modalType} open={openModal} onClose={handleCloseModal} />
    </div>
  );
}

export default OrgProfile;
