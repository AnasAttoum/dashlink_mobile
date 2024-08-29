import React from 'react'
import { useState } from 'react'
import { Box, Button, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from '../../styles/device.module.css'
import InputMUI from '../../components/Inputs/InputMUI'
import { addAccessory, addNotification } from '../../Reducers/actions';
import DeviceSelect from '../../components/Inputs/DeviceSelect';

export default function AddAccessory() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [warning, setWarning] = useState('')
    const accessories = useSelector(state => state.Accessories)

    const [data, setData] = useState({
        image: '/Images/Upload.jpg',
        name: '',
        date: new Date(),
        device: [''],
        price: 0,
    })

    const handleSwitchImage = (e) => {
        const newPic = e.target.files[0]

        const reader = new FileReader();
        reader.readAsDataURL(newPic);

        reader.onloadend = function (e) {
            setData(prev => ({ ...prev, image: reader.result }))
        }

    }

    const add = () => {
        if (data.image === '/Images/Upload.jpg') {
            setWarning('Please upload photo of the Accessory')
        }
        if (data.name.length < 5) {
            setWarning('Name must be more than 4 character')
        }
        else if (accessories.filter((accessory, index) => { return accessory.name === data.name }).length !== 0) {
            setWarning('Accessory name is already exist')
        }
        else if (data.device.includes('')) {
            setWarning('Please choose device')
        }
        else if (data.price === 0) {
            setWarning('Price cannot be zero')
        }
        else if (isNaN(data.price)) {
            setWarning('Price must be a number')
        }
        else {
            setWarning('')
            dispatch(addAccessory(data));
            dispatch(addNotification({type:'add',text:`admin add "${data.name}" accessory`}))
            navigate('/accessories');
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
                        Add Accessory
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

                            <div>

                                <InputMUI title='Accessory Name' type='name' currentVal={data.name} setData={setData} />

                                <div>
                                    {data.device.map((element, index) => {
                                        return <div key={index} className={`flex justify-center items-center ${styles.version}`}>
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

                        </div>

                        <div className='text-center' style={{ color: '#d20000' }}>{warning}</div>
                        <div className='flex justify-center my-5'>
                            <div className={styles.edit} onClick={add}>A D D</div>
                        </div>


                    </div>

                </Paper>
            </Box>
        </div>
    )
}
