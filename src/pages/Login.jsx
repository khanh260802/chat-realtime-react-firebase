import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase';
import Loading from '../components/Loading';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    setLoading(true); 
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if(user) {
        setLoading(false)
        navigate("/");
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      setErr(true)
    }
  }
  if(loading) {
    return <div className='form-container'> <Loading /></div>; 
  }
  return (
    <div className='form-container'>
      <div className='form-wrapper'>
        <span className='logo'> Chat Pro </span> 
        <span className='title'> Login</span> 
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={(e)=> setEmail(e.target.value)} value={email} className='input' type="text" placeholder='Username' />
          <input onChange={(e)=> setPassword(e.target.value)} value={password} className='input' type="password" placeholder='Password' />
          <button className='button'>Sign in</button>
        </form>
        <span  className='text' >Don't have an account? <Link to="/register">Register</Link></span>
        {err && <span className='error-text'>Something went wrong</span>}
      </div>
    </div>
  )
}

export default Login