import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { ChatContext } from "./ChatProvider";
// import { onAuthStateChanged } from "firebase/auth";
export const AuthContext = createContext(); 
const AuthProvider = ({children}) => {
  const {dispatch} = useContext(ChatContext); 
  const [currentUser, setCurrentUser] = useState({});

  useEffect(()=> {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      dispatch({
        type: 'CHANGE_USER',
        payload: {user:{},chatId: null}
      })
    }); 
    return () => unsubscribe();
  }, [dispatch])
  return (
    <AuthContext.Provider value={currentUser}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider