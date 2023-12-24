import React from 'react'
import Attach from '../img/attach.png'
import Img from '../img/img.png'
import Send from '../img/send.png'
const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder='Type something...' />
      <div className="send">
        <img src={Attach} alt="" />
        <input  style={{display:'none'}} type="file" id='file'/>
        <label htmlFor="file">
          <img src={Img} alt="" id='file'/>
        </label>
        <button>
          <img src={Send} alt="" id='file'/>
        </button>
      </div>
    </div>
  )
}

export default Input