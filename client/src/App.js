import './App.css';
import { Route, Routes } from 'react-router-dom';
import PublicRoutes from './utils/PublicRoutes';
import ProtectedRoutes from './utils/ProtectedRoutes';
import OrgProtectedRoutes from './utils/orgPrivateRoutes';
import OrgPublicRoutes from './utils/orgPublicRoutes';
import Signup from './components/signup';
import Login from './components/login';
import Posts from './components/userPages/Posts/Posts';
import Profile from './components/userPages/Profile/Profile';
import Home from './components/organisationPages/home';
import Jobposts from './components/organisationPages/Jobposts';
import Jobs from './components/organisationPages/Jobs';


function App() {
  return (
    
      <div className="App">
        <Routes>
          <Route  element={<PublicRoutes></PublicRoutes>}>
            <Route path="/signup" element={<Signup signupType='user' />} />
            <Route path="/login" element={<Login loginType="user" />} />
          </Route>

          <Route  element={<ProtectedRoutes></ProtectedRoutes>}>
          <Route path="/posts" element={<Posts />} />
          <Route path="/profile" element={<Profile/>} />
          </Route>

          <Route element={<OrgPublicRoutes></OrgPublicRoutes>}>
          <Route path="/organisation/signup" element={<Signup signupType='organisation' />} />
          <Route path="/organisation/login" element={<Login loginType="organisation" />} />
          </Route>

          <Route element={<OrgProtectedRoutes/>} >
          <Route path="/organisation/dashboard" element={<Home/>} />
          <Route path="/organisation/jobposts"  element={<Jobposts/>} />
          <Route path='/organisation/jobs' element={<Jobs/>}/>
          </Route>

          </Routes>
      </div>
  );
}

export default App;
