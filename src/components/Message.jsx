import React, { useContext, useEffect, useRef } from 'react'
import { ChatContext } from '../contexts/ChatProvider';
import { AuthContext } from '../contexts/AuthProvider';

const Message = ({text, date, senderID, img, renderAvavar,theLast}) => {
  const currentUser = useContext(AuthContext);
  const {chatData} = useContext(ChatContext); 
  const {user} = chatData;
  const isOwner = senderID !== user.uid; 
  const ref = useRef(); 
  useEffect(() => { 
    theLast && ref.current?.scrollIntoView({behavior:'smooth'})
  }, [theLast])
  return (
    <div ref={ref} className={`message ${isOwner ?'owner' :''}`}>
        {renderAvavar && <div className="message-info">
          <img src={ isOwner ? currentUser.photoURL : user.photoURL} alt="" />
        </div>}
      <div className={`message-content ${renderAvavar ?'': (isOwner ?'shift-right':'shift-left') }`}>
        {text && <p>{text}</p>}
        {img && <img src={img} alt="" />}
      </div>
    </div>
  )
}

export default Message