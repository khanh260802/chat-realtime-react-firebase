import React, { useContext } from 'react'
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import containsVietnameseCharacter from './../utils/containsVietnameseCharacter';
import removeDiacritics from '../utils/removeDiacritics';
import { AuthContext } from './../contexts/AuthProvider';
import UserChat from './UserChat';
const Search = () => {

  const [users, setUsers] = useState([]);
  const [searchString, setSearchString] = useState(''); 
  const currentUser = useContext(AuthContext);
  
  useEffect(() => {
    async function getUsers() {
      const querySnapshot = await getDocs(collection(db, "users"));
      setUsers(querySnapshot.docs?.map(doc => {
        return doc.data(); 
      })?.filter((user) => {
        if(searchString==='all') return true; 
        if(!searchString || user.uid === currentUser.uid) 
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
  }, [searchString, currentUser]);

  return (
    <div className='search'>
      <input value={searchString} onChange={(e)=> setSearchString(e.target.value)} type="text" className="search-input" placeholder="Find the user (type 'all' to show all users)"/>
      <div className="users-group">
        {
          users.map((user) => {
            const clearName = removeDiacritics(user.displayName.toLowerCase()); 
            const clearSubString = searchString.toLowerCase()
            const pos = containsVietnameseCharacter(searchString) ? 
                user.displayName.toLowerCase().indexOf(clearSubString) : 
                clearName.indexOf(clearSubString);
            const len = searchString.length; 

            return <UserChat key={user.uid} user={user} pos={pos} len={len} isSearch={true} setSearchString={setSearchString}/>
          })
        }
      </div>
    </div>
  )
}

export default Search