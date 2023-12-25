import React from 'react'
import { ChatContext } from './../contexts/ChatProvider';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import combineUIDs from './../utils/combineUIDs';

const UserChat = ({user, pos, len, isSearch, lastmess}) => {
  const {dispatch, chatData} = useContext(ChatContext); 
  const userChose = chatData.user; 
  const currentUser = useContext(AuthContext);
  const handleSelect = async () => {
    const combineUID = combineUIDs(currentUser.uid, user.uid); 
    const docSnap = await getDoc(doc(db, "chats", combineUID)); 
    if(!docSnap.exists()) {
      dispatch({
        type: 'CHANGE_USER',
        payload: {user, chatId: null}
      })
    } else {
      dispatch({
        type: 'CHANGE_USER',
        payload: {user, chatId: combineUID}
      })
    }
  }
  return (
    <div className={`user-chat ${userChose.uid===user.uid ? 'active' : ''}`} key={user.uid} onClick={handleSelect}>
        <img className="img" src={user.photoURL} alt="" />
        <div className="info">
        <span className='name'>
        { isSearch ?
            user.displayName.split("").map((char, index) => {
            const oke = ( pos >= 0 && index >= pos && index < pos + len ) 
            return <b key={index} className={`${oke ? 'highlight' : ''} char`} >{char}</b>;
            }) : 
            user.displayName
        }
        </span>
          {lastmess && <p className='last-mess'>{ `${lastmess?.owner?"Bạn: ": ""} ${lastmess?.text || lastmess?.img}` }</p> }
        </div>
    </div>
  )
}

export default UserChat