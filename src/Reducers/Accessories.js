import { ADD_ACCESSORY, DELETE_ACCESSORY, EDIT_ACCESSORY } from "./actionTypes"

const accessories = [
    { image: '/Images/Accessories/Cover Soft Silicone Cute Back Case.jpg', name: 'Cover Soft Silicone Cute Back Case', device: ['Lenovo Z6 Pro'], price: 13 },
    { image: '/Images/Accessories/Cover case Ultra-thin soft clear back silicone.jpg', name: 'Cover case Ultra-thin soft clear back silicone', device: ['Lenovo Z6 Pro'], price: 18 },
    { image: '/Images/Accessories/Phone Cover Soft Silicone Cute Back Case.jpg', name: 'Phone Cover Soft Silicone Cute Back Case', device: ['Lenovo Z6 Pro'], price: 8 },
    { image: '/Images/Accessories/Satin White - Marble Xiaomi Redmi Note 13 Pro 5G Case.jpg', name: 'Satin White Xiaomi Redmi Note 13 Pro 5G phone case cover', device: ['Xiaomi 13 Pro'], price: 16 },
    { image: '/Images/Accessories/Charger.jpg', name: 'Fast Charger Cable', device: ['Lenovo Z6 Pro','Xiaomi 13 Pro','Xiaomi Mi 8 Lite'], price: 40 },
    { image: '/Images/Accessories/Mobilcover Xiaomi Mi 8 Lite KSIX, Pink.jpg', name: 'Mobile cover Pink', device: ['Xiaomi Mi 8 Lite'], price: 22 },
    { image: '/Images/Accessories/Capinha Silicone Xiaomi Redmi Note 9 Aveludada Branco.jpg', name: 'Mobile cover white design', device: ['XIAOMI Redmi Note 9'], price: 19.95 },
    { image: '/Images/Accessories/Handyhülle, Hülle für Xiaomi Redmi Note 9 - TPU Silikon Handy Schutzhülle Cover Case.jpg', name: 'Mobile cover white', device: ['XIAOMI Redmi Note 9'], price: 22 },
]

export default function Accessories(state = accessories, action) {
    switch (action.type) {
        case ADD_ACCESSORY:
            return [...state, action.payload]

        case EDIT_ACCESSORY:
            return state.map((accessory, index) => {
                if (index === parseInt(action.payload.index)) {
                    return action.payload.obj
                }
                else {
                    return accessory
                }
            })

            case DELETE_ACCESSORY:
            return state.filter((_, index) => {
                return !action.payload.includes(index)
            })

        default:
            return state
    }
}
