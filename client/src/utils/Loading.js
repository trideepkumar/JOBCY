import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(2px)",
        background:'white',
        zIndex: 9999,
      }}
    >
      {/* Add the video element */}
      <video
        autoPlay
        loop
        muted
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
        //   marginBottom: "1rem",
          borderRadius: "10px",
          width:'20vw'
        }}
      >
        <source src="/Untitled design.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Box>
  );    
};

export default Loading;
