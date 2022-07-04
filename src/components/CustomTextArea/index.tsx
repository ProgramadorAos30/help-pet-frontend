import React from 'react';
import styled from 'styled-components';



interface IProps {
    placeholder: string,
    onChange: (e: any) => any,
    onBlur: (e: any) => any,
    value: any,
    width: string,
    heigth: string,
    id?: string
}
    const TextArea = styled.textarea< {width: string, heigth: string} >`
        width: ${props => props.width};
        height: ${props => props.heigth};
        border-radius: 8px;
        border: 1px solid #AFAFAF;
        padding: 16px;
        background-color: #FFF;
        resize: none;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #2C3941;
    `;

const CustomTextArea: React.FC <IProps> = (props) => {

    return (
        <TextArea 
            id={props.id}
            heigth={props.heigth}
            width={props.width}
            placeholder={props.placeholder}
            onChange={props.onChange}
            onBlur={props.onBlur}
            value={props.value}
        />
    );
};

export default CustomTextArea;