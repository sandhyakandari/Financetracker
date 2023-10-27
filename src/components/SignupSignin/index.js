import { useState } from "react";
import Input from "../input/Index";
import {signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth";
import './style.css'
import Button from "../Button";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { toast } from "react-toastify";
import { auth,db,provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
const SignupSignin=()=>{
    const [name,Setname]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPass]=useState("");
    const[confirm,setConfirmpass]=useState("");
 const[loading,setLoading]=useState(false);
 const[loginform,SetLoginform]=useState(false);
 const navigate=useNavigate();

    function signupwithEmail(){
   setLoading(true);
     if(name!="" && email!="" && password!=""
     && confirm!="")
     { if(password===confirm) {
     createUserWithEmailAndPassword(auth , email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        toast.success('user registerd')
        setLoading(false);
        createDoc(user);

       navigate('/dashboard');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
       toast.error(errorMessage);
       setLoading(false); 
       // ..
} 
);}
else { toast.error("Password and confirm password don't match")
  setLoading(false);
} }

 else{
     toast.error("All fields are mandatory")
      setLoading(false);
}
 }
 
 
 function googleAuth(){
  setLoading(true);
    try{
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      createDoc(user);
      setLoading(false);
      navigate('/dashboard')
      toast.success("userAutheniticated")
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
     toast.error(errorMessage);
    });
  }
  catch(err){
   toast.error(err);
  }


 }
 function LoginUsingEmail(){
    if(email!="" && password!=""){

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          toast.success('User Logged In');
          console.log("user Logged in",user);
       navigate('/dashboard');
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
         toast.error(errorMessage);
        });
    }
    else{
        toast.error('All fields are mandatory')
    }
 }
 async function createDoc(user){
    setLoading(true);
    if(!user) return;
    const userRef=doc(db,"users",user.uid);
    const userData=await getDoc(userRef);
    if(!userData.exists()){
    try {await setDoc(doc(db, "users", user.uid),
     {
        name:user.displayName?user.displayName:name,
        email:user.email,
        photoURL:user.photoURL?user.photoURL:"",
        createdAt:new Date(),
     });
   // toast.success("Doc created")
     setLoading(false);
}catch(e){
        toast.error(e.message);
        setLoading(false);
    } }
else {
   // toast.error("doc already exists")
    setLoading(false)
}  }
 return(
    <>
<Header></Header>

    {loginform?( 
      <div className='signupwraper'>
      <h2 className="title">
          LogIn <span style={{color:"var--(theme)"}}>Financly</span>
      </h2>
      <form>
          <Input
              type={'text'}
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={'John@gmail.com'}
          ></Input>
          <Input
              type={'password'}
              label={"Password"}
              state={password}
              setState={setPass}
              placeholder={'Your Password'}
          ></Input>
           <Button disabled={loading} text={loading ? "loading...":"Login Using Email and Password" } onClick={LoginUsingEmail}></Button>
              <p style={{textAlign:"center",margin:0,color:"var(--black)"}}>or </p>
              <Button onClick={googleAuth} text={"sigin using Google"} blue={true}></Button>
              <p onClick={()=>SetLoginform(false)} style={{cursor:"pointer",textAlign: "center",margin:0,color:"var(--black)"}}>Or Don't Have An Account? Click Here</p>
      </form>
  </div> 

    ):(
           
    
    <div className='signupwraper'>
    <h2 className="title">
        Sign Up on <span style={{color:"var(--theme)"}}>Financly</span>
    </h2>
    <form>
        <Input
            type={'text'}
            label={"full Name"}
            state={name}
            setState={Setname}
            placeholder={'John Doe'}
        ></Input>
        
        <Input
            type={'text'}
            label={"Email"}
            state={email}
            setState={setEmail}
            placeholder={'Jhon@gmail.com'}
        ></Input>
        
        <Input
            type={'password'}
            label={"Password"}
            state={password}
            setState={setPass}
            placeholder={'Your Password'}
        ></Input>
                    <Input
            type={'password'}
            label={"Confirm Password"}
            state={confirm}
            setState={setConfirmpass}
            placeholder={'Confirm Password'}
        ></Input>
<br></br>
        <Button disabled={loading} 
        text={loading ? "loading...":
         "Signup Using Email and Password" }
          onClick={signupwithEmail}></Button>
            <p onClick={()=>SetLoginform(true)} 
            style={{textAlign:"center",margin:"0.4rem",color:"var(--black)"}}>
              or </p>
            <Button onClick={googleAuth} text={"signup using Google"} blue={true}></Button>
            <p onClick={()=>SetLoginform(true)} style={{ cursor:"pointer",textAlign:"center",color:"var(--black)"}}>
              Or Already Have An Account? Click Here</p>
   
    </form>
</div>
)}
    
    </>
 )
}
export default SignupSignin;