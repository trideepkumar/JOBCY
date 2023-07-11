import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { IconButton, Typography } from "@mui/material";


function PostLikeButton() {
  return (
    <div>
      <Typography style={{ color: "grey" }}>
        <IconButton size="small">
          <ThumbUpIcon />
        </IconButton>{" "}
        Like
      </Typography>
    </div>
  );
}

export default PostLikeButton;
