import React from 'react'
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import containsVietnameseCharacter from './../utils/containsVietnameseCharacter';
import removeDiacritics from '../utils/removeDiacritics';
const Search = () => {

  const [users, setUsers] = useState([]);
  const [searchString, setSearchString] = useState(''); 

  useEffect(() => {
    async function getUsers() {
      const querySnapshot = await getDocs(collection(db, "users"));
      setUsers(querySnapshot.docs?.map(doc => {
        return doc.data(); 
      })?.filter((user) => {
        if(!searchString) 
          return false; 
        const userName = user.displayName.toLowerCase(); 
        const subString = searchString.toLowerCase(); 
        if( containsVietnameseCharacter(subString) ) {
          return userName.includes(subString)
        } else {
          
          return removeDiacritics(userName).includes(subString)
        }
      }));
    }
    getUsers();
  }, [searchString])

  return (
    <div className='search'>
      <input value={searchString} onChange={(e)=> setSearchString(e.target.value)} type="text" className="search-input" placeholder='Find the user'/>
      <div className="users-group">
        {
          users.map((user) => {
          const clearName = removeDiacritics(user.displayName.toLowerCase()); 
          const clearSubString = searchString.toLowerCase()
          const id = containsVietnameseCharacter(searchString) ? 
              user.displayName.toLowerCase().indexOf(clearSubString) : 
              clearName.indexOf(clearSubString);
          const len = searchString.length; 
          console.log(id);
          console.log(len);
          return(
              <div className="user-chat" key={user.uid}>
                <img className="img" src={user.photoURL} alt="" />
                <div className="info">
                  <span className='name'>{
                    user.displayName.split("").map((char, index) => {
                      const oke = ( id >= 0 && index >= id && index < id + len ) 
                      return <b key={index} className={`${oke ? 'highlight' : ''} char`} >{char}</b>;
                    })
                  }</span>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Search