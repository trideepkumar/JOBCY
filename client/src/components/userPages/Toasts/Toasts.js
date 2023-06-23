import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Toasts() {

    const notify = () =>
    toast("Job already applied", {
      progressClassName: "custom-progress",
      progressStyle: {
        background: "#ff6e14",
      },
    });
    notify();
  return (
    <div>
        <ToastContainer/>
    </div>
  )
}

export default Toasts