import React, { useEffect, useState } from 'react';
import * as S from './style';
import { iconShow } from '../../../assets/index';
import ReactInputVerificationCode from 'react-input-verification-code';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores';
import { ModalMsg, PersonalModal } from '../../../components';
import NewPassword from '../NewsPassword';

interface IProps {
    onClose: () => void,
    closeOne: () => void
}

const SetCode: React.FC<IProps> = ({onClose, closeOne}) => {
    const { sendcode } = useSelector((state : RootState) => state.clickState)
    const [ recoveryPassword, setRecoveryPassword ] = useState(false);
    const [ codeValue, setCodeValeu ] = useState('');
    const [ disable, setDisble ] = useState<boolean>(false);
    const [ errorMsg, setErrorMsg ] = useState(false);

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
                <form>
                    <fieldset>
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
                    </fieldset>
                    <div>
                        <p>Não recebeu o código ainda?</p>
                        <button
                            type='button'
                            onClick={() => {
                                onClose()
                            }}
                        >
                            Enviar novamente
                        </button>
                    </div>
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
                </form>
            </S.Container>
            <ModalMsg 
                open={errorMsg} 
                onClose={() => setErrorMsg(!errorMsg)} 
                width={469} 
                status=''
                mensage='Código inválido, verifique e tente novamente.'            
            />
            <PersonalModal 
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