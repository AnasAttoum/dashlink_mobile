import { combineReducers } from "redux"
import Devices from "./Devices"
import Accessories from "./Accessories"
import Offers from "./Offers"
import Admin from "./Admin"
import Notification from "./Notification"


export const AllReducers = combineReducers({
    Devices: Devices,
    Accessories: Accessories,
    Offers: Offers,
    Admin: Admin,
    Notification: Notification,
})