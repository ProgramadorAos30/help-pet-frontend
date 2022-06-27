import React, { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';
import {
    trusted,
    noTrusted
} from '../../assets/index'

interface IProps {
    trusted: boolean
}

const TolltipRigth: React.FC <IProps> = (props) => {
    return (
        <Tooltip title={props.trusted == true ? 'Usuário confiavel' : 'Usuário não confiavel'} placement="right">
            <img src={props.trusted == true ? trusted : noTrusted} alt="" />
        </Tooltip>
    );
};

export default TolltipRigth;