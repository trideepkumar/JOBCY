import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider, Input } from "@mui/material";
import axiosInstance from "../../../api/axiosinstance";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../app/features/auth/authSlice";
import "./userModal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #FF6E14",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

export default function UserModal({ type }) {
  const dispatch = useDispatch();

  const authState = useSelector((state) => {
    return state.auth.authState;
  });

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null)

  const initialFormData = {
    name: authState.name || "",
    designation: authState.designation || "",
    place: authState.place || "",
    state: authState.state || "",
    country: authState.country || "",
    about: authState.about || "",
    experience: [
      {
        companyName: "",
        duration: "",
        title: "",
      },
    ],
    education: [
      {
        institutionName: "",
        qualification: "",
        aboutEdu: "",
      },
    ],
    project: [
      {
        projectName: "",
        duration: "",
        about: "",
      },
    ],
    jobtitles: [
      {
        jobtitle: "",
      },
    ],
    profPic: "",
    backgroundPic: "",
  };

  //for image change in the modal
  const handleImageChange = (event) => {
    // const file = event.target.files[0];
    setFile(event.target.files[0])
    const imageUrl = URL.createObjectURL(event.target.files[0]);
    // const imageMYUrl = event.target.files[0]
    setSelectedImage(imageUrl);
    setFormData((prevFormData) => ({
      ...prevFormData,
      profPic: imageUrl,
    }));
  };

  const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState({
    name: "",
    designation: "",
    place: "",
    state: "",
    country: "",
    about: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateFormData = () => {
    let validationErrors = {};
    if (formData.name.trim() === "") {
      validationErrors.name = "Name is required";
    }
    if (formData.designation.trim() === "") {
      validationErrors.designation = "Designation is required";
    }
    if (formData.place.trim() === "") {
      validationErrors.place = "Place is required";
    }
    if (formData.state.trim() === "") {
      validationErrors.state = "State is required";
    }
    if (formData.country.trim() === "") {
      validationErrors.country = "Country is required";
    }
    if (formData.about.trim() === "") {
      validationErrors.about = "About is required";
    }
    return validationErrors;
  };

  const handleSubmit = async () => {
    try {
      const validationErrors = validateFormData();
      if (Object.keys(validationErrors).length !== 0) {
        setErrors(validationErrors);
        return;
      }

      setErrors({});
      if (type === "about") {
        let endpoint = `updateAbout/${authState._id}`;
        const response = await axiosInstance.patch(endpoint, formData);
        if (response.status === 200) {
          let userEndpoint = `user/${authState._id}`;
          const user = await axiosInstance.get(userEndpoint, formData);
          localStorage.setItem("user", JSON.stringify(user.data.user));
          dispatch(setAuth());
          handleClose();
        }
      } else if (
        type === "experience" ||
        type === "education" ||
        type === "jobtitle"
      ) {
        try {
          console.log("experience");
          let endpoint = `updateExperience/${authState._id}`;
          console.log(endpoint);
          console.log(formData);
          const response = await axiosInstance.post(endpoint, formData);
          console.log(response);
          if (response.status === 200) {
            let userEndpoint = `user/${authState._id}`;
            const user = await axiosInstance.get(userEndpoint);
            localStorage.setItem("user", JSON.stringify(user.data.user));
            dispatch(setAuth());
            handleClose();
          }
        } catch (error) {
          console.error("Error updating experience:", error);
        }
      } else if (type === "profile") {
        console.log("profile ");
        let endpoint = `updatepic/${authState._id}`;
        console.log(endpoint);
        const form = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
          form.append(key, value);
      });
      form.append('image', file)
        const response = await axiosInstance.patch(endpoint, form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response);
        if (response.status === 200) {
          let userEndpoint = `user/${authState._id}`;
          const user = await axiosInstance.get(userEndpoint);
          localStorage.setItem("user", JSON.stringify(user.data.user));
          dispatch(setAuth());
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   console.log(formData);
  // }, [handleInputChange]);

  return (
    <div>
      {type === "about" ||
      type === "experience" ||
      type === "education" ||
      type === "project" ||
      type === "jobtitle" ||
      type === "profile" ? (
        <EditIcon
          size="small"
          style={{ color: "#ff6e14", marginRight: "100%" }}
          onClick={handleOpen}
        />
      ) : (
        () => console.log("hi")
      )}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              gutterBottom
              style={{ color: "#FF6E14", textAlign: "center" }}
            >
              {type === "about" && "EDIT INTRO"}
              {type === "experience" && "ADD EXPERIENCE"}
              {type === "education" && "ADD EDUCATION"}
              {type === "project" && "ADD PROJECT"}
              {type === "jobtitle" && "ADD JOB TITLE"}
              {type === "profile" && "ADD A PROFILE PICTURE"}

              <Divider sx={{ marginBottom: "10px", marginTop: "10px" }} />
            </Typography>

            {type === "about" && (
              <>
                <Box style={{ marginBottom: "1rem" }}>
                  <Typography>Name</Typography>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    style={{
                      borderColor: "#ff6e41",
                      width: "10rem",
                    }}
                    required
                  />
                </Box>
                <Box style={{ marginBottom: "1rem" }}>
                  <Typography>Designation</Typography>
                  <Input
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    error={!!errors.designation}
                    helperText={errors.designation}
                    required
                  />
                </Box>
                <Box style={{ marginBottom: "1rem" }}>
                  <Typography>Place</Typography>
                  <Input
                    name="place"
                    value={formData.place}
                    onChange={handleInputChange}
                    error={!!errors.place}
                    helperText={errors.place}
                    required
                  />
                </Box>
                <Box style={{ marginBottom: "1rem" }}>
                  <Typography>State</Typography>
                  <Input
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    error={!!errors.state}
                    helperText={errors.state}
                    required
                  />
                </Box>
                <Box style={{ marginBottom: "1rem" }}>
                  <Typography>Country</Typography>
                  <Input
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    error={!!errors.country}
                    helperText={errors.country}
                    required
                  />
                </Box>
                <Box style={{ marginBottom: "1rem" }}>
                  <Typography>About</Typography>
                  <Input
                    name="about"
                    value={formData.about}
                    onChange={handleInputChange}
                    error={!!errors.about}
                    helperText={errors.about}
                    required
                  />
                </Box>
              </>
            )}

            {type === "experience" && (
              <Box style={{ marginBottom: "1rem" }}>
                <Typography>Company Name</Typography>
                <Input
                  name={`experience[0].companyName`}
                  placeholder="enter company name..."
                  onChange={handleInputChange}
                  error={!!errors.experience?.companyName}
                  helperText={errors.experience?.companyName}
                  required
                />
                <Typography>Duration</Typography>
                <Input
                  name={`experience[0].duration`}
                  placeholder="enter your duartion..."
                  onChange={handleInputChange}
                  error={!!errors.experience?.duration}
                  helperText={errors.experience?.duration}
                  required
                />
                <Typography>Title</Typography>
                <Input
                  name={`experience[0].title`}
                  placeholder="title here..."
                  onChange={handleInputChange}
                  error={!!errors.experience?.title}
                  helperText={errors.experience?.title}
                  required
                />
              </Box>
            )}

            {type === "education" && (
              <Box style={{ marginBottom: "1rem" }}>
                <Typography>Institution Name</Typography>
                <Input
                  name={`education[0].institutionName`}
                  placeholder="write here..."
                  onChange={handleInputChange}
                  error={!!errors.education?.institutionName}
                  helperText={errors.education?.institutionName}
                  required
                />
                <Typography>Qualification</Typography>
                <Input
                  name={`education[0].qualification`}
                  placeholder="write here..."
                  onChange={handleInputChange}
                  error={!!errors.education?.qualification}
                  helperText={errors.education?.qualification}
                  required
                />
                <Typography>About</Typography>
                <Input
                  name={`education[0].aboutEdu`}
                  placeholder="write here..."
                  onChange={handleInputChange}
                  error={!!errors.education?.aboutEdu}
                  helperText={errors.education?.aboutEdu}
                  required
                />
              </Box>
            )}

            {type === "jobtitle" && (
              <Box style={{ marginBottom: "1rem" }}>
                <Typography>ADD JOB TITLE</Typography>
                <Divider sx={{ marginBottom: "10px", marginTop: "10px" }} />
                <Input
                  name={`jobtitles[0].jobtitle`}
                  placeholder="Job title here..."
                  onChange={handleInputChange}
                  error={!!errors.jobtitles?.jobtitle}
                  helperText={errors.jobtitles?.jobtitle}
                  required
                />
              </Box>
            )}

            {type === "profile" && (
              <Box>
                <Box sx={{ paddingLeft: "8rem" }}>
                  <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    name="file-input"
                  >
                    <div className="image-upload">
                      <label htmlFor="file-input" style={{ cursor: "pointer" }}>
                        <img
                          src={
                            selectedImage ||
                            "https://icons.iconarchive.com/icons/dtafalonso/android-lollipop/128/Downloads-icon.png"
                          }
                          alt="Upload icon"
                          style={{ maxWidth: "50%", borderRadius: "50px" }}
                        />
                      </label>

                      <input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }} // Hide the input element visually
                      />
                    </div>
                  </form>
                </Box>
              </Box>
            )}

            <Box style={{ background: "#ff6e14" }}>
              <Button
                onClick={handleSubmit}
                sx={{
                  textAlign: "center",
                  paddingLeft: "11rem",
                  color: "white",
                }}
              >
                Submit
              </Button>
            </Box>

            
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
