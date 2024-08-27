import { Box, Paper, Typography } from '@mui/material'
import React from 'react'

export default function Accessories() {
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
                        Our Accessories
                    </Typography>

                    <div>
                    </div>


                </Paper>
            </Box>
        </div>
    )
}
