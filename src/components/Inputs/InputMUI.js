import * as React from 'react';
import TextField from '@mui/material/TextField';

import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function InputMUI({title,type,currentVal,setData}) {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#52b788',
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
            <TextField id={title} sx={{width:'60vw',margin:'25px'}} value={currentVal} label={title} className='m-5' variant="outlined" color='primary' 
            onChange={(e)=>{setData(prev=>({...prev,[type]:e.target.value}))}}/>
        </ThemeProvider>
    )
}