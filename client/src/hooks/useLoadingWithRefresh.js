import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import {useRecoilState} from 'recoil'
import authState from '../atoms/authState'
import { refreshToken } from "../http";

export const useLoadingWithRefresh = ()=> {
    const [loading, setLoading] = useState(true);
    const [auth,setAuth] = useRecoilState(authState)
    const url = process.env.REACT_APP_API_URL || "http://localhost:5000";
    useEffect(()=> {
        (async ()=> {
            try {
                const {data} = await refreshToken()
                setAuth(prev=> ({...prev, user: {
                    _id: data?.user?._id,
                    name: data?.user?.name,
                    phone: data?.user?.phone,
                    avatar: data?.user?.avatar
                }}))
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        })()
    },[])
    return {loading}
}