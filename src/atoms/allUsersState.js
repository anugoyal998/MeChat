import {atom} from 'recoil'

const allUsersState = atom({
    key: 'allUsersState',
    default: []
})

export default allUsersState