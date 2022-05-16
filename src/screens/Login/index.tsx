import React from 'react';
import * as S from './style';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { api, useUf, useCity } from "../../services";
import { useMutation } from 'react-query';
import { queryClient } from '../../services/index';
import { logo } from '../../assets';
import { CustomInput } from '../../components';
import { IProps } from "./types";

const postUser = async (data: IProps) => {
    const { data: response } = await api.post('/authorize', data);
    return response.data;
};

const Login: React.FC = () => {
    const { 
        handleSubmit,
        formState: { errors },
        control,
        watch
    } = useForm<IProps>();

    const { mutate, isLoading } = useMutation(postUser, {
        onSuccess: () => {
          queryClient.invalidateQueries('users');
        }
    });

    const onSubmit = (values: IProps) => {
        const obj = {
            "username": values.username,
            "password": values.password
        }
        mutate(obj);
        console.log(values, 'valores');
    };
    return (
        <S.Container>
            <div>
                <img src={logo} alt="" />
                <p>Faça seu login</p>
                <h1>Para acessar anossa plataforma!</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller 
                        control={control}
                        name='username'
                        defaultValue=""
                        render={({field: { onChange, onBlur, value }}) => (
                            <CustomInput 
                                label='Digite seu e-mail ou WhatsApp' 
                                onChange={onChange} 
                                onBlur={onBlur} 
                                type='text' 
                                value={value}                    
                            />
                        )}
                    />
                    <Controller 
                        control={control}
                        name='password'
                        defaultValue=""
                        render={({field: { onChange, onBlur, value }}) => (
                            <CustomInput 
                                label='Digite sua senha' 
                                onChange={onChange} 
                                onBlur={onBlur}  
                                type='password' 
                                value={value}                    
                            />
                        )}
                    />
                    <p>Esquici minha senha</p>
                    <button type='submit'>Fazer login</button>
                </form>
            </div>
        </S.Container>
    );
};

export default Login;