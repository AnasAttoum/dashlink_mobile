import { Box, Button, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import InputMUI from '../../components/Inputs/InputMUI'
import InputDateMUI from '../../components/Inputs/InputDateMUI'
import SubInputMUI from '../../components/Inputs/SubInputMUI'
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import styles from '../../styles/device.module.css'
import { editDevice } from '../../Reducers/actions'

export default function EditDevice() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { deviceIndex } = useParams()
    const device = useSelector(state => state.Devices[deviceIndex])

    const [data, setData] = useState(device)
    const [warning, setWarning] = useState('')


    useEffect(() => {
        setData({
            image: device.image,
            name: device.name,
            date: device.date,
            ram: device.ram,
            storage: device.storage,
            price: device.price,
        })
    }, [device])

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
        else if (data.ram.includes(0)) {
            setWarning('RAM cannot be zero')
        }
        else if (data.storage.includes(0)) {
            setWarning('Storage cannot be zero')
        }
        else if (data.price.includes(0)) {
            setWarning('Price cannot be zero')
        }
        else {
            setWarning('')
            dispatch(editDevice(deviceIndex, data));
            navigate('/devices')
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
                        Edit Device
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
                                <InputMUI title='Device Name' helperText='' type='name' currentVal={data.name} setData={setData} />
                                <InputDateMUI title='Released' type='date' currentVal={data.date} setData={setData} />

                                <div>
                                    {data.price.map((_, index) => {
                                        return <div key={index} className={`flex justify-center ${styles.version}`}>
                                            <SubInputMUI title='RAM (GB)' type='ram' index={index} currentVal={data.ram[index]} setData={setData} />
                                            <SubInputMUI title='Storage (GB)' type='storage' index={index} currentVal={data.storage[index]} setData={setData} />
                                            <SubInputMUI title='Price (€)' type='price' index={index} currentVal={data.price[index]} setData={setData} />
                                            {data.price.length > 1 &&
                                                <IconButton onClick={() =>
                                                    setData(
                                                        prev => ({
                                                            ...prev,
                                                            ram: prev.ram.filter((_, i) => {
                                                                return i !== index
                                                            }),
                                                            storage: prev.storage.filter((_, i) => {
                                                                return i !== index
                                                            }),
                                                            price: prev.price.filter((_, i) => {
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
                                                ram: [...prev.ram, 0],
                                                storage: [...prev.storage, 0],
                                                price: [...prev.price, 0],
                                            })
                                        )}>
                                            <Tooltip title="Add Version">
                                                <AddCircleIcon sx={{ color: 'var(--primary)' }} />
                                            </Tooltip>
                                        </IconButton>
                                    </div>
                                </div>

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
