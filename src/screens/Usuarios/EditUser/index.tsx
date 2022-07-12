import React, { useEffect, useState, useRef } from 'react';
import * as S from './style';
import { useSelector } from 'react-redux';
import { useForm, Controller, useFieldArray,  } from "react-hook-form";
import { 
    CustomInput,
    CustomSelect,
    CustomSwitch, 
    ModalMsg, 
    PersonalModal 
} from '../../../components/index';
import { 
    api, 
    useUf, 
    useCity,
    postUser,
    putUser, 
    queryClient,
} from '../../../services';
import { RootState } from '../../../stores';
import { FormData, IProps } from "./types";
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';

import {regex, numberClean} from '../../../services/functions/regex'
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../schema";
import { on } from 'events';

const EditForm: React.FC <IProps> =  ({onClose, itemEdit, isModal}) => {
    const { token } = useSelector((state : RootState) => state.clickState);
    const { data: uf, isLoading: loadingUf } = useUf();
    
    const [ user, setUser ] = useState<any>();
    const [ idUser, setIdUser ] = useState('');
    const [ open, setOpen ] = useState(false);
    const [ successMsg, setSuccessMsg ] = useState(false);
    const [ errMsg, setErrMsg ] = useState(false);

    const { 
        handleSubmit,
        formState: { errors, isSubmitting, isDirty, isValid, dirtyFields  },
        control,
        watch,  
        setValue,
        reset,
        getValues,
    } = useForm<FormData>({
        mode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
            name: itemEdit?.name,
            phone_number: itemEdit?.phone_number,
            password: itemEdit?.password,
            email: itemEdit?.email,
            state: itemEdit?.state,
            city: itemEdit?.city,
            active: itemEdit?.active,
        }

    });

    useEffect(() => {
        if(!itemEdit)return;

        Object.keys(itemEdit).map((keys) => {
         let key = keys as keyof unknown;
         setValue(key as any, itemEdit[key] as any)
        })
     }, [itemEdit, setValue]);

    console.log(dirtyFields, 'teste')

    // const { mutate, isLoading } = useMutation(putUser, {
    //     onSuccess: () => {
    //       queryClient.invalidateQueries('users');
    //       setOpen(true);
    //     }
    // });

    const onSubmit = (values: FormData) => {
        
        let obj = Object.assign(itemEdit, { 
            "phone_number": numberClean(values.phone_number),
            "role": "Administrador",
            "active": values.active === true ? true : false     
        })
        // mutate(obj);
        console.log(obj, 'valores submit');
    };

    const watchPhone = watch('phone_number');
    const watchUf = watch('state');

    const { data: city, isLoading: loadingCity } = useCity(watchUf);

    useEffect(() => {
        if (!isModal) {
            reset()
        }
    },[isModal,reset])

    return (
        <PersonalModal
            modalBackground={false}
            padding={4}
            width={858}
            open={isModal}
            onClose={onClose}
        >
        <S.Container>
            <h1>Editar moderador</h1>
            <form onSubmit={handleSubmit(onSubmit)}  autoComplete="off">
                <div>
                    <fieldset>
                        {/* <input class="hidden" type="text" style={{display: 'none!important', visibility: 'hidden!important',}} ></input> */}
                    <Controller
                            control={control}
                            name="name"
                            render={({field: { onChange, onBlur, value }}) => (
                                <span>
                                    <CustomInput
                                        id="name"
                                        width={372}
                                        type="text"
                                        label="Nome do moderador"
                                        defaultValue={itemEdit.name}
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}

                                    />
                                    {errors.name && (
                                        <span>{errors.name.message}</span>
                                    )}                                    
                                </span>
                            )}
                        />                     
                        {/* <Controller 
                            control={control}
                            name="password"
                            render={({field: { onChange, onBlur,}}) => (
                                <span >
                                    <div >
                                        <CustomInput
                                            id="password"
                                            width={372} 
                                            label="Senha do moderador"
                                            value={itemEdit.password}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            type="text"   
                                            disabled={true}                                         
                                        />
                                    </div>                                    
                                    {errors.password && (
                                        <span>{errors.password.message}</span>
                                    )}
                                </span>
                            )}
                        />*/}
                    </fieldset>
                    <fieldset>
                        <Controller
                            control={control}
                            name="phone_number"
                            render={({field: { onChange, onBlur, value }}) => (
                                <span>
                                    <div>
                                        <CustomInput
                                            id="phone_number"
                                            width={372}
                                            type="text"
                                            label={value === "" ? 'Numero do celular' : 'Celular'}
                                            value={regex(value)}
                                            defaultValue={itemEdit.phone_number}
                                            onChange={(e: any) => {
                                                let numero = regex(e?.target?.value)
                                                if(numero.length <= 15){
                                                    onChange(numero)
                                                }
                                            }}
                                            onBlur={(e: any) => {
                                                let numero = regex(e?.target?.value)
                                                if(numero.length <= 15){
                                                    onBlur()
                                                }
                                            }}
                                        />
                                    </div>                                   
                                    {errors.phone_number && (
                                        <span>{errors.phone_number.message}</span>
                                    )}
                                </span>
                            )}
                        /> 
                        <Controller
                            control={control}
                            name="email"
                            render={({field: { onChange, onBlur, value }}) => (
                                <span>
                                    <div>
                                        <CustomInput
                                            id="email"
                                            width={372}
                                            type="text"
                                            label={value === "" ? value : 'E-mail'}
                                            value={itemEdit.email}
                                            defaultValue={itemEdit.email}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            disabled={true}
                                        />
                                    </div>
                                </span>
                            )}
                        />
                    </fieldset>
                    <fieldset>
                        <Controller
                            control={control}
                            name="state"
                            defaultValue="value"
                            render={({field: { onChange, onBlur, value }}) => (
                                <span>
                                    <div>
                                        <CustomSelect 
                                            id="state"
                                            list={uf}
                                            label="Estado"
                                            labelDefault={value} 
                                            value={value}
                                            defaultValue={itemEdit.state}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            width={372}
                                        />
                                    </div>                                    
                                    {errors.state&& (
                                        <span>{errors.state.message}</span>
                                    )}
                                </span>
                            )}
                        />
                        <Controller
                            control={control}
                            name="city"
                            defaultValue=""
                            render={({field: { onChange, onBlur, value }}) => ( 
                                <span>
                                    <div>
                                        <CustomSelect 
                                            id="city"
                                            list={city}
                                            label="Cidade"
                                            labelDefault="Selecione a Cidade"
                                            value={value}
                                            defaultValue={itemEdit.city}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            width={372}
                                        />
                                    </div>
                                    {errors.city&& (
                                        <span>{errors.city.message}</span>
                                    )}
                                </span>
                            )}
                        />
                    </fieldset>
                    <fieldset>
                        <div>
                            <p>Status do usuário:</p>
                            <span>
                                <Controller 
                                    control={control}
                                    name="active"
                                    render={({field: { onChange, onBlur, value }}) => (
                                        <CustomSwitch
                                            id="active"
                                            leftLabel="Inativo"
                                            rightLabel="Ativo"
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            defaultValue={value == false ? false : true}
                                        />
                                    )}
                                />
                            </span>
                        </div>
                    </fieldset>
                </div>
                <S.ContainerBnt>
                    <button 
                        id='Cancel'
                        type="button" 
                        onClick={() => {
                            reset()
                            onClose()
                        }}
                    >
                        Cancelar
                    </button>  
                    <S.Button
                        id='submit' 
                        type='submit'
                        disabled={!isDirty || !isValid}
                    >
                        {isSubmitting 
                                ? "Editando..."
                                : "Finalizar edição"
                            }
                    </S.Button>
                </S.ContainerBnt>
            </form>
            <ModalMsg 
                    height='312px'
                    modalBackground={false}
                    open={open} 
                    onClose={() => {
                        setSuccessMsg(!successMsg)
                        setOpen(!open)
                        onClose()
                    }} 
                    width={375} 
                    status={'success'} 
                    mensage='O moderador foi editado com sucesso!'
                />
                <ModalMsg 
                height='312px'
                modalBackground={false}
                mensage='Falha em editar moderador!'
                onClose={() => {
                    reset()
                    setErrMsg(!errMsg)
                    onClose()
                }}
                open={errMsg}
                status="falha"
                width={375}
            />
        </S.Container>
        </PersonalModal>
    );
};


export default EditForm;