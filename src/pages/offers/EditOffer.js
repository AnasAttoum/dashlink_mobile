import { Box, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import InputMUI from '../../components/Inputs/InputMUI'
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import styles from '../../styles/device.module.css'
import AccessorySelect from '../../components/Inputs/AccessorySelect'
import VersionSelect from '../../components/Inputs/VersionSelect'
import InputDateMUI from '../../components/Inputs/InputDateMUI'
import DeviceSelectForOffer from '../../components/Inputs/DeviceSelectForOffer'
import { addNotification, editOffer } from '../../Reducers/actions'
import { Mode } from '../../store/Context'

export default function EditOffer() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { offerIndex } = useParams()
    const offers = useSelector(state => state.Offers)
    const accessories = useSelector(state => state.Accessories)
    const offer = offers[offerIndex]

    const [data, setData] = useState(offer)
    const [warning, setWarning] = useState('')

    const { mode } = React.useContext(Mode)


    useEffect(() => {
        setData({
            device: offer.device,
            accessories: offer.accessories,
            oldPrice: offer.oldPrice,
            sale: offer.sale,
            endDate: offer.endDate,
            version: offer.version,
        })
    }, [offer])

    const edit = () => {
        const NOW = new Date()
        if(NOW.getTime()>=new Date(data.endDate).getTime()){
            setWarning('End date must be in the future')
        }
        else if (data.sale <= 0 || data.sale>=100) {
            setWarning('Sale value must be between 0 and 99')
        }
        else if (isNaN(data.sale)) {
            setWarning('Sale must be a number')
        }
        else {
            setWarning('')
            dispatch(editOffer(offerIndex, data));
            dispatch(addNotification({type:'edit',text:`admin edited "${data.device}" offer`}))
            navigate('/offers')
        }
    }

    return (
        <div className='m-5 p-5'>
            <Box sx={{ width: '100%' }}>
                <Paper sx={mode === 'dark' ? { width: '100%', mb: 2, borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', padding: '10px', backgroundColor: '#999' }
                    : { width: '100%', mb: 2, borderRadius: '15px', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', padding: '10px' }}>
                    <Typography
                        sx={{ flex: '1 1 100%', color: 'var(--primary)', textAlign: 'center' }}
                        variant="h5"
                        id="tableTitle"
                        component="div"
                    >
                        Edit Offer
                    </Typography>

                    <div>


                        <div className={`flex items-center justify-center p-5 gap-5 ${styles.container}`}>

                            <div className='flex flex-col'>
                                <DeviceSelectForOffer currentVal={data.device} setData={setData} />

                                {data.accessories.map((accessory, index) => {
                                    return <div key={index} className='flex items-center'>
                                        <AccessorySelect index={index} device={data.device} currentVal={accessory} setData={setData} />
                                        {data.accessories.length > 1 &&
                                            <IconButton onClick={() =>
                                                setData(
                                                    prev => ({
                                                        ...prev,
                                                        accessories: prev.accessories.filter((_, i) => {
                                                            return i !== index
                                                        }),
                                                        oldPrice:prev.oldPrice-accessories.find(element=>{return element.name===accessory}).price
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
                                            accessories: [...prev.accessories, ''],
                                        })
                                    )}>
                                        <Tooltip title="Add Version">
                                            <AddCircleIcon sx={{ color: 'var(--primary)' }} />
                                        </Tooltip>
                                    </IconButton>
                                </div>

                                <VersionSelect deviceName={data.device} currentVal={data.version} setData={setData} />
                                <InputDateMUI title='End Date' type='endDate' currentVal={data.endDate} setData={setData} />
                                <InputMUI title='Sale' type='sale' currentVal={data.sale} setData={setData} />
                                <div className='flex flex-col justify-center items-center'>
                                    <div>Total Price: <span className='line-through' style={{color:'#555'}}>{data.oldPrice} €</span></div> 
                                    <div>Price After Sale: <span style={{color:'var(--primary)'}}>{(data.oldPrice-data.oldPrice*(data.sale/100)).toFixed(2)} €</span></div> 
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
