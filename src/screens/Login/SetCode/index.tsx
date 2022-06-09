import React, { useEffect, useState } from 'react';
import * as S from './style';
import { iconShow } from '../../../assets/index';
import ReactInputVerificationCode from 'react-input-verification-code';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../stores';
import { ModalMsg, PersonalModal } from '../../../components';
import NewPassword from '../NewsPassword';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { api } from "../../../services";
import { useMutation } from 'react-query';
import { queryClient } from '../../../services/index';
import * as Yup from 'yup';
import { SENDCODE } from '../../../stores/actions';

interface IProps {
    onClose: () => void,
    closeOne: () => void
}

interface Username {
    username: string
}

const schema = Yup.object().shape({
    username: Yup.string().required("E-mail ou WhatsApp são obrigatórios")
})

const SetCode: React.FC<IProps> = ({onClose, closeOne}) => {
    const dispatch = useDispatch();
    const { sendcode, username } = useSelector((state : RootState) => state.clickState)
    const [ recoveryPassword, setRecoveryPassword ] = useState(false);
    const [ codeValue, setCodeValeu ] = useState('');
    const [ disable, setDisble ] = useState<boolean>(false);
    const [ errorMsg, setErrorMsg ] = useState(false);

    const { 
        register,
        handleSubmit,
        setValue
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

    useEffect(() => {
        let regex = codeValue?.match(/\d+/g)?.join('')

        if(regex !== undefined && regex?.length === 6){
            console.log(regex);
            setDisble(false)
        } else if( regex !== undefined && regex?.length < 6 || regex === undefined){
            setDisble(true)
        } else {
            setDisble(false)
        }
    }, [codeValue]);

    setValue("username", username)

    return (
        <div>
            <S.Container>
                <S.ButtonBack
                    onClick={onClose}
                >
                    <img src={iconShow} alt="" />
                </S.ButtonBack>
                <h1>Código de segurança</h1>
                <p>Digite no campo abaixo o código que você recebeu.</p>
                <S.InputCode>
                    <ReactInputVerificationCode
                        onChange={(e: any) => {
                            setCodeValeu(e)
                        }}
                        placeholder="-"
                        type="text"
                        length={6}
                        value={codeValue}
                    />
                </S.InputCode>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" {...register("username")}/>
                    <div>
                        <p>Não recebeu o código ainda?</p>
                        <button
                            type='submit'
                        >
                            Enviar novamente
                        </button>
                    </div>
                </form>
                <S.ButtonSend
                    type="button"
                    disabled={disable}
                    onClick={() => {
                        if(codeValue == sendcode.code){
                            setRecoveryPassword(true)
                        } else {
                            setErrorMsg(!errorMsg)
                        }
                    }}
                >
                    Confirmar código
                </S.ButtonSend>
            </S.Container>
            <ModalMsg 
                height='312px'
                modalBackground={true}
                open={errorMsg} 
                onClose={() => setErrorMsg(!errorMsg)} 
                width={469} 
                status=''
                mensage='Código inválido, verifique e tente novamente.'            
            />
            <PersonalModal 
                modalBackground={true}
                open={recoveryPassword} 
                onClose={() => setRecoveryPassword(false)}
                width={568}
                padding={0}
                children={
                    <NewPassword 
                        onClose={() => setRecoveryPassword(false)}
                        closeOne={() => closeOne()}
                        closeTwo={() => onClose()}
                    />
                }
            />
        </div>
    );
};

export default SetCode;