import React from 'react';
import * as S from './style';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface IProps {
    onChange?: (e: any)=> void,
    onBlur?: (e: any)=> void,
    label?: string,
    value?: string,
    placeholder?: string,
    type: string,
    width: string,
    id: string
};

const CustomInputData:React.FC <IProps> = (props) => {

    const theme = createTheme({
        components: {
            MuiFormControl: {
                styleOverrides: {
                    root: {
                        border: '0',
                        "*": {
                            "border": 'none',
                        }
                    },
                }
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        color: '#2C3941',
                        fontWeight: '700',
                        fontFamily: 'Inter',
                        border: '1px solid #AFAFAF !important',
                        borderRadius: '8px',
                        background: '#fff',
                        paddingTop: '25px',
                    }
                }
            }
        }
    })

    return (
        // <ThemeProvider theme={theme}>
        // </ThemeProvider>
            <S.Container width={props.width}>
                <label 
                    htmlFor="date"
                    style={props.value != '' ? { 
                        position: 'absolute', 
                        top: '5px', 
                        left: '8px' 
                    } : { 
                        position: 'absolute', 
                        top: '5px', 
                        left: '8px' 
                    }}
                >{props.label}</label>
                <input 
                    name='date'
                    id={props.id}
                    type={props.type} 
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    placeholder={props.placeholder}
                    style={props.value != '' ? { 
                        color: '#2C3941',
                        position: 'absolute',
                        top: '25px',
                        left: '0px',
                        fontWeight: '600',
                        fontSize: '16px',
                        lineHeight: '19px',
                        border: 'none',
                        width: '90%'
                    } : {
                        color: '#2C3941',
                        position: 'absolute',
                        top: '25px',
                        left: '0px',
                        fontWeight: '600',
                        fontSize: '16px',
                        lineHeight: '19px',
                        border: 'none',
                        width: '90%'
                    }}
                />

            </S.Container>
    );
};

export default CustomInputData;