import React, { useEffect } from "react";
import searchImg from "../../assets/searchImg.svg";
import userimg from '../../assets/user.jpg';
import './style.css';
import { auth } from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTheme } from "../ThemeContext";

function Header(){
    const navigate=useNavigate();
    const [user,loading]=useAuthState(auth)
    const{setTheme,theme}=useTheme();
useEffect(()=>{
   
  if(user){
     navigate("/dashboard");}
},[user,loading]);
if(theme==='darkmode'){
  document.body.style.background='#282525';
 }
 else{
  document.body.style.background='';
 }
function switchmode(){
  if(theme==='darkmode'){
    setTheme('');
    localStorage.setItem('financetheme',JSON.stringify(''));
  } 
  else{ setTheme('darkmode');
  localStorage.setItem('financetheme',JSON.stringify('darkmode'));
  }
  }
   function logoutFnc(){
    try{
        signOut(auth).then(() => {
            // Sign-out successful.
            toast.success("Log out successfully")
            navigate("/")
          }).catch((error) => {
            // An error happened.
            toast.error(error);
          });  
          
    }
    catch(e){ toast.error(e.message)}
   }

    return (
    <div className="navbar">
      <p className="logo link">Financly.
      </p>
         
      {theme==='darkmode'?
      <p onClick={switchmode} style={{cursor:"pointer",paddingRight:'2rem'}}> Switch LightMode</p>
      :(<p onClick={switchmode} style={{cursor:"pointer",paddingRight:'2rem'}}>Switch NightMode</p>)}
     {user &&
    (
      <div style={{display:"flex",
      alignItems:"center",gap:"0.5rem",paddingRight:"2rem"}}>
      <img src={user.photoURL?user.photoURL:userimg}  
      width={"30px"} height="30px" 
      style={{borderRadius:"50%"}}/>
    <p className="link" onClick={logoutFnc}>Logout</p>
     </div> )}
    </div>
)
}
export  default Header;