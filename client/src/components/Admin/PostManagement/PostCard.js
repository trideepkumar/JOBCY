import React from 'react'
import { Box, Card, CardContent, Typography, Button } from "@mui/material";


function PostCard() {
  return (
    <div>
             <Box
        sx={{
          marginTop: "6rem",
          width: "60rem",
          // position: "relative",
          overflow: { xs: "auto", sm: "initial" },
          marginBottom: "0px",
        }}
      >
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
            marginBottom: "0px",
          }}
          className="orgCard"
        >
          <img
            src="dummyProfilePicture.jpg"
            alt="Organisation Avatar"
            style={{ width: "13rem", objectFit: "cover" }}
          />
          <CardContent>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Organisation Name
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                fontWeight="bold"
              >
                Organisation Category
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "3rem" }}>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" fontWeight="bold">
                  Total Followers
                </Typography>
                <Typography variant="body1">100</Typography>
              </Box>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" fontWeight="bold">
                  Total Jobposts
                </Typography>
                <Typography variant="body1">50</Typography>
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
            <Button
              variant="outlined"
              sx={{
                ml: 1,
                color: "red",
                background: "white",
                border: "0.1px solid red",
              }}
              onClick={() => {
                // handleBlock(organisation._id);
              }}
            >
              Block
            </Button>
            <Button
              variant="outlined"
              sx={{
                ml: 1,
                color: "green",
                background: "white",
                border: "0.1px solid green",
              }}
              onClick={() => {
                // handleUnblock(organisation._id);
              }}
            >
              Unblock
            </Button>
          </Box>
        </Card>
      </Box>
    </div>
  )
}

export default PostCard