import * as React from 'react';
import {useState} from 'react';
import Drawer from './components/drawer-component';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import Login from './components/login-component';
import SignUp from './components/signup-component';
import InfoComponent from './components/hospital/info-component';
import AuthService from './service/auth-service';
import AddInfoComponent from './components/hospital/add-info-component';
import {Footer} from './components/Layout'
import InsuranceHome from './Pages/insurance/InsuranceHome';



export default function MyApp() {
  let [currentUser , setCurrentUser] = useState(AuthService.getCurrentUser());

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login  />} />
        <Route path='/home' element={<Drawer currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/hospitalhome" element={<InfoComponent />} />
        <Route path="/add-info" element={<AddInfoComponent />} />
        <Route path="/insurancehome" element={<InsuranceHome />} />
      </Routes>
      
      
    </div>
  );
}

