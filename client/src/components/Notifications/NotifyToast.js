import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotifyToast = () => {
  useEffect(() => {
    toast.success('Successful!', {
      autoClose: 3000,
    });
  }, []);

  return <div>NotifyToast</div>;
};

export default NotifyToast;
