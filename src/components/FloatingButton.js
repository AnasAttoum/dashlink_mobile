import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';

export default function FloatingButton({ link }) {
    return (
        <Link to={link}>
            <Box sx={{ position: 'fixed', bottom: '35px', right: '35px', '& > :not(style)': { m: 1 } }}>
                <Tooltip title="Add Device">
                    <Fab aria-label="add" sx={{ backgroundColor: 'var(--primary)', '&:hover': { backgroundColor: 'var(--secondary)' } }}>
                        <AddIcon sx={{ color: '#fff' }} />
                    </Fab>
                </Tooltip>
            </Box>
        </Link>
    );
}
