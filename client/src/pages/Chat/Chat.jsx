import React, { useState } from 'react'
import Message from '../../components/chat-components/message-components/Message'
import Sidebar from '../../components/chat-components/Sidebar'

const Chat = () => {
  const [flag,setFlag] = useState(false)
  return (
    <>
    <div className="px-3 hidden sm:flex">
        <Sidebar/>
        <Message/>
    </div>
    <div className="px-3 flex sm:hidden">
        {!flag && <Sidebar flag={flag} setFlag={setFlag} />}
        {flag && <Message flag={flag} setFlag={setFlag} />}
    </div>
    </>
  )
}

export default Chat