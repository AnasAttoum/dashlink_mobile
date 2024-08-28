import { combineReducers } from "redux"
import Devices from "./Devices"
import Accessories from "./Accessories"
import Offers from "./Offers"


export const AllReducers = combineReducers({
    Devices: Devices,
    Accessories: Accessories,
    Offers: Offers,
})