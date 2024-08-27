import { DELETE_DEVICE, EDIT_DEVICE } from "./actionTypes";

// Device Actions
export const editDevice = (index, obj) => ({
    type: EDIT_DEVICE,
    payload: { index: index, obj: obj }
})

export const deleteDevice = (arr) => ({
    type: DELETE_DEVICE,
    payload: arr
})