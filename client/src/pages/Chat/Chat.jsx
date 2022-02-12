import React from 'react'
import Message from '../../components/chat-components/message-components/Message'
import Sidebar from '../../components/chat-components/Sidebar'

const Chat = () => {
  return (
    <div className="px-3 flex">
        <Sidebar/>
        <Message/>
    </div>
  )
}

export default Chat