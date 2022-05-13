import React, { useState } from "react";
import * as S from './style';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { api, useUf, useCity } from "../../../services";
import { CustomInputText, CustomSelect } from '../../../components/index';
import { IProps } from "./types";
import { useMutation } from 'react-query';
import { queryClient } from '../../../services/index';

const postUser = async (data: IProps) => {
    const { data: response } = await api.post('/signup', data);
    return response.data;
};

const NewUser: React.FC = () => {
    const [ idUf, setIdUf ] = useState<number>(0);
    const { data: uf, isLoading: loadingUf } = useUf();
    const { data: city, isLoading: loadingCity } = useCity(idUf);
    
    const { 
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        getValues,
        setError,
        watch,
        control
    } = useForm<IProps>();

    const { mutate, isLoading } = useMutation(postUser, {
        onSuccess: () => {
          queryClient.invalidateQueries('users');
        }
    });

    const onSubmit = (values: IProps) => {
        const obj = {
            "name": values.name,
            "phone_number": values.phone_number,
            "email": values.email,
            "state": values.state,
            "city": values.city,
            "active": values.active,
            "role": values.role,
        }

        //mutate(obj);
        console.log(values, 'valores');
    };

    const role = [
        {label: 'Administrador', value: 'Administrador'},
        {label: 'Mobile', value: 'Mobile'}
    ];

    return (
        <S.Container>
            <h1>Novo usuário</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Controller
                        control={control}
                        name="name"
                        render={({field: { onChange, onBlur, value}}) => (
                            <CustomInputText
                                width='372px' 
                                type="text"
                                placeholder="Nome do moderador"
                                label="Nome do moderador"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                            />
                        )}
                    />  
                    <Controller
                        control={control}
                        name="role"
                        render={({field: { onChange, onBlur, value}}) => ( 
                            <CustomSelect 
                                list={role}
                                label="Tipo de acesso"
                                value={value}
                                defaultValue="Tipo de acesso"
                                width="372px"
                                onChange={onChange}
                                onBlur={onBlur}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="phone_number"
                        render={({field: { onChange, onBlur, value}}) => (
                            <CustomInputText
                                width='372px' 
                                type="text"
                                placeholder="Numero do Whats"
                                label="Numero do Whats"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                            />
                        )}
                    />  
                    <Controller
                        control={control}
                        name="email"
                        render={({field: { onChange, onBlur, value}}) => (
                            <CustomInputText
                                width='372px' 
                                type="text"
                                placeholder="Digite o email"
                                label="Digite o email"
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="state"
                        render={({field: { onChange, onBlur, value}}) => ( 
                            <CustomSelect 
                                list={uf}
                                label="Selecione o estado"
                                value={value}
                                defaultValue="Selecione o estado"
                                width="372px"
                                onChange={onChange}
                                onBlur={onBlur}
                            />
                        )}
                    />
                </div>
                <button type="submit">asasd</button>
            </form>
        </S.Container>
    );
};

export default NewUser;