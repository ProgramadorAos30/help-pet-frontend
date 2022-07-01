import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import styled from 'styled-components';

interface IProps {
    title: any,
    desciption: any
}

const Button = styled.button`
  border: none;
  background: none;
`;

const CustomTolltip: React.FC <IProps> = (props) => {
  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltipArrow: {
            color: '#2C3941'
          },
          tooltip: {
            backgroundColor: '#2C3941',
            fontSize: '12px',
            fontWeight: '400',
            lineHeight: '18px',
          }
        }
      }
    }
  })

    return (
      <ThemeProvider theme={theme}>
        <Tooltip title={props.desciption} placement="top">
          <Button type="button">
            {props.title}
          </Button>
        </Tooltip>
      </ThemeProvider>
    );
};

export default CustomTolltip;