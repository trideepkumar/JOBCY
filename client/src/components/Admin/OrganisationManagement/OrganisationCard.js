import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import axiosInstance from "../../../api/axiosinstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./organisationCard.css"

function OrganisationCard() {
  const [organisations, setOrganisations] = useState([]);

  const fetchOrganisations = async () => {
    try {
      const response = await axiosInstance.get("/admin/organisations");
      setOrganisations(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBlock = async (orgId) => {
    console.log(orgId);
    const response = await axiosInstance.patch("/admin/blockorganisation", {
      orgId,
    });
    console.log(response);
    toast.success("Organisation blocked successfully", {
      className: "toast-success",
      bodyClassName: "toast-body",
      progressClassName: "toast-progress",
    });
    fetchOrganisations();
  };

  const handleUnblock = async (orgId) => {
    console.log(orgId);
    const response = await axiosInstance.patch("/admin/unblockorganisation", {
      orgId,
    });
    console.log(response);
    toast.success("Organisation Unblocked successfully");
    fetchOrganisations();
  };

  useEffect(() => {
    fetchOrganisations();
  }, []);

  return (
    <div>
      {organisations.map((organisation, index) => (
        <Box
          key={organisation._id}
          sx={{
            marginTop: "6rem",
            width: "60rem",
            // position: "relative",
            overflow: { xs: "auto", sm: "initial" },
            marginBottom:'0px'
          }}
        >
          <ToastContainer />
          <Card
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              p: 3,
              height: "6rem",
              paddingLeft: "0px",
              marginLeft: "20rem",
              width: "60vw",
              marginBottom: '0px',
            }}
            className="orgCard"
          >
            <img
              src={organisation.profPic}
              alt="Organisation Avatar"
              style={{ width: "13rem", objectFit: "cover" }}
            />
            <CardContent>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  {organisation.orgName}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  fontWeight="bold"
                >
                  {organisation.category}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: "3rem" }}>
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" fontWeight="bold">
                    Total Followers
                  </Typography>
                  <Typography variant="body1">
                    {organisation.followerCount}
                  </Typography>
                </Box>
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" fontWeight="bold">
                    Total Jobposts
                  </Typography>
                  <Typography variant="body1">
                    {organisation.jobPostCount}
                  </Typography>
                </Box>
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" fontWeight="bold" color="red">
                    Total Reports
                  </Typography>
                  <Typography variant="body1" color="red">
                    8
                  </Typography>
                </Box>
              </Box>
            </CardContent>
            <Box sx={{ mt: 2, ml: 10, gap: "3rem" }}>
              {organisation.isVerified ? (
                <Button
                  variant="outlined"
                  sx={{
                    ml: 1,
                    color: "red",
                    background: "white",
                    border: "0.1px solid red",
                  }}
                  onClick={() => {
                    handleBlock(organisation._id);
                  }}
                >
                  Block
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  sx={{
                    ml: 1,
                    color: "green",
                    background: "white",
                    border: "0.1px solid green",
                  }}
                  onClick={() => {
                    handleUnblock(organisation._id);
                  }}
                >
                  Unblock
                </Button>
              )}
            </Box>
          </Card>
        </Box>
      ))}
    </div>
  );
}

export default OrganisationCard;
