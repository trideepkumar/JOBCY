import './App.css';
import { Route, Routes } from 'react-router-dom';
import PublicRoutes from './utils/PublicRoutes';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Signup from './components/signup';
import Login from './components/login';
import Posts from './components/Posts';


function App() {
  return (
    
      <div className="App">
        <Routes>
          <Route  element={<PublicRoutes></PublicRoutes>}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route  element={<ProtectedRoutes></ProtectedRoutes>}>
          <Route path="/posts" element={<Posts />} />
          </Route>
          
          </Routes>
        
      </div>
  );
}

export default App;
