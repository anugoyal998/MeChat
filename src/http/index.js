import axios from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
    baseURL: 'https://mechat-server-anubhav.herokuapp.com',
    headers: {
        "Content-type": "application/json",
        Accept: "application/json",
    },
})

const at = Cookies.get('at')
const rt = Cookies.get('rt')

export const saveUser = (data)=> api.post('/api/saveUser', data)
export const saveUserEmailAndPassword = (data)=> api.post('/api/saveUserEmailAndPassword',data)
export const refreshToken = ()=> rt && Cookies.get('rt') && api.post(`/api/refresh`,{at,rt})
export const updateAvatar = (data)=> rt && Cookies.get('rt') && api.post(`/api/update-avatar`,{...data, at, rt})
export const updateName = (data)=> rt && Cookies.get('rt') && api.post('/api/update-name',{...data, at, rt})
export const logout = ()=> rt && Cookies.get('rt') && api.post('/api/logout',{at,rt})
export const getAllUsers = ()=> rt && Cookies.get('rt') && api.post(`/api/all-users`,{at,rt})
export const sendMsg = (data) => rt && Cookies.get('rt') && api.post(`/api/send-msg`,{...data, at, rt})
export const getMsgs = (data) => rt && Cookies.get('rt') && api.post(`/api/get-msgs`,{...data, at, rt})

export default api