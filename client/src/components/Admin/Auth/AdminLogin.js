import React from 'react';
import Login from '../../../components/login';

function AdminLogin() {
  return (
    <div>
      <h2>Admin Login</h2>
      <Login loginType="admin" />
    </div>
  );
}

export default AdminLogin;
