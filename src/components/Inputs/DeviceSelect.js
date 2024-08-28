import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from 'react-redux';

export default function DeviceSelect({ index,currentVal, setData }) {

    const devices = useSelector(state => state.Devices)

    return (
        <FormControl sx={{ m: 1, margin: '25px', width: '60vw' }}>
            <InputLabel id="demo-select-small-label"
                sx={{
                    color: 'var(--primary)',
                    '&.Mui-focused': {
                        color: 'var(--primary)',
                    }
                }}
            >Device</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={currentVal}
                onChange={(e) => { setData(prev => ({ ...prev, device: prev.device.map((el,i)=>{
                    if(i === index){
                        return e.target.value
                    }
                    else{
                        return el
                    }
                }) })) }}
                label="Device"
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
                {devices.map((device, index) => {
                    return <MenuItem key={index} value={device.name}>{device.name}</MenuItem>
                })}
            </Select>
        </FormControl>
    )
}
