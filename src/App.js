import './App.css';
import Dashboard from './pages/Dashboard';
import { Routes,Route,BrowserRouter as Router } from 'react-router-dom';
import Signup from './pages/Signup';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useTheme } from './components/ThemeContext';
function App() {
       
 const{theme}=useTheme();

  return (
    <div className={theme?'darkmode':''}>
       <ToastContainer></ToastContainer>
        <Router>
          <Routes>
          <Route path="/" element={<Signup></Signup>}></Route> 
          
          <Route path="/Financetracker" element={<Signup></Signup>}></Route>  
         <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
          </Routes>
         </Router>
       
    </div>
  );
}

export default App;
