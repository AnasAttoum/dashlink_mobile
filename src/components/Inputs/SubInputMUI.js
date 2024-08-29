import * as React from 'react';
import TextField from '@mui/material/TextField';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import styles from '../../styles/device.module.css'

export default function SubInputMUI({ title, type, index, currentVal, setData }) {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#2d8b5f',
            },
        },
        components: {
            MuiFormHelperText: {
                styleOverrides: {
                    root: {
                        color: "red",
                        marginTop: '5px'
                    }
                }
            }
        }
    });
    return (
        <ThemeProvider theme={theme}>
            <TextField id={title} sx={{ width: '15vw', margin: '25px' }} value={currentVal} label={title} className={`m-5 ${styles.input}`} variant="outlined" color='primary'
                onChange={(e) => {
                    setData(prev => ({
                        ...prev, [type]: prev[type].map((el, i) => {
                            if (i === index) {
                                return parseInt(e.target.value)
                            }
                            else {
                                return el
                            }
                        })
                    }))
                }} />

        </ThemeProvider>
    )
}