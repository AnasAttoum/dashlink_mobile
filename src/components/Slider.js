import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDispatch } from 'react-redux';
import { deleteAccessory, deleteDevice, deleteOffer } from '../Reducers/actions';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Slider({ open, setOpen, selected, setSelected,type }) {

    const dispatch = useDispatch()

    const handleClose = () => {
        setOpen(false);
    };
    const del = () => {
        if(type==='device')
            dispatch(deleteDevice(selected));
        else if(type==='accessory')
            dispatch(deleteAccessory(selected));
        else if(type==='offer')
            dispatch(deleteOffer(selected));
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
