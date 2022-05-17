import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const TolltipDown = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: '#2C3941',
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#2C3941',
      fontSize: '12px',
      fontWeight: '400',
      lineHeight: '18px',
    },
  }));

interface IProps {
    title: any,
    desciption: any
}

const CustomTolltip: React.FC <IProps> = (props) => {
    return (
        <TolltipDown title={props.desciption}>
            {props.title}
        </TolltipDown>
    );
};

export default CustomTolltip;