import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function InputDateMUI({ title, currentVal, type, setData }) {
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
    
    // eslint-disable-next-line
    const [date, setDate] = React.useState(new Date(currentVal))

    return (
        <div style={{ margin: '25px' }}>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateField', 'DatePicker']}>
                        <DatePicker
                            sx={{ width: '60vw' }}
                            label={title}
                            format="YYYY/MM/DD"
                            defaultValue={dayjs(date)}
                            onChange={(e) => { setData(prev => ({ ...prev, [type]: e.$d })) }}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </ThemeProvider>
        </div>
    );
}
