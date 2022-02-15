import React, { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

const useSocket = () => {
    const socket = useRef()
    useEffect(()=> {
        socket.current = io(process.env.REACT_APP_API_URL)
    },[])
    return socket
}

export default useSocket