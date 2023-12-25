import React, { useContext, useState } from 'react'
import Attach from '../img/attach.png'
import Img from '../img/img.png'
import Send from '../img/send.png'
import combineUIDs from './../utils/combineUIDs';
import { ChatContext } from '../contexts/ChatProvider';
import { AuthContext } from './../contexts/AuthProvider';
import { arrayUnion, doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
const Input = () => {
  const [file, setFile] = useState(null); 
  const [mess, setMess] = useState('');
  const currentUser = useContext(AuthContext);
  const {chatData, dispatch} = useContext(ChatContext); 
  const {user}= chatData; 
  const handleSend = async () => {
    if((!mess && !file) || (Object.keys(user).length === 0)) return;
    setMess(''); 
    setFile(null); 
    const combineUID = combineUIDs(currentUser.uid, user.uid); 
    const docSnap = await getDoc(doc(db, "chats", combineUID)); 
    // const date = new Date().getTime();
    let imgUrl = ""; 
    if(file) {
      const storageRef = ref(storage, combineUID+""+ Date.now() );
      await uploadBytesResumable(storageRef, file);
      imgUrl = await getDownloadURL(storageRef);
    }

    // for chats
    if(!docSnap.exists()) {
      await setDoc(doc(db, 'chats', combineUID), {
          messages : [
            {
              id: combineUID+""+Date.now(),
              text: mess, 
              senderID: currentUser.uid,
              date: Date.now(), 
              ...(file && { img: imgUrl } )
            }
          ]
      })
      dispatch({
        type: 'CHANGE_USER',
        payload: {user, chatId: combineUID}
      })
    } else {
      await updateDoc(doc(db, 'chats', combineUID), {
        messages: arrayUnion({
          id: combineUID+""+Date.now(),
          text: mess, 
          senderID: currentUser.uid,
          date: Date.now(), 
          ...(file && { img: imgUrl } )
        })
      })
    }
    // for userChats
    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [combineUID+".lastMessage"]: {
        owner: true,
        text: mess, 
        ...(file && { img: imgUrl } )
      },
      [combineUID+".date"]: serverTimestamp(), 
      [combineUID+".info"]: {
        displayName: user.displayName, 
        photoURL: user.photoURL, 
        uid: user.uid
      }
    })
    await updateDoc(doc(db, 'userChats', user.uid), {
      [combineUID+".lastMessage"]: {
        owner: false,
        text: mess, 
        ...(file && { img: imgUrl } )
      },
      [combineUID+".date"]: serverTimestamp(), 
      [combineUID+".info"]: {
        displayName: currentUser.displayName, 
        photoURL: currentUser.photoURL, 
        uid: currentUser.uid
      }
    })
  }
  return (
    <div className="input">
      <input value={mess} type="text" placeholder='Type something...' onChange={(e)=>setMess(e.target.value)} onKeyDown={(e)=>{
        if(e.key === 'Enter')   
          handleSend(); 
      }}/>
      <div className="send">
        <img src={Attach} alt="" />
        <input  style={{display:'none'}} type="file" id='file' onChange={(e)=>setFile(e.target.files[0])}/>
        <label htmlFor="file">
          <img src={Img} alt="" id='file'/>
        </label>
        <button onClick={handleSend}>
          <img src={Send} alt="" id='file' />
        </button>
      </div>
    </div>
  )
}

export default Input