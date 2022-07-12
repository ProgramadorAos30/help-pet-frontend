import React from 'react';
import * as S from './style';
import { UseFormRegister } from 'react-hook-form';
import {
    disabledError,
    disabledSuccess,
    trusted,
    alertRed
} from '../../assets/index';

interface Register {
    status?: string,
    trusted?: string
}

interface IProps {
    primaryLabel: string,
    seccondaryLabel: string,
    primaryId: string,
    seccondaryId: string,
    type: string,
    checkedOne: boolean,
    checkedTwo: boolean,
    valueOne: string,
    valueTwo: string,
    status: string | boolean,
    register: UseFormRegister<Register>,
    width: string
};

const SwitchOptions: React.FC <IProps> = ({
    primaryLabel, 
    seccondaryLabel, 
    primaryId, 
    seccondaryId, 
    checkedOne,
    checkedTwo,
    valueOne,
    valueTwo,
    type,
    status,
    register,
    width
}) => {
    return (
        <S.Container width={width}>
            <S.Approve  
                htmlFor={seccondaryId} 
                value={status}
            >
                <img src={status === 'Approved' ? trusted : disabledSuccess} alt="" />
                {seccondaryLabel}
                <input 
                    {...register(type === 'occurrences' ? 'status' : 'trusted')}
                    type="radio" 
                    defaultChecked={checkedTwo}
                    id={seccondaryId} 
                    value={valueTwo}
                />
            </S.Approve>
            <S.Repprove
                htmlFor={primaryId} 
                value={status}
            >
                <img src={status === 'Disapproved' || status === 'Waiting' ? alertRed : disabledError} alt="" />
                {primaryLabel}
                <input 
                    {...register(type === 'occurrences' ? 'status' : 'trusted')}
                    type="radio" 
                    defaultChecked={checkedOne}
                    id={primaryId}
                    value={valueOne}
                />
            </S.Repprove>
        </S.Container>
    );
};

export default SwitchOptions;