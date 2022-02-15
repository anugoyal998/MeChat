import {atom} from 'recoil'

const activeUsersState = atom({
    key: 'activeUsersState',
    default: []
})

export default activeUsersState