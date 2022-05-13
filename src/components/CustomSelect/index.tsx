import React, { useState } from 'react';
import * as S from './style';
import { iconShow } from '../../assets/index';

type List = {
    value?: string,
    label?: string,
    id?: number,
    nome?:string,
    sigla?: string
};

interface IProps {
    onChange?: (e: any)=> void,
    onBlur?:(e: any) => any,
    label: string,
    list: List[] | any,
    value: string,
    defaultValue?: string,
    width?: string
};

const CustomSelect:React.FC <IProps> = (props) => {
    const [ value, setValue ] = useState('');
    const [ open, setOpen ] = useState(false);
    console.log(props.list);
    console.log(value);
    
    

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
                {value == '' ? 
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
                                        htmlFor={id.value === "" ? id.nome : id.label}
                                        onClick={() => {
                                            let valor = props.value === "" ? id.nome : id.value
                                            setOpen(!open)
                                            setValue(id.value === "" ? id.nome : id.value)
                                            valor = id.value
                                            if(props.onChange  != undefined){
                                                props.onChange(id.value === "" ? id.id : id.value)
                                            }
                                            if(props.onBlur  != undefined){
                                                props.onBlur(id.value === "" ? id.id : id.value)
                                            }
                                        }}
                                    >{id.label === "" ? id.nome : id.label}</label>
                                    <input
                                        name={id.value === "" ? id.nome : id.label}
                                        id={id.value === "" ? id.nome : id.label}
                                        type='checkbox'
                                        value={id.value}
                                        placeholder={id.label === "" ? id.nome : id.label}
                                    />
                                </div>
                            )
                        })}
                    </S.Select>
                )}
            </div>
            <button onClick={() => setOpen(!open)}>
                {open == false ?
                    <img src={iconShow} alt="" width={24} style={{marginRight: '8px'}}/>
                    :
                    <img src={iconShow} alt="" width={24} style={{marginRight: '8px', transform: 'scaleY(-1)'}}/>
                }
            </button>
        </S.StyleSelect>
    );
};

export default CustomSelect;