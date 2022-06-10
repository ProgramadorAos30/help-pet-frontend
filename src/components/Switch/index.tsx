import React from 'react';
import * as S from './style';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

interface IProps {
    leftLabel: string,
    rightLabel: string,
    value: boolean, 
    onChange: (e: any) => any,
    onBlur: (e: any) => any,
    id?: string
}

const CustomSwitch: React.FC <IProps> = (props) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      props.onChange(event.target.checked);
    };

    const theme = createTheme({
        components: {
            MuiSwitch: {
                styleOverrides: {
                    switchBase: {
                        color: '#AFAFAF'
                    },
                    colorPrimary: {
                        color: '#AFAFAF'
                    },
                    colorSecondary: {
                        backgroundColor: '#AFAFAF',
                        styles: {
                            backgroundColor: "#AFAFAF",    
                        }
                      },
                    track: {
                        backgroundColor: "#fff",
                        border: '3px solid #AFAFAF',
                        "$checked$checked + &": {
                          // Controls checked color for the track
                          backgroundColor: "#fff",
                          border: '3px solid #AFAFAF',
                        },

                      },
                      root: {
                        '& .MuiSwitch-switchBase.Mui-checked': {
                            color: ' #3EA849',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#fff',
                            borderColor: '#3EA849',
                            borderWidth: '3px'
                        },
                    }
                }
            }
        }
    });
    
    return (
        <ThemeProvider theme={theme}>
            <S.Container >
                <S.CheckedInative checked={props.value} htmlFor="switch">{props.leftLabel}</S.CheckedInative>
                    <Switch 
                        id='switch'
                        name="switch"
                        value={props.value}
                        onChange={handleChange}
                        onBlur={props.onBlur}
                    />
                <S.CheckedActive checked={props.value} htmlFor="switch">{props.rightLabel}</S.CheckedActive>
            </S.Container>
        </ThemeProvider>
    );
};

export default CustomSwitch;