import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotifyToast = ({ onClose }) => {
  useEffect(() => {
    const toastId = toast.success("Successfully updated !!!", {
      progressClassName: "custom-progress",
      progressStyle: {
        background: "#ff6e14",
      },
      onClose: onClose,
    });

    return () => {
      toast.dismiss(toastId);
    };
  }, [onClose]);

  return <ToastContainer />;
};

export default NotifyToast;
