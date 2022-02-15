import React, { useState } from 'react'
import Message from '../../components/chat-components/message-components/Message'
import Sidebar from '../../components/chat-components/Sidebar'

const Chat = ({socket}) => {
  const [flag,setFlag] = useState(false)
  return (
    <>
    <div className="px-3 hidden sm:flex">
        <Sidebar/>
        <Message socket={socket}/>
    </div>
    <div className="px-3 flex sm:hidden">
        {!flag && <Sidebar flag={flag} setFlag={setFlag} />}
        {flag && <Message socket={socket} flag={flag} setFlag={setFlag} />}
    </div>
    </>
  )
}

export default Chat