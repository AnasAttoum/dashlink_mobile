import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';

export default function VersionSelect({ deviceName, currentVal, setData }) {

    const devices = useSelector(state => state.Devices)
    const device = devices.find(device => { return device.name === deviceName })

    let prevPrice = currentVal === '' ? 0 : device.price[currentVal];


    return (
        <FormControl sx={{ m: 1, margin: '25px', width: '60vw' }}>
            <InputLabel id="demo-select-small-label"
                sx={{
                    color: 'var(--primary)',
                    '&.Mui-focused': {
                        color: 'var(--primary)',
                    }
                }}
            >Version</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={currentVal}
                onChange={(e) => {
                    setData(prev => ({
                        ...prev, version: e.target.value,
                        oldPrice: prev.oldPrice - prevPrice + device.price[e.target.value]
                    }))
                }}
                label="Version"
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
                {device.ram.map((element, index) => {
                    return <MenuItem key={index} value={index}>
                        RAM: {element} | Storage: {device.storage[index]}
                    </MenuItem>
                })}
            </Select>
        </FormControl>
    )
}
