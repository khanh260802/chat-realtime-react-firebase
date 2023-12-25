import React, { useContext } from 'react'
import Add from '../img/add.png'; 
import Cam from '../img/cam.png'; 
import More from '../img/more.png'; 
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../contexts/ChatProvider';
const ChatContainer = () => {
  const {chatData} = useContext(ChatContext); 
  const {user} = chatData; 
  return (
    <div className='chat-container'>
      <div className="chat-info">
        <span> {user?.displayName} </span>
        <div className="chat-icons">
          <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages/>
      <Input />
    </div>
  )
}

export default ChatContainer