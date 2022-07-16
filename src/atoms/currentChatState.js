import {atom} from 'recoil'

const currentChatState = atom({
    key: 'currentChatState',
    default: null
})

export default currentChatState