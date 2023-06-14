import './App.css';
import { Route, Routes } from 'react-router-dom';
import PublicRoutes from './utils/PublicRoutes';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Signup from './components/signup';
import Login from './components/login';
import Posts from './components/userPages/Posts/Posts';
import Profile from './components/userPages/Profile/Profile';



function App() {
  return (
    
      <div className="App">
        <Routes>
          <Route  element={<PublicRoutes></PublicRoutes>}>
            <Route path="/signup" element={<Signup signupType='user' />} />
            <Route path="/organisation/signup" element={<Signup signupType='organisation' />} />
            <Route path="/login" element={<Login loginType="user" />} />
            <Route path="/organisation/login" element={<Login loginType="organisation" />} />
          </Route>

          <Route  element={<ProtectedRoutes></ProtectedRoutes>}>
          <Route path="/posts" element={<Posts />} />
          <Route path="/profile" element={<Profile/>} />
          </Route>



         
          
          </Routes>
        
      </div>
  );
}

export default App;
