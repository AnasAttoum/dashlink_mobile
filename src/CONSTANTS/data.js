import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AddIcon from '@mui/icons-material/Add';

export const links = [
    { name: 'Statistics', url: '/statistics', icon: <DonutLargeIcon />, iconDark: <DonutLargeIcon sx={{ color: 'white' }} /> },
    { name: 'Our Devices', url: '/devices', icon: <PhoneIphoneIcon />, iconDark: <PhoneIphoneIcon sx={{ color: 'white' }} /> },
    { name: 'Our Accessories', url: '/accessories', icon: <HeadphonesIcon />, iconDark: <HeadphonesIcon sx={{ color: 'white' }} /> },
    { name: 'Our Offers', url: '/offers', icon: <LocalOfferIcon />, iconDark: <LocalOfferIcon sx={{ color: 'white' }} /> },
]

export const subLinks = [
    { name: 'Add Device', url: '/devices/add', icon: <><PhoneIphoneIcon /><AddIcon /></>, iconDark: <><PhoneIphoneIcon sx={{ color: 'white' }} /><AddIcon sx={{ color: 'white' }} /></> },
    { name: 'Add Accessory', url: '/accessories/add', icon: <><HeadphonesIcon /><AddIcon /></>, iconDark: <><HeadphonesIcon sx={{ color: 'white' }} /><AddIcon sx={{ color: 'white' }} /></> },
    { name: 'Add Offer', url: '/offers/add', icon: <><LocalOfferIcon /><AddIcon /></>, iconDark: <><LocalOfferIcon sx={{ color: 'white' }} /><AddIcon sx={{ color: 'white' }} /></> },
]