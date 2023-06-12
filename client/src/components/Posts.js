import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { clearAuth } from "../app/features/auth/authSlice";


function Posts() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const authState = useSelector((state) => {
    return state.auth
  })

  console.log(authState);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("authorization.user");
    dispatch(clearAuth())
    navigate("/login");
  }



  return (
    <div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Posts;
