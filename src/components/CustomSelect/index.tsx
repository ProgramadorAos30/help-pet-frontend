import React from 'react';
import * as S from './style';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import './style.css';

type List = {
    value: string,
    label: string
}

interface IProps {
    onChange?: (e: any)=> void,
    label: string,
    list: List[]
    value: string,
    placeholder: string,
};

const CustomSelect:React.FC <IProps> = (props) => {
    return (
        <FormControl variant="filled">
            <InputLabel>{props.placeholder}</InputLabel>
            <S.StyleSelect
                placeholder={props.placeholder}
                onChange={props.onChange}
                value={props.value}
            >
                {props.list.map((id: any) => {
                    return (
                        <MenuItem value={id.value} >
                            {id.label}
                        </MenuItem>
                    )
                })}
            </S.StyleSelect>
        </FormControl>
    );
};

export default CustomSelect;