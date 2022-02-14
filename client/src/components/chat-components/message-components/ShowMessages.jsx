import React, { useEffect, useState } from 'react'
import { useRecoilValue } from "recoil";
import currentChatState from "../../../atoms/currentChatState";
import msgFunctions from '../../../functions/msgFunctions';

const ShowMessages = ({parentHeight}) => {
    const [msgs,setMsgs] = useState([])
    const currentChat = useRecoilValue(currentChatState);
    useEffect(() => {
        async function fetch(){
            await msgFunctions.getMsgs(currentChat?._id,setMsgs)
        }
        fetch()
    },[currentChat])
  return (
    <div id="show-messages" className={`mt-20`}>
        <p>anubhav</p>
    </div>
  )
}

export default ShowMessages