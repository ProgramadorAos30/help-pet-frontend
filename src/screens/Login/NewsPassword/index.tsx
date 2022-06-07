import React, { useEffect, useState } from 'react';
import * as S from './style';
import { iconShow } from '../../../assets/index';
import { CustomInput, ModalMsg } from '../../../components';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { api } from "../../../services";
import { useMutation } from 'react-query';
import { queryClient } from '../../../services/index';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores';

interface NewPassword {
    user_id: string,
    new_password: string
}

const schema = Yup.object().shape({
    new_password: Yup.string().required("Senha é obrigatória")
})

const NewPassword: React.FC = () => {
    const { sendcode } = useSelector((state : RootState) => state.clickState);
    const [ password, setPassword ] = useState<string>('');
    const [ enable, setEnable ] = useState<boolean>(true);
    const [ errorMsg, setErrorMsg ] = useState(false);

    const { 
        handleSubmit,
        formState: { errors, isDirty, isValid },
        control,
        watch,
        getValues,
        getFieldState
    } = useForm<NewPassword>({ 
        mode: "onChange",
        resolver: yupResolver(schema)
    });

    const postNewPassword = async (user: NewPassword) => {
        const { data: resp } = await api.post('/forgot-password', user)
        return resp.data
    };

    const { mutate, isLoading, data } = useMutation(postNewPassword, {
        onSuccess: () => {
            queryClient.invalidateQueries('forget-password');
            setErrorMsg(!errorMsg)
        },
        onError: (error) => {
            console.log(error)
        }
    });

    const onSubmit = (value: NewPassword) => {
        const obj = {
            "user_id": sendcode.user_id,
            "new_password": value.new_password
        }
        mutate(obj);
    };

    const watchPassword = watch('new_password');

    useEffect(() => {
        if(watchPassword === password && watchPassword !== '' && password !== ''){
            setEnable(true)
        } else {
            setEnable(false)
        }
    }, [watchPassword, password]);

    return (
        <>
            <S.Container>
                <S.ButtonBack>
                    <img src={iconShow} alt="" />
                </S.ButtonBack>
                <h1>Alterar senha</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <CustomInput 
                            label='Digite sua senha' 
                            onChange={(e: any) => {
                                setPassword(e.target.value)
                                console.log(e.target.value);
                            }} 
                            onBlur={() => {}}  
                            type='password' 
                            value={password} 
                            width={372}
                        />
                    </fieldset>
                    <fieldset style={{marginTop: '24px'}}>
                        <Controller 
                            control={control}
                            name='new_password'
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
                    </fieldset>
                    {watchPassword != password && watchPassword == '' && password == '' && (
                        <span>As senhas devem ser identicas</span>
                    )}
                    <S.ButtonSend
                        type="submit"
                        disabled={!enable}
                    >
                        {isLoading == true ? 'Salvando senha...' : 'Salvar senha'}
                    </S.ButtonSend>
                </form>
            </S.Container>

            <ModalMsg 
                open={errorMsg} 
                onClose={() => setErrorMsg(!errorMsg)} 
                width={469} 
                status='success'
                mensage='Senha alterada com sucesso.'            
            />
        </>
    );
};

export default NewPassword;