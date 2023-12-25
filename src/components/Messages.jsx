import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../contexts/ChatProvider';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Messages = () => {
  const {chatData} = useContext(ChatContext); 
  const {chatId} = chatData; 
  const [messages, setMessages] = useState([]);
  useEffect(() => { 
    if(chatId) {
      (async () => { 
        const unSub = await onSnapshot(doc(db, "chats", chatId), (doc) => {
          if(doc.exists()) {
            setMessages([...doc.data().messages]); 
          }
        });
  
        return () => {
          unSub();
        }
      })()
    } else {
      setMessages([]);
    }
  }, [chatId])
  return (
    <div className='messages'>
        { 
            messages.map((item) => (
                <Message key={item.id} text={item?.text} date={item.date} senderID={item.senderID} img={item?.img}/>
            ))
        }
    </div>
  )
}

export default Messages