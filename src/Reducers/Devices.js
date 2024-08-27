import { ADD_DEVICE, DELETE_DEVICE, EDIT_DEVICE } from "./actionTypes"

const devices = [
    { image: '/Images/Devices/Lenovo Z6 Pro 5G.jpg', name: 'Lenovo Z6 Pro', date: new Date('2019, November 15'), ram: [6, 8, 8, 12], storage: [128, 128, 256, 512], price: [400, 452, 480, 500] },
    { image: '/Images/Devices/Xiaomi 13 Pro.jpg', name: 'Xiaomi 13 Pro', date: new Date('2022, December 14'), ram: [8, 8, 12], storage: [128, 256, 512], price: [867, 899.95, 920] },
    { image: '/Images/Devices/Xiaomi 13.jpg', name: 'Xiaomi 13', date: new Date('2023, September 26'), ram: [8, 12], storage: [256, 256], price: [374.06, 390] },
    { image: '/Images/Devices/Xiaomi Mi 8 Lite.jpg', name: 'Xiaomi Mi 8 Lite', date: new Date('2018, September 1'), ram: [4, 6, 4], storage: [64, 64, 128], price: [360, 390.99, 462] },
    { image: '/Images/Devices/Xiaomi Mi 10T.jpg', name: 'Xiaomi Mi 10T', date: new Date('2020, October 13'), ram: [6, 8], storage: [128, 128], price: [269, 290] },
    { image: '/Images/Devices/Xiaomi Redmi 10.jpg', name: 'Xiaomi Redmi 10', date: new Date('2021, August 20'), ram: [4, 4, 6], storage: [64, 64, 128], price: [112.99, 135, 150] },
    { image: '/Images/Devices/XIAOMI Redmi Note 9.jpg', name: 'XIAOMI Redmi Note 9', date: new Date('2020, May 12'), ram: [3, 4, 4, 6], storage: [64, 64, 128, 128], price: [129.99, 135, 150, 175] },
]

export default function Devices(state = devices, action) {
    switch (action.type) {
        case ADD_DEVICE:
            return [...state,action.payload]

        case EDIT_DEVICE:
            return state.map((device, index) => {
                if (index === parseInt(action.payload.index)) {
                    return action.payload.obj
                }
                else {
                    return device
                }
            })


        case DELETE_DEVICE:
            return state.filter((_, index) => {
                return !action.payload.includes(index)
            })

        default:
            return state
    }
}
