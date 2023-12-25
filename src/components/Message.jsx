import React, { useContext } from 'react'
import { ChatContext } from '../contexts/ChatProvider';
import { AuthContext } from '../contexts/AuthProvider';

const Message = ({text, date, senderID, img}) => {
  const currentUser = useContext(AuthContext);
  const {chatData} = useContext(ChatContext); 
  const {user} = chatData;
  const isOwner = senderID !== user.uid; 
  return (
    <div className={`message ${isOwner ?'owner' :''}`}>
      <div className="message-info">
        <img src={ isOwner ? currentUser.photoURL : user.photoURL} alt="" />
        <span>just now</span>
      </div>
      <div className="message-content">
        <p>{text}</p>
        {img && <img src={img} alt="" />}
      </div>
    </div>
  )
}

export default Message