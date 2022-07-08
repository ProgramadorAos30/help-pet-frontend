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
// const useStyles = makeStyles(theme => ({
//   arrow: {
//     "&:before": {
//       border: "1px solid #E6E8ED"
//     },
//     color: theme.palette.common.white
//   },
//   tooltip: {
//     backgroundColor: theme.palette.common.white,
//     border: "1px solid #E6E8ED",
//     color: "#4A4A4A"
//   }
// }));

const CustomTolltip: React.FC <IProps> = (props) => {
  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltipArrow: {
            backgroundColor: '#2C3941',
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
        <Tooltip 
          arrow 
          title={props.desciption} 
          placement="top"
        >
          <Button type="button">
            {props.title}
          </Button>
        </Tooltip>
      </ThemeProvider>
    );
};

export default CustomTolltip;