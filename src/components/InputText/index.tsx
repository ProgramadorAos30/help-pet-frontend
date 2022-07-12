import React from 'react';
import FormControl from '@mui/material/FormControl';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const theme = createTheme({
    components: {
        MuiInputLabel: {
            styleOverrides:{
                root: {
                color: '#AFAFAF',
                "&.Mui-focused": {
                    "color": "#AFAFAF",
                    },
                },
                
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    color: '#2C3941',
                    fontWeight: '700',
                    fontFamily: 'Inter', 
                    border: '0',
                    borderRadius: '8px  !important', 
                    background: '#FFF !important'
                }
            }
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    color: '#2C3941',
                    fontWeight: '700',
                    fontFamily: 'Inter', 
                    border: '1px solid #AFAFAF',
                    borderRadius: '8px  !important', 
                    background: '#FFF !important', 
                }
            }
        }
    },

});

interface IProps {
    label: string,
    onChange: (e: any) => any,
    onBlur: (e: any) => any,
    type: string,
    value: any,
    width: number,
    ref? : any,
    id?: string,
    name?: string
    disabled?: boolean;
    defaultValue?: string;
}

const CustomInput: React.FC <IProps> = (props) => {
    return (
        <ThemeProvider theme={theme}>
            <FormControl
                variant="filled"
                sx={{ width: props.width, height: 56, background: '#FFF  !important', borderRadius: '8px !important', border:'none'}}
            >
                <TextField
                    name={props.name} 
                    variant="filled" 
                    type={props.type}
                    label={props.label}
                    value={props.value}
                    id={props.id}
                    ref={props.ref}
                    autoComplete="off"
                    defaultValue={props.defaultValue}
                    disabled= {props.disabled}
                    InputProps={{
                        disableUnderline: true,
                        style: {
                            color: '#2C3941',
                            fontWeight: '700',
                            fontFamily: 'Inter', 
                            border: '0',
                            borderRadius: '8px', 
                            background: '#FFF', 
                            outline: 'none',
                        }
                    }}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                />
            </FormControl>
        </ThemeProvider>
    );
};

export default CustomInput;