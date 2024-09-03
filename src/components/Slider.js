import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification, deleteAccessory, deleteAccessoryFromOffer, deleteDevice, deleteOffer } from '../Reducers/actions';
import { Mode } from '../store/Context';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Slider({ open, setOpen, selected, setSelected, type }) {

    const { mode } = React.useContext(Mode)

    const dispatch = useDispatch()
    const devices = useSelector(state => state.Devices)
    const accessories = useSelector(state => state.Accessories)
    const offers = useSelector(state => state.Offers)

    const handleClose = () => {
        setOpen(false);
    };
    const del = () => {
        if (type === 'device') {
            const devicesWithOffer = offers.map(device => { return device.device })
            console.log("🚀 ~ del ~ devicesWithOffer:", devicesWithOffer)

            const selectedOfferToDelete = []
            devices.filter((_, index) => {
                return selected.includes(index)
            }).forEach(device => {
                dispatch(addNotification({ type: 'delete', text: `admin deleted "${device.name}" device` }))
                if (devicesWithOffer.includes(device.name)) {
                    selectedOfferToDelete.push(offers.findIndex(offer => { return offer.device === device.name }))
                }
            })
            dispatch(deleteOffer(selectedOfferToDelete));
            dispatch(deleteDevice(selected));
        }
        else if (type === 'accessory') {
            accessories.filter((_, index) => {
                return selected.includes(index)
            }).forEach(accessory => {
                dispatch(addNotification({ type: 'delete', text: `admin deleted "${accessory.name}" accessory` }))
                offers.forEach((offer, index) => {
                    if (offer.accessories.includes(accessory.name)) {
                        dispatch(deleteAccessoryFromOffer(index, accessory.name, accessory.price))
                    }
                })
            })
            dispatch(deleteAccessory(selected));
        }
        else if (type === 'offer') {
            dispatch(deleteOffer(selected));
            offers.filter((_, index) => {
                return selected.includes(index)
            }).forEach(offer => {
                dispatch(addNotification({ type: 'delete', text: `admin deleted "${offer.device}" offer` }))
            })
        }
        setSelected([]);
        setOpen(false);
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <div style={mode === 'dark' ? { backgroundColor: '#999' } : {}}>
                    <DialogTitle>{"Are you sure you want to delete?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            After delete, you will not able to undo this action.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>cancel</Button>
                        <Button onClick={del}>Delete</Button>
                    </DialogActions>
                </div>
            </Dialog>
        </React.Fragment>
    );
}
