import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
// import { onAuthStateChanged } from "firebase/auth";
export const AuthContext = createContext(); 
const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState({});
  useEffect(()=> {
    const unsubscribe = auth.onAuthStateChanged(user => setCurrentUser(user)); 
    return () => unsubscribe();
  }, [])
  return (
    <AuthContext.Provider value={currentUser}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider