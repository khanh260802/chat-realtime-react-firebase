import React, { useState } from 'react'
import Add from '../img/addAvatar.png'
import { auth, storage, db } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const Register = () => {
  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [file, setFile] = useState(null); 
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    setLoading(true); 
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password); 
      const user = userCredential.user;
      const date = new Date().getTime();
      let imgUrl = "https://firebasestorage.googleapis.com/v0/b/khanh-hoc-code.appspot.com/o/avatar-default.png?alt=media&token=de1491ed-6f66-480a-b7e4-af53ea538d36"; 
      if(file) {
        const storageRef = ref(storage, name+""+date );
        await uploadBytesResumable(storageRef, file);
        imgUrl = await getDownloadURL(storageRef);
      }
      
      await updateProfile(user, {
        displayName: name, 
        photoURL: imgUrl,
      })
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: name, 
        email,
        photoURL: imgUrl,
      })
      await setDoc(doc(db, "userChats", user.uid), {})
      setLoading(false)
      if(!err)
        navigate("/");
    } catch (error) {
      console.log(error)
      setErr(true)
    }
  }

  if(loading) {
    return (
      <div className='form-container'>  
        <Loading/>
      </div>
    )
  }
  
  return (
    <div className='form-container'>
      <div className='form-wrapper'>
        <span className='logo'> Chat Pro </span> 
        <span className='title'> Register</span> 
        <form className='form' onSubmit={handleSubmit}>
          <input value={name} onChange={(e)=>setName(e.target.value)} className='input' type="text" placeholder='Display name' />
          <input value={email} onChange={(e)=>setEmail(e.target.value)} className='input' type="email" placeholder='Email' required/>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} className='input' type="password" placeholder='Password' required/>
          <input onChange={(e)=>setFile(e.target.files[0])} style={{display: 'none'}} type="file" id='file'/>
          <label htmlFor='file' className='lable-file'>
            <img src={Add} alt="" className='img'/>
            <span>Add an avatar</span>
          </label>
          <button className='button'>Sign Up</button>
        </form>
        {err && <span className='error-text'> Something went wrong! </span>}
        <span  className='text' >Already have an account? <Link to="/login">Login</Link> </span>
      </div>
    </div>
  )
}

export default Register