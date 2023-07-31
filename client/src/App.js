import "./App.css";
import { Route, Routes } from "react-router-dom";
import PublicRoutes from "./utils/PublicRoutes";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import OrgProtectedRoutes from "./utils/orgPrivateRoutes";
import OrgPublicRoutes from "./utils/orgPublicRoutes";
import AdminPublicRoutes from "./utils/adminPublic";
import AdminProtectedRoutes from "./utils/adminProtected";
import Signup from "./components/signup";
import Login from "./components/login";
import Posts from "./components/userPages/Posts/Posts";
import Profile from "./components/userPages/Profile/Profile";
import Home from "./components/organisationPages/home";
import Jobposts from "./components/organisationPages/Jobposts";
import Jobs from "./components/organisationPages/Jobs";
import Userjob from "./components/userPages/Userjob/Userjob";
import AddFriends from "./components/userPages/Addfriends/AddFriends";
import OrgProfile from "./components/organisationPages/Profile/OrgProfile";
import AdminLogin from "./components/Admin/Auth/AdminLogin";
import Dashboard from "./components/Admin/AdminPages/Dashboard";
import UserManagement from "./components/Admin/AdminPages/UserManagement";
import OrganisationManagement from "./components/Admin/OrganisationManagement/OrganisationManagement";
import JobManagement from "./components/Admin/AdminPages/JobManagement";
import PostManagement from "./components/Admin/AdminPages/PostManagement";
import Chat from "./components/userPages/Chat/UserChat";
import UserprofileModal from "./components/organisationPages/Modals/UserprofileModal";
import SentMail from "./components/organisationPages/Modals/SentMail";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import Landing from "./components/userPages/Landing/Landing";
import FriendsProfile from "./components/userPages/Profile/FriendsProfile";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PublicRoutes></PublicRoutes>}>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup signupType="user" />} />
          <Route path="/login" element={<Login loginType="user" />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/profile/:friendId"  element={<FriendsProfile />}
          />
        </Route>

        <Route element={<ProtectedRoutes></ProtectedRoutes>}>
          <Route path="/posts" element={<Posts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/jobs" element={<Userjob />} />
          <Route path="/friends" element={<AddFriends />} />
          <Route path="/chats" element={<Chat />} />
        </Route>

        <Route element={<OrgPublicRoutes></OrgPublicRoutes>}>
          <Route
            path="/organisation/signup"
            element={<Signup signupType="organisation" />}
          />
          <Route
            path="/organisation/login"
            element={<Login loginType="organisation" />}
          />
        </Route>

        <Route element={<OrgProtectedRoutes />}>
          <Route path="/organisation/dashboard" element={<Home />} />
          <Route path="/organisation/jobposts" element={<Jobposts />} />
          <Route path="/organisation/jobs" element={<Jobs />} />
          <Route path="/organisation/profile" element={<OrgProfile />} />
          <Route
            path="/organisation/profile/:userId"
            element={<UserprofileModal />}
          />
          <Route
            path="/organisation/sentEmail/:userId"
            element={<SentMail />}
          />
        </Route>

        <Route element={<AdminPublicRoutes></AdminPublicRoutes>}>
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>

        <Route element={<AdminProtectedRoutes></AdminProtectedRoutes>}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/user" element={<UserManagement />} />
          <Route
            path="/admin/organisation"
            element={<OrganisationManagement />}
          />
          <Route path="/admin/jobs" element={<JobManagement />} />
          <Route path="/admin/posts" element={<PostManagement />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
