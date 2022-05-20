import React, { useRef } from 'react';
import * as S from './style';
import { useForm, Controller } from "react-hook-form";
import { api } from "../../services";
import { useMutation } from 'react-query';
import { queryClient } from '../../services/index';
import { logoPng } from '../../assets';
import { CustomInput } from '../../components';
import { IProps } from "./types";
import { useDispatch } from 'react-redux';
import { TOKEN, USER } from '../../stores/actions';
import { NavLink } from 'react-router-dom';


const Login: React.FC = () => {
    const dispatch = useDispatch();
    const ref = useRef<any>(null)
    const { 
        handleSubmit,
        formState: { errors, isDirty, isValid },
        control,
        watch,
        getValues,
        getFieldState
    } = useForm<IProps>({ mode: "onChange" });
    
    const postUser = async (data: IProps) => {
        const { data: response } = await api.post('/authorize', data);
        dispatch({type: TOKEN, token: response.token})
        dispatch({type: USER, user: response.user})
        console.log(data);
        
        return response.data;
    };

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
    };

    return (
        <S.Container>
            <div>
                <img src={logoPng} alt="" />
                <p>Faça seu login</p>
                <h1>Para acessar a nossa plataforma!</h1>
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
                                width={372}                    
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
                                width={372}                      
                            />
                        )}
                    />
                    <p>Esqueci minha senha</p>
                    <S.Button 
                        type='submit'
                        onClick={() => {
                            ref?.current?.click()
                        }}
                        disabled={!isDirty || !isValid}
                    >
                        {isLoading == true ? 'Logando...' : 'Fazer login'}
                    </S.Button>
                    <NavLink to="/" style={{display: 'none'}} ref={ref}/>
                </form>
            </div>
        </S.Container>
    );
};

export default Login;