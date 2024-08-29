import { ADD_ACCESSORY, ADD_DEVICE, ADD_NOTIFICATION, ADD_OFFER, DELETE_ACCESSORY, DELETE_DEVICE, DELETE_OFFER, EDIT_ACCESSORY, EDIT_DEVICE, EDIT_OFFER, LOG_IN, LOG_OUT } from "./actionTypes";

// Device Actions
export const addDevice = (obj) => ({
    type: ADD_DEVICE,
    payload: obj
})

export const editDevice = (index, obj) => ({
    type: EDIT_DEVICE,
    payload: { index: index, obj: obj }
})

export const deleteDevice = (arr) => ({
    type: DELETE_DEVICE,
    payload: arr
})


// Accessory Actions
export const addAccessory = (obj) => ({
    type: ADD_ACCESSORY,
    payload: obj
})

export const editAccessory = (index, obj) => ({
    type: EDIT_ACCESSORY,
    payload: { index: index, obj: obj }
})

export const deleteAccessory = (arr) => ({
    type: DELETE_ACCESSORY,
    payload: arr
})


// Offer Actions
export const addOffer = (obj) => ({
    type: ADD_OFFER,
    payload: obj
})

export const editOffer = (index, obj) => ({
    type: EDIT_OFFER,
    payload: { index: index, obj: obj }
})

export const deleteOffer = (arr) => ({
    type: DELETE_OFFER,
    payload: arr
})


// LogIn Actions
export const logIn = () => ({
    type: LOG_IN,
})
export const logOut = () => ({
    type: LOG_OUT,
})


// Notifiaction Actions
export const addNotification = (notification) => ({
    type: ADD_NOTIFICATION,
    payload:notification
})