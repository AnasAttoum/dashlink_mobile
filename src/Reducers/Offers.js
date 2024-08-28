import { ADD_OFFER, DELETE_OFFER, EDIT_OFFER } from "./actionTypes"

const offers = [
    { device: 'Lenovo Z6 Pro', accessories: ['Cover Soft Silicone Cute Back Case', 'Fast Charger Cable'], oldPrice: '505', sale: '10', endDate: new Date('2024, November 9'), version: 1 },
    { device: 'Xiaomi 13 Pro', accessories: ['Xiaomi 13 Pro', 'Satin White Xiaomi Redmi Note 13 Pro 5G phone case cover','Fast Charger Cable'], oldPrice: '976', sale: '25', endDate: new Date('2025, November 15'), version: 2 },
]

export default function Offers(state = offers, action) {
    switch (action.type) {
        case ADD_OFFER:
            return [...state, action.payload]

        case EDIT_OFFER:
            return state.map((accessory, index) => {
                if (index === parseInt(action.payload.index)) {
                    return action.payload.obj
                }
                else {
                    return accessory
                }
            })

        case DELETE_OFFER:
            return state.filter((_, index) => {
                return !action.payload.includes(index)
            })

        default:
            return state
    }
}
