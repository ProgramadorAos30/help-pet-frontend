import React, { useState } from 'react';
import * as S from './style';
import { iconShow } from '../../assets/index';

type List = {
    value: string,
    label: string
};

interface IProps {
    onChange?: (e: any)=> void,
    label: string,
    list: List[]
    value: string,
    defaultValue?: string,
    width?: string
};

const CustomSelect:React.FC <IProps> = (props) => {
    const [ value, setValue ] = useState('');
    const [ open, setOpen ] = useState(false);

    return (
        <S.StyleSelect
            width={props.width} 
            onClick={() => setOpen(!open)}
        >
            <div>
                {props.value == '' ?
                    <S.Label htmlFor={props.label}>{props.label}</S.Label>
                    :
                    <S.DaufaultLabel htmlFor={props.label}>{props.defaultValue}</S.DaufaultLabel>
                }
                {props.value == '' ? 
                    <p style={{display: 'none'}}>{value}</p>
                    :
                    <p>{value}</p>
                }
                {open == true && (
                    <S.Select> 
                        {props.list.map((id: any, index: number) => {
                            return (
                                <div key={index}>
                                    <label 
                                        htmlFor={id.value}
                                        onClick={() => {
                                            let valor = props.value
                                            setOpen(!open)
                                            setValue(id.value)
                                            valor = id.value
                                            if(props.onChange  != undefined){
                                                props.onChange(id.value)
                                            }
                                        }}
                                    >{id.label}</label>
                                    <input
                                        name={id.value}
                                        id={id.value}
                                        type='checkbox'
                                        value={id.value}
                                        placeholder={id.label}
                                    />
                                </div>
                            )
                        })}
                    </S.Select>
                )}
            </div>
            <button onClick={() => setOpen(!open)}>
                <img src={iconShow} alt="" width={24} style={{marginRight: '8px'}}/>
            </button>
        </S.StyleSelect>
    );
};

export default CustomSelect;