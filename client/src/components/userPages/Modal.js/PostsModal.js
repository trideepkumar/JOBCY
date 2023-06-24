import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Button,
  Modal,
} from "@mui/material";
import { Photo, VideoLibrary, LocationOn } from "@mui/icons-material";
import { useSelector } from "react-redux";
import axiosInstance from '../../../api/axiosinstance'

function Posts() {

  const authState = useSelector((state) => {
    return state.auth.authState;
  });

  const [open, setOpen] = useState(false);
  const [openImagePreview, setOpenImagePreview] = useState(false);
  const [openVideoPreview, setOpenVideoPreview] = useState(false);
  const [postText, setPostText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [location, setLocation] = useState("");

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };



  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setOpenImagePreview(true);
    setSelectedVideo(null); // Clear the selected video
  };

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    setSelectedVideo(URL.createObjectURL(file));
    setOpenVideoPreview(true);
    setSelectedImage(null); // Clear the selected image
  };

  const handleCloseImagePreview = () => {
    setOpenImagePreview(false);
  };

  const handleCloseVideoPreview = () => {
    setOpenVideoPreview(false);
  };


  const handlePost = async () => {
    console.log("Post text:", postText);
    console.log("Selected image:", selectedImage);
    console.log("Selected video:", selectedVideo);
    console.log("Location:", location);
  
    const formData = new FormData();
    formData.append('media', selectedImage || selectedVideo);
    formData.append('createdBy', authState._id);
    formData.append('description', postText);
    formData.append('location', location);
    formData.append('shared', false);
    formData.append('isDeleted', false);
    formData.append('likes', []);
    formData.append('reported', []);
  
    try {
      const endpoint = '/post';
      console.log(formData)
      const response = await axiosInstance.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response);
      handleClose();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle style={{ color: "#ff6e14" }}>Create Post</DialogTitle>
        <DialogContent>
          <TextField
            label="What do you want to talk about..."
            multiline
            rows={4}
            fullWidth
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            sx={{ marginBottom: "1rem" }}
          />
          <TextField
            label="Location"
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            InputProps={{
              startAdornment: <LocationOn />,
            }}
          />
        </DialogContent>
        <DialogActions
          style={{ display: "flex", justifyContent: "space-around", color: "#ff6e14" }}
        >
          <IconButton
            style={{ color: "#ff6e14" }}
            component="label"
            disabled={selectedVideo !== null}
          >
            <Photo />
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </IconButton>
          {selectedImage && (
            <img src={selectedImage} alt="Selected" style={{ height: 50, width: 50 }} />
          )}
          <IconButton
            style={{ color: "#ff6e14" }}
            component="label"
            disabled={selectedImage !== null}
          >
            <VideoLibrary />
            <input type="file" hidden accept="video/*" onChange={handleVideoChange} />
          </IconButton>
          {selectedVideo && (
            <video
              src={selectedVideo}
              alt="Selected"
              controls
              style={{ height: 50, width: 50 }}
            />
          )}
          <Button variant="contained" onClick={handlePost} style={{ background: "#ff6e14" }}>
            Post
          </Button>
        </DialogActions>
      </Dialog>

      <Modal
        open={openImagePreview}
        onClose={handleCloseImagePreview}
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div style={{ maxWidth: "90%", maxHeight: "90%" }}>
          <img src={selectedImage} alt="Preview" style={{ height: "auto", width: "100%" }} />
        </div>
      </Modal>

      <Modal
        open={openVideoPreview}
        onClose={handleCloseVideoPreview}
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <div style={{ maxWidth: "80%", maxHeight: "80%" }}>
          <video
            src={selectedVideo}
            alt="Preview"
            controls
            style={{ height: "auto", width: "100%" }}
          />
        </div>
      </Modal>
    </>
  );
}

export default Posts;
