import React from 'react'

const Search = () => {
  return (
    <div className='search'>
      <input type="text" className="search-input" placeholder='Find the user'/>
      <div className="users-group">
        <div className="user-chat">
          <img className="img" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
          <div className="info">
            <span className='name'>John</span>
          </div>
        </div>
        <div className="user-chat">
          <img className="img" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
          <div className="info">
            <span className='name'>John</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search