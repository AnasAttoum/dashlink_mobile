import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';

export default function AccessorySelect({ index, device, currentVal, setData }) {
    let prevPrice;

    const allAccessories = useSelector(state => state.Accessories)
    const accessories = allAccessories.filter(accessory => { return accessory.device.includes(device) })
    if (currentVal === '') {
        prevPrice = 0
    }
    else {
        prevPrice = allAccessories.find(accessory => { return accessory.name === currentVal }).price
    }

    return (
        <FormControl sx={{ m: 1, margin: '25px', width: '60vw' }}>
            <InputLabel id="demo-select-small-label"
                sx={{
                    color: 'var(--primary)',
                    '&.Mui-focused': {
                        color: 'var(--primary)',
                    }
                }}
            >Accessory</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={currentVal}
                onChange={(e) => {
                    setData(prev => ({
                        ...prev, accessories: prev.accessories.map((el, i) => {
                            if (i === index) {
                                return e.target.value
                            }
                            else {
                                return el
                            }
                        }),
                        oldPrice: prev.oldPrice - prevPrice + allAccessories.find(accessory => { return accessory.name === e.target.value }).price
                    }))
                }}
                label="Accessory"
                sx={{
                    '& .MuiSelect-select': {
                        color: 'black',
                    },
                    "& .MuiSvgIcon-root": {
                        color: "var(--primary)",
                    },
                    color: "white",
                    '.MuiOutlinedInput-notchedOutline': {
                        borderColor: '#555',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        color: 'var(--primary)',
                        borderColor: 'var(--primary)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#999',
                    },

                }}
            >
                {accessories.length === 0 ?
                    <MenuItem value=''>
                        No Accessories found for this device
                    </MenuItem>
                    :
                    accessories.map((accessory, index) => {
                        return <MenuItem key={index} value={accessory.name}>
                            <div className='flex items-center gap-2'>
                                <img src={accessory.image} alt={accessory.name} style={{ height: '30px' }} />
                                {accessory.name}
                            </div>
                        </MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}
