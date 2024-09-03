import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import styles from '../styles/header.module.css'
import { logOut } from '../Reducers/actions';
import { Button, Dialog, DialogActions, DialogTitle, Slide } from '@mui/material';
import SwitchMode from './SwitchMode';
import { Mode } from '../store/Context';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Header({ toggleDrawer }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const notifications = useSelector(state => state.Notification)
    const admin = useSelector(state => state.Admin)
    const [showNotification, setShowNotification] = useState(false)
    const [open, setOpen] = React.useState(false);

    const { mode } = React.useContext(Mode)


    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid var(--primary)`,
            backgroundColor: 'var(--primary)',
            padding: '0 4px',
        },
    }));

    const handleClose = () => {
        setOpen(false);
    };
    const handleLogOut = () => {
        dispatch(logOut());
        navigate('/');
    }

    return (
        <>
            <div className='relative'>
                <div className={`${styles.header} p-5`}
                    style={mode === 'dark' ? { backgroundColor: '#222' } : {}}>
                    <div>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-5 cursor-pointer' onClick={toggleDrawer(true)}>
                                <MenuIcon sx={{ color: 'var(--primary)' }} />
                                <div className={styles.name} style={{ color: 'var(--primary)' }}>DashLink Mobile <span style={mode==='dark'?{ color: 'white' }:{ color: 'black' }}>, Hello {admin.username} !</span> </div>
                            </div>
                            <div className='flex items-center gap-5'>

                                <SwitchMode />

                                <div onBlur={() => setShowNotification(false)}>
                                    <IconButton aria-label="cart" onClick={() => setShowNotification(prev => !prev)}>
                                        <StyledBadge badgeContent={notifications.length} color="secondary">
                                            <NotificationsIcon sx={mode === 'dark' ? { color: 'white' } : {}} />
                                        </StyledBadge>
                                    </IconButton>
                                    {showNotification &&
                                        <div className={styles.containerNotificatins}>
                                            {notifications.length === 0 ?
                                                <div className='flex justify-center items-center' style={{ color: '#fff', height: '50px' }}> there is no notifications yet</div> :
                                                <div>
                                                    {notifications.toReversed().map((notification, index) => {
                                                        return <div key={index} style={{ color: '#fff', height: '50px' }} className={styles.rowNotification}>
                                                            {notification.type === 'delete' ?
                                                                <DeleteOutlineIcon sx={{ color: '#e63946' }} /> :
                                                                notification.type === 'edit' ?
                                                                    <EditIcon sx={{ color: '#457b9d' }} /> :
                                                                    <AddIcon sx={{ color: '#dda15e' }} />
                                                            }
                                                            {notification.text}
                                                        </div>
                                                    })}
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>

                                <div className={styles.logOut} onClick={() => { setOpen(true) }}>Log Out</div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <React.Fragment>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <div style={mode === 'dark' ? { backgroundColor: '#999' } : {}}>
                        <DialogTitle>{"Are you sure you want to log out?"}</DialogTitle>

                        <DialogActions>
                            <Button onClick={handleClose}>cancel</Button>
                            <Button onClick={handleLogOut}>Yes</Button>
                        </DialogActions>
                    </div>
                </Dialog>
            </React.Fragment>
        </>
    )
}