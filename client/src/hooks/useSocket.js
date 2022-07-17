import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'

const useSocket = () => {
    const socket = useRef()
    const [newMsgFlag,setNewMsgFlag] = useState(false)
    useEffect(()=> {
        socket.current = io(process.env.REACT_APP_API_URL)
    },[])
    return [newMsgFlag,setNewMsgFlag, socket]
}

export default useSocket