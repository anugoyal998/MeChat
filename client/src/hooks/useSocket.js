import React, { useEffect, useRef, useState } from 'react'
import  { io }  from 'socket.io-client'

const useSocket = () => {
    const socket = useRef()
    const [newMsgFlag,setNewMsgFlag] = useState(false)
    useEffect(()=> {
        socket.current = io(import.meta.env.VITE_API_URL)
        // socket.current = io('http://localhost:5000')
    },[])
    return [newMsgFlag,setNewMsgFlag, socket]
}

export default useSocket