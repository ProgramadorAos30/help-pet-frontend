import React from 'react';
import * as S from './style';

interface TypeButtonProps {
    text: string;
    selected: boolean;
    onSelect(): void;
    id?: string;
}

const DoubleButton: React.FC <TypeButtonProps> = (props) => {
    return (
        <S.Container
            id = {props.id}
            selected={ props.selected }
            onClick={
                event => {
                    event.preventDefault();
                    props.onSelect();
                }
            }
        >
            {props.text}
        </S.Container>
    );
};


export default DoubleButton;
