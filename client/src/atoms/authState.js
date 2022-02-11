import {atom} from 'recoil'

const authState = atom({
    key: 'atomState',
    default: {
        isAuth: false,
        user: null,
        otp: null,
    }
})

export default authState