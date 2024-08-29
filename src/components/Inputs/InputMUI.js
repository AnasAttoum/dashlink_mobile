import * as React from 'react';
import TextField from '@mui/material/TextField';

import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function InputMUI({ title, type, currentVal, setData, width, color }) {

    let colorTheme = color === undefined ? '#2d8b5f' : color;

    const theme = createTheme({
        palette: {
            primary: {
                main: colorTheme,
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
            <TextField id={title} type={type==='password'?'password':'text'} sx={width !== undefined ? { width: width, margin: '25px' } : { width: '60vw', margin: '25px' }} value={currentVal} label={title} className='m-5' variant="outlined" color='primary'
                onChange={(e) => { setData(prev => ({ ...prev, [type]: e.target.value })) }} />
        </ThemeProvider>
    )
}