import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase';
import { AuthContext } from '../contexts/AuthProvider';
import UserChat from './UserChat';

const Chats = () => {
  const [users, setUsers] = useState([]);
  const currentUser = useContext(AuthContext);
  
  useEffect(() => { 
    (currentUser.uid && (async () => { 
      const unsub = await onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setUsers(Object.entries(doc.data()))
      });
      return () => {
        unsub();
      }
    })())
  }, [currentUser.uid])
  return (
    <div className="chats">
      {users.sort((a, b)=> b[1].date - a[1].date).map((user) => (
        <UserChat user={user[1].info} key={user[0]} lastmess={user[1].lastMessage} isSearch={false}/>
      ))}
    </div>
  )
}

export default Chats