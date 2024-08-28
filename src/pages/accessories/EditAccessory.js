import { Box, Button, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import InputMUI from '../../components/Inputs/InputMUI'
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import styles from '../../styles/device.module.css'
import { editAccessory } from '../../Reducers/actions'
import DeviceSelect from '../../components/Inputs/DeviceSelect'

export default function EditAccessory() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { accessoryIndex } = useParams()
    const accessories = useSelector(state => state.Accessories)
    const accessory = accessories[accessoryIndex]

    const [data, setData] = useState(accessory)
    const [warning, setWarning] = useState('')


    useEffect(() => {
        setData({
            image: accessory.image,
            name: accessory.name,
            device: accessory.device,
            price: accessory.price,
        })
    }, [accessory])

    const handleSwitchImage = (e) => {
        const newPic = e.target.files[0]

        const reader = new FileReader();
        reader.readAsDataURL(newPic);

        reader.onloadend = function (e) {
            setData(prev => ({ ...prev, image: reader.result }))
        }

    }

    const edit = () => {
        if (data.name.length < 5) {
            setWarning('Name must be more than 4 character')
        }
        else if (accessories.filter((accessory, index) => { return accessory.name === data.name && index !== parseInt(accessoryIndex) }).length !== 0) {
            setWarning('Accessory name is already exist')
        }
        else if (data.device.includes('')) {
            setWarning('Please choose device or remove it')
        }
        else if (data.price === 0) {
            setWarning('Price cannot be zero')
        }
        else if (isNaN(data.price)) {
            setWarning('Price must be a number')
        }
        else {
            setWarning('')
            dispatch(editAccessory(accessoryIndex, data));
            navigate('/accessories')
        }
    }

    return (
        <div className='m-5 p-5'>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2, borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', padding: '10px' }}>
                    <Typography
                        sx={{ flex: '1 1 100%', color: 'var(--primary)', textAlign: 'center' }}
                        variant="h5"
                        id="tableTitle"
                        component="div"
                    >
                        Edit Accessory
                    </Typography>

                    <div>


                        <div className={`flex items-center justify-center p-5 gap-5 ${styles.container}`}>

                            <div className='flex flex-col justify-center items-center gap-5'>
                                <img src={data.image} alt={data.name} style={{ height: '400px' }} />
                                <Button variant="contained" component="label" sx={{
                                    backgroundColor: 'var(--primary)',
                                    '&:hover': {
                                        backgroundColor: 'var(--secondary)',
                                    },
                                }}>
                                    Upload File
                                    <input type="file" accept="image/*" hidden onChange={handleSwitchImage} />
                                </Button>
                            </div>

                            <div className='flex flex-col'>
                                <InputMUI title='Accessory Name' type='name' currentVal={data.name} setData={setData} />

                                {data.device.map((element, index) => {
                                    return <div key={index} className='flex items-center'>
                                        <DeviceSelect index={index} currentVal={element} setData={setData} />
                                        {data.device.length > 1 &&
                                            <IconButton onClick={() =>
                                                setData(
                                                    prev => ({
                                                        ...prev,
                                                        device: prev.device.filter((_, i) => {
                                                            return i !== index
                                                        })
                                                    })

                                                )
                                            }>
                                                <Tooltip title="Delete">
                                                    <DeleteIcon sx={{ color: '#d20000' }} />
                                                </Tooltip>
                                            </IconButton>
                                        }
                                    </div>
                                })}
                                <div className='flex justify-center'>
                                    <IconButton onClick={() => setData(
                                        prev => ({
                                            ...prev,
                                            device: [...prev.device, ''],
                                        })
                                    )}>
                                        <Tooltip title="Add Version">
                                            <AddCircleIcon sx={{ color: 'var(--primary)' }} />
                                        </Tooltip>
                                    </IconButton>
                                </div>

                                <InputMUI title='Price (€)' type='price' currentVal={data.price} setData={setData} />
                            </div>

                        </div>

                        <div className='text-center' style={{ color: '#d20000' }}>{warning}</div>
                        <div className='flex justify-center my-5'>
                            <div className={styles.edit} onClick={edit}>E D I T</div>
                        </div>

                    </div>

                </Paper>
            </Box>
        </div>
    )
}
