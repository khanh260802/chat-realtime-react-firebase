import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../firebase'
import { AuthContext } from './../contexts/AuthProvider';

const Navbar = () => {
  const currentUser = useContext(AuthContext);
  console.log(currentUser)
  return (
    <div className='navbar'>
      <div className="logo">Chat Pro</div>
      <div className="user">
        <img src={currentUser.photoURL} alt="" className="img" />
        <span className="name"> {currentUser.displayName} </span>
        <button className="logout" onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar