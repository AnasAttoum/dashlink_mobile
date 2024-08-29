import { LOG_IN, LOG_OUT } from "./actionTypes"

const adminData = {
    username: 'admin',
    password: '012345',
    isLogged: true
}

export default function Admin(state = adminData, action) {
    switch (action.type) {
        case LOG_IN:
            return { ...state, isLogged: true }

        case LOG_OUT:
            return { ...state, isLogged: false }

        default:
            return state
    }
}
