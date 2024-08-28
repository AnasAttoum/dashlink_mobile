import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AddIcon from '@mui/icons-material/Add';

export const links = [
    { name: 'Our Devices', url: '/devices', icon: <PhoneIphoneIcon /> },
    { name: 'Our Accessories', url: '/accessories', icon: <HeadphonesIcon /> },
    { name: 'Our Offers', url: '/offers', icon: <LocalOfferIcon /> },
]

export const subLinks = [
    { name: 'Add Device', url: '/devices/add', icon: <><PhoneIphoneIcon /><AddIcon /></> },
    { name: 'Add Accessory', url: '/accessories/add', icon: <><HeadphonesIcon /><AddIcon /></> },
    { name: 'Add Offer', url: '/offers/add', icon: <><LocalOfferIcon /><AddIcon /></> },
]