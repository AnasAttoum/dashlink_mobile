import { ADD_NOTIFICATION } from "./actionTypes"

const notification = []

export default function Notification(state = notification, action) {
    switch (action.type) {
        case ADD_NOTIFICATION:
            return [...state,action.payload]

        default:
            return state
    }
}
