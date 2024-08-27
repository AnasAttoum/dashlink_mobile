import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';

import styles from '../styles/header.module.css'

export default function Header({ toggleDrawer }) {
    return (
        <div className={`${styles.header} p-5`}>
            <div className='cursor-pointer' onClick={toggleDrawer(true)}>
                <div className='flex gap-5'>
                    <MenuIcon sx={{ color: 'var(--primary)' }}/>
                    <div style={{ color: 'var(--primary)' }}>DashLink Mobile</div>
                </div>
            </div>
        </div>
    )
}