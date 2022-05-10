import React from 'react';
import * as S from './style';

interface IProps {
    onChange?: (e: any)=> void,
    label?: string,
    value?: string,
    placeholder?: string,
    type: string
};

const CustomInputText:React.FC <IProps> = (props) => {
    return (
        <S.Container>
            <label 
                htmlFor="date"
                style={props.value != '' ? { 
                    position: 'absolute', 
                    top: '5px', 
                    left: '8px' 
                } : { 
                    position: 'relative' 
                }}
            >{props.label}</label>
            <input 
                name='date'
                id='date'
                type={props.type} 
                value={props.value}
                onChange={props.onChange}
                placeholder='--/--/--'
                style={props.value != '' ? { 
                    color: '#2C3941',
                    position: 'absolute',
                    top: '25px',
                    left: '0px',
                    fontWeight: '600',
                    fontSize: '16px',
                    lineHeight: '19px'


                } : {
                    color: '#AFAFAF'
                }}
            />

        </S.Container>
    );
};

export default CustomInputText;