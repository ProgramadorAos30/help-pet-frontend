import React from "react";
import * as S from './style';

interface IProps {
    padding: string,
    width?: string,
    children: any
}

const Box:React.FC <IProps> = (props) => {
    return (
        <S.Container
            padding={props.padding}
        >
            {props.children}
        </S.Container>
    );
};

export default Box;