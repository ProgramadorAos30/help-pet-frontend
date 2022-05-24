import React from 'react';
import * as S from './style';
import Switch from '@mui/material/Switch';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/system';

interface IProps {
    leftLabel: string,
    rightLabel: string,
    value: boolean | any, 
    onChange: (e: any) => any,
    onBlur: (e: any) => any
}

const CustomSwitch: React.FC <IProps> = (props) => {
    console.log(props.value);
    
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
                        }
                      }
                }
            }
        }
    });
    
    const GreenSwitch = styled(Switch)(({ theme }) => ({
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: ' #3EA849',
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: '#fff',
          borderColor: '#3EA849',
          borderWidth: '3px'
        },
    }));
    
    return (
        <ThemeProvider theme={theme}>
            <S.Container >
                <label htmlFor="switch">{props.leftLabel}</label>
                    <GreenSwitch 
                        id='switch'
                        name="switch"
                        value={props.value}
                        onChange={props.onChange}
                        onBlur={props.onBlur}
                    />
                <label 
                    htmlFor="switch">{props.rightLabel}</label>
            </S.Container>
        </ThemeProvider>
    );
};

export default CustomSwitch;