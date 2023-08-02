import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import axiosInstance from "../../../api/axiosinstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PostCard() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.get("/admin/getPosts");
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBlock = async (postId) => {
    const response = await axiosInstance.patch("/admin/blockpost", { postId });
    toast.success("Post deleted successfully", {
      className: "toast-success",
      bodyClassName: "toast-body",
      progressClassName: "toast-progress",
    });
    fetchPosts();
  };

  const handleUnblock = async (postId) => {
    const response = await axiosInstance.patch("/admin/unblockpost", {
      postId,
    });
    toast.success("Post recovered successfully");
    fetchPosts();
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Filter posts based on search query
  const filteredPosts = posts.filter((post) =>
    post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search posts"
      />

      <Box sx={{ marginTop: "5rem", marginLeft: "10rem" }}>
        {filteredPosts.map((post) => (
          <Box
            key={post._id}
            sx={{
              marginBottom: "1rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ToastContainer />
            <Card
              sx={{
                width: "50rem",
                height: "6rem",
                display: "flex",
                alignItems: "center",
                padding: "1rem",
                marginLeft: "4rem",
              }}
              className="orgCard"
            >
              <img
                src={post.media}
                alt="Posts image"
                style={{ width: "13rem", objectFit: "cover" }}
              />
              <CardContent>
                <Box>
                  <Typography variant="Subtitle2" fontWeight="bold">
                    {post.description}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    fontWeight="bold"
                  >
                    {post.location}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: "3rem" }}>
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" fontWeight="bold">
                      Likes
                    </Typography>
                    <Typography variant="body1">
                      {post.likes.length}
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" fontWeight="bold">
                      Created At
                    </Typography>
                    <Typography variant="body1">
                      {post.createdAt}
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1 }}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      color="red"
                    >
                      Reports
                    </Typography>
                    <Typography variant="body1" color="red">
                      {post.reported.length}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
              <Box sx={{ mt: 2, ml: "auto", gap: "3rem" }}>
                {post.isDeleted ? (
                  <Button
                    variant="outlined"
                    sx={{
                      ml: 1,
                      color: "green",
                      background: "white",
                      border: "0.1px solid green",
                    }}
                    onClick={() => {
                      handleUnblock(post._id);
                    }}
                  >
                    Recover
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    sx={{
                      ml: 1,
                      color: "red",
                      background: "white",
                      border: "0.1px solid red",
                    }}
                    onClick={() => {
                      handleBlock(post._id);
                    }}
                  >
                    Delete
                  </Button>
                )}
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
    </div>
  );
}

export default PostCard;
