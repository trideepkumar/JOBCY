import React, { useRef, useState, useEffect } from "react";
import { Modal, Box, Typography, Button, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../../api/axiosinstance";
import { setorganisationAuth } from "../../../../app/features/auth/organisationauthSlice";

function OrgModal({ type, open, onClose }) {
  const authState = useSelector((state) => {
    return state.organisationauth.authState;
  });

  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    employees: "",
    place: "",
    about: "",
    profPic: "",
  });

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleQuillChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      about: value,
    }));
  };

  const handleModalClose = () => {
    setSelectedImage(null);
    onClose();
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("employees", formData.employees);
      formDataToSend.append("place", formData.place);
      formDataToSend.append("about", formData.about);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      console.log(formData);
      let endpoint = "";

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      if (type === "name" || type === "about") {
        endpoint = `/organisation/updateName/${authState._id}`;
        const response = await axiosInstance.patch(endpoint, formDataToSend);
        if (response.status === 200) {
            let orgEndpoint = `/organisation/getOrg/${authState._id}`;
            console.log(orgEndpoint);
            const organisation = await axiosInstance.get(orgEndpoint);
            localStorage.setItem(
              "organisation",
              JSON.stringify(organisation.data.organization)
            );
            dispatch(setorganisationAuth());
          }
          handleModalClose();
      } else if (type === "profilepic") {
        endpoint = `/organisation/updatepic/${authState._id}`;
        const response = await axiosInstance.patch(
          endpoint,
          formDataToSend,
          config
        );
        console.log(response)
        if (response.status === 200) {
            let orgEndpoint = `/organisation/getOrg/${authState._id}`;
            console.log(orgEndpoint);
            const organisation = await axiosInstance.get(orgEndpoint);
            localStorage.setItem(
              "organisation",
              JSON.stringify(organisation.data.organization)
            );
            dispatch(setorganisationAuth());
          }
          handleModalClose();
      }

   
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!open) {
      setSelectedImage(null);
      setFormData((prevData) => ({
        ...prevData,
        image: null,
      }));
    }
  }, [open]);

  const renderContent = () => {
    if (type === "profilepic") {
      return (
        <>
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Selected"
              style={{ width: "100%", height: "auto" }}
            />
          ) : (
            <Box sx={{ textAlign: "center", my: 2 }}>
              <label htmlFor="file-input" style={{ cursor: "pointer" }}>
                <CloudUploadIcon fontSize="large" />
              </label>
            </Box>
          )}
          <input
            ref={fileInputRef}
            id="file-input"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
            name="image"
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            fullWidth
            sx={{ background: "#ff6e14" }}
          >
            Submit{" "}
          </Button>
        </>
      );
    } else if (type === "name") {
      return (
        <>
          <TextField
            label="Name"
            fullWidth
            sx={{ mb: 2 }}
            name="name"
            value={formData.name || authState.orgName}
            onChange={handleInputChange}
          />
          <TextField
            label="Category"
            fullWidth
            sx={{ mb: 2 }}
            name="category"
            value={formData.category || authState.category} // Display the category from authState
            onChange={handleInputChange}
          />
          <TextField
            label="Number of Employees"
            fullWidth
            sx={{ mb: 2 }}
            name="employees"
            value={formData.employees || authState.numberOfEmployees} // Display the number of employees from authState
            onChange={handleInputChange}
          />
          <TextField
            label="Place"
            fullWidth
            sx={{ mb: 2 }}
            name="place"
            value={formData.place || authState.place} // Display the place from authState
            onChange={handleInputChange}
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            fullWidth
            sx={{ background: "#ff6e14" }}
          >
            Submit
          </Button>
        </>
      );
    } else if (type === "about") {
      return (
        <>
          <ReactQuill
            value={formData.about}
            onChange={handleQuillChange}
            placeholder="About"
            theme="snow"
            modules={{
              toolbar: [
                ["bold", "italic", "underline"],
                [{ header: [1, 2, false] }],
              ],
            }}
            style={{
              marginBottom: "16px",
              width: "100%",
              height: "10rem",
              marginBottom: "10px",
            }}
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            fullWidth
            sx={{ background: "#ff6e14", mt: "50px" }}
          >
            Submit
          </Button>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <Modal open={open} onClose={handleModalClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          border: "1px solid #ff6e14",
          borderRadius: "5px",
        }}
      >
        <Typography variant="h5" component="div" align="center" sx={{ mb: 2 }}>
          {type === "profilepic"
            ? "Edit Profile Picture"
            : type === "name"
            ? "Edit Name"
            : "Edit About"}
        </Typography>
        {renderContent()}
      </Box>
    </Modal>
  );
}

export default OrgModal;
