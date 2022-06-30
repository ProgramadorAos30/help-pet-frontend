import React, { useEffect, useState } from "react";
import * as S from './style';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { api, useUf, useCity } from "../../../services";
import { CustomInput, CustomSelect, CustomSwitch } from '../../../components/index';
import { IProps } from "./types";
import { useMutation } from 'react-query';
import { queryClient } from '../../../services/index';

const postUser = async (data: IProps) => {
    const { data: response } = await api.post('/signup', data);
    return response.data;
};


const NewUser: React.FC = () => {
    const [ idUf, setIdUf ] = useState<any>(0);
    const { data: uf, isLoading: loadingUf } = useUf();
    
    const { 
        handleSubmit,
        formState: { errors },
        control,
        watch,
        setValue,
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
            "role": "Administrador",
            "password": values.password,
        }
        mutate(obj);
        console.log(values, 'valores');
    };

    const role = [
        {label: 'Administrador', value: 'Administrador'},
        {label: 'Mobile', value: 'Mobile'}
    ];

    const watchUf = watch('state');

    const { data: city, isLoading: loadingCity } = useCity(watchUf);

    return (
        <S.Container>
            <h1>Novo usuário</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <fieldset>
                        <Controller
                            control={control}
                            name="name"
                            render={({field: { onChange, onBlur, value }}) => (
                                <CustomInput
                                    width={372}
                                    type="text"
                                    label="Nome do moderador"
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                />
                            )}
                        />  
                        <Controller
                            control={control}
                            name="password"
                            render={({field: { onChange, onBlur, value }}) => (
                                <CustomInput
                                    width={372} 
                                    label="Senha do moderador"
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    type="password"
                                />
                            )}
                        />                  
                    </fieldset>
                    <fieldset>
                        <Controller
                            control={control}
                            name="phone_number"
                            render={({field: { onChange, onBlur, value }}) => (
                                <CustomInput
                                    width={372}
                                    type="text"
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
                            render={({field: { onChange, onBlur, value }}) => (
                                <CustomInput
                                    width={372}
                                    type="text"
                                    label="Digite o email"
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                />
                            )}
                        />
                    </fieldset>
                    <fieldset>
                    <Controller
                            control={control}
                            name="state"
                            defaultValue=""
                            render={({field: { onChange, onBlur, value }}) => (
                                <CustomSelect 
                                    list={uf}
                                    label="Estado"
                                    labelDefault="Selecione o estado" 
                                    value={value}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    width={372}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name="city"
                            defaultValue=""
                            render={({field: { onChange, onBlur, value }}) => ( 
                                <CustomSelect 
                                    list={city}
                                    label="Cidade"
                                    labelDefault="Selecione a cidade"
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    width={372}
                                />
                            )}
                        />
                    </fieldset>
                    <fieldset>
                        {/* <Controller
                            control={control}
                            name="role"
                            defaultValue=""
                            render={({field: { onChange, onBlur, value }}) => ( 
                                <CustomSelect 
                                    list={role}
                                    label="Tipo de acesso"
                                    labelDefault="Tipo de acesso"
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    width={372}
                                />
                            )}
                        /> */}
                    </fieldset>
                    <fieldset>
                        <div>
                            <p>Status do usuário:</p>
                            <Controller 
                                control={control}
                                name="active"
                                render={({field: { onChange, onBlur, value }}) => (
                                    <CustomSwitch
                                        leftLabel="Inativo"
                                        rightLabel="Ativo"
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                    />
                                )}
                            />
                        </div>
                    </fieldset>
                </div>
                <S.ContainerBnt>
                    <button type="button">Cancelar</button>
                    <button type="submit">Finalizar cadastro</button>
                </S.ContainerBnt>
            </form>
        </S.Container>
    );
};

export default NewUser;