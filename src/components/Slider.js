import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification, deleteAccessory, deleteDevice, deleteOffer } from '../Reducers/actions';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Slider({ open, setOpen, selected, setSelected, type }) {

    const dispatch = useDispatch()
    const devices = useSelector(state => state.Devices)
    const accessories = useSelector(state => state.Accessories)
    const offers = useSelector(state => state.Offers)

    const handleClose = () => {
        setOpen(false);
    };
    const del = () => {
        if (type === 'device') {
            dispatch(deleteDevice(selected));
            devices.filter((_, index) => {
                return selected.includes(index)
            }).forEach(device => {
                dispatch(addNotification({type:'delete',text:`admin delete "${device.name}" device`}))
            })
        }
        else if (type === 'accessory'){
            dispatch(deleteAccessory(selected));
            accessories.filter((_, index) => {
                return selected.includes(index)
            }).forEach(accessory => {
                dispatch(addNotification({type:'delete',text:`admin delete "${accessory.name}" accessory`}))
            })
        }
        else if (type === 'offer'){
            dispatch(deleteOffer(selected));
            offers.filter((_, index) => {
                return selected.includes(index)
            }).forEach(offer => {
                dispatch(addNotification({type:'delete',text:`admin delete "${offer.device}" offer`}))
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
            </Dialog>
        </React.Fragment>
    );
}
