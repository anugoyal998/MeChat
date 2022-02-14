import axios from 'axios'

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
        Accept: "application/json",
    },
})

export const sendOtp = (data) => api.post(`/api/send-otp`,data)
export const verifyOtp = (data) => api.post(`/api/verify-otp`,data)
export const refreshToken = ()=> api.get(`/api/refresh`)
export const updateAvatar = (data)=> api.post(`/api/update-avatar`,data)
export const getAllUsers = ()=> api.get(`/api/all-users`)
export const sendMsg = (data) => api.post(`/api/send-msg`,data)
export const getMsgs = (data) => api.post(`/api/get-msgs`,data)

export default api