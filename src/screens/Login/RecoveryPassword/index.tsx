import React, { useState } from 'react';
import * as S from './style';
import { iconShow } from '../../../assets/index';
import { CustomInput, PersonalModal } from '../../../components';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { api } from "../../../services";
import { useMutation } from 'react-query';
import { queryClient } from '../../../services/index';
import * as Yup from 'yup';
import SetCode from '../SetCode';
import { useDispatch } from 'react-redux';
import { SENDCODE } from '../../../stores/actions';

interface Username {
    username: string
}

interface IProps {
    onClose: () => void,
}

const schema = Yup.object().shape({
    username: Yup.string().required("E-mail ou WhatsApp são obrigatórios")
})

const RecoveryPassword: React.FC<IProps> = ({onClose}) => {
    const dispatch = useDispatch();
    const [ recoveryPassword, setRecoveryPassword ] = useState(false);
    const { 
        handleSubmit,
        formState: { errors, isDirty, isValid },
        control,
        watch,
        getValues,
        getFieldState
    } = useForm<Username>({ 
        mode: "onChange",
        resolver: yupResolver(schema)
    });

    const postSendCode = async (user: Username) => {
        const { data: resp } = await api.post('/send-code', user)
        dispatch({ type: SENDCODE, sendcode: resp})
        console.log(resp);
        return resp.data
    }

    const { mutate, isLoading, data } = useMutation(postSendCode, {
        onSuccess: () => {
            queryClient.invalidateQueries('sendCode');
        },
        onError: (error) => {
            console.log(error)
        }
    });

    const onSubmit = (value: Username) => {
        const obj = {
            "username" : value.username
        }
        
        mutate(obj);
    }

    return (
        <>
            <div>
                <S.Container>
                    <S.ButtonBack
                        onClick={onClose}
                    >
                        <img src={iconShow} alt="" />
                    </S.ButtonBack>
                    <h1>Esqueci minha senha</h1>
                    <p>
                        Digite o e-mail ou número de telefone que você utilizou na hora do cadastro para receber o código de segurança.
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller 
                            control={control}
                            name="username"
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
                        {errors?.username && (
                            <span>
                                {errors?.username?.message}
                            </span>
                        )}
                        <S.ButtonSend
                            type="submit"
                            disabled={!isDirty || !isValid}
                        >
                            {isLoading == true ? 'Enviando código...' : 'Enviar código'}
                        </S.ButtonSend>
                    </form>
                </S.Container>
                <S.ReciveCode
                    type='button'
                    onClick={() => setRecoveryPassword(!recoveryPassword)}
                >
                    Já recebi o código
                </S.ReciveCode>
                <PersonalModal 
                    open={recoveryPassword} 
                    onClose={() => setRecoveryPassword(!recoveryPassword)}
                    width={568}
                    padding={0}
                    children={
                        <SetCode 
                            onClose={() => setRecoveryPassword(!recoveryPassword)}
                            closeOne={() => onClose()}
                        />
                    }
                />
            </div>
        </>
    );
};

export default RecoveryPassword;