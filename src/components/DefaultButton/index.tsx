import React from 'react';
import * as S from './style';
import { register } from '../../assets/index';

interface TypeButtonProps {
    text: string;
    onSelect(): void;
    id?: string;
}

const DefaultButton: React.FC<TypeButtonProps> = (props) => {
    return (
        <S.Container
            id = {props.id}
            onClick={
                event => {
                    event.preventDefault();
                    props.onSelect();
                }
            }
        >
            {/* <img src={register} alt="" /> */}
            {props.text}
        </S.Container>
    );
};


export default DefaultButton;