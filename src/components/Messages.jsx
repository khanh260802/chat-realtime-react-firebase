import React, { useContext, useEffect, useRef, useState } from 'react'
import Message from './Message'
import { ChatContext } from '../contexts/ChatProvider';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Messages = () => {
  const {chatData} = useContext(ChatContext); 
  const {chatId} = chatData; 
  const [messages, setMessages] = useState([]);
  const senderID = useRef("adsf"); 
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
            messages.map((item, index) => {
                const renderAvavar = (item.senderID !== senderID.current); 
                senderID.current = item.senderID;
                return <Message 
                  key={item.id} 
                  text={item?.text} 
                  date={item.date} 
                  senderID={item.senderID} 
                  img={item?.img} 
                  renderAvavar={index===0 ||renderAvavar}
                  theLast={index===messages.length-1}
                />
              }
            ).reverse()
        }
    </div>
  )
}

export default Messages