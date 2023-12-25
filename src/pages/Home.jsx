import React from 'react'
import Sidebar from './../components/Sidebar';
import ChatContainer from './../components/ChatContainer';
const Home = () => {
  return (
    <div className='home'>
      <div className="container">
        <Sidebar/>
        <ChatContainer/>
      </div>
    </div>
  )
}

export default Home