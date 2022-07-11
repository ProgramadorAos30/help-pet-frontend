import React, { useEffect, useState } from 'react';
import * as S from './style';
import {
    putOccurrences
} from '../../../services';
import {
    ModalDelete,
    ModalMsg,
    PersonalModal, SwitchOptions
} from '../../../components';
import {
    useForm,
} from "react-hook-form";
import {
    FormData,
} from '../newOccurence/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores';

interface IProps {
    onHide: () => void,
    isModal: boolean,
    itemEdit: any
}

const ApproveReprove: React.FC<IProps> = ({ onHide, isModal, itemEdit }) => {
    const { token } = useSelector((state: RootState) => state.clickState);
    const [ confirmOccurrence, setConfirmOccurrence ] = useState(false);
    const [ msgSuccess, setMsgSuccess ] = useState(false);

    const {
        handleSubmit,
        watch,
        register,
        setValue,
        reset,
    } = useForm<FormData>({
        mode: 'onChange',
        defaultValues: {
            "status": "Disapproved"
        }
    });

    function onSubmit (values: FormData) {
        const obj = Object.assign(itemEdit, {
            'status': values.status,
            "service": itemEdit.service.id,
            "source": itemEdit.source.id
        })

        putOccurrences(token, itemEdit.id, obj).then(() => {
            onHide()
            setConfirmOccurrence(false)
            setMsgSuccess(true)
        })
    };

    useEffect(() => {
        if(!itemEdit) return;

        Object.keys(itemEdit).map((keys) => {
            let key = keys as keyof unknown;
            setValue(key as any, itemEdit[key] as any)
        })
    }, [itemEdit, setValue]);

    useEffect(() => {
        if(!isModal){
            reset()
        }
    }, [isModal, reset]);


    return (
        <>
            <PersonalModal
                modalBackground={false}
                padding={4}
                width={469}
                open={isModal}
                onClose={onHide}
            >
                <S.Container>
                    <h1>Aprovação</h1>
                    <p>Selecione o status da ocorrência:</p>
                    <form>
                        <SwitchOptions 
                            width='252px'
                            register={register}
                            checkedOne={itemEdit.status === 'Disapproved' || itemEdit.status === 'Waiting' ? true : false}
                            checkedTwo={itemEdit.status === 'Approved' ? true : false}
                            status={watch('status') || 'Waiting'}
                            primaryId='reprove'
                            seccondaryId='approve'
                            primaryLabel='Reprovar'
                            seccondaryLabel='Aprovar'
                            type='occurrences'
                            valueOne='Disapproved'
                            valueTwo='Approved'
                        />
                        <S.ContainerBtn>
                            <button
                                type='button'
                                onClick={() => {
                                    onHide()
                                    reset()
                                }}
                            >
                                Voltar
                            </button>
                            <button
                                onClick={() => {
                                    setConfirmOccurrence(!confirmOccurrence)
                                }}
                                type='button'
                            >
                                Finalizar
                            </button>
                        </S.ContainerBtn>
                        <ModalDelete
                            backgroundColor={
                                watch('status') === 'Approved' 
                                ? 'true'
                                : 'false'
                            } 
                            buttonText={
                                watch('status') === 'Approved' 
                                ? 'Sim, aprovar'
                                : 'Sim, reprovar'
                            }
                            mensage={
                                watch('status') === 'Approved' 
                                ? "Deseja mesmo aprovar esta ocorrência?"
                                : "Deseja mesmo reprovar esta ocorrência?"
                            }
                            onClose={() => {
                                setConfirmOccurrence(!confirmOccurrence)
                            }}
                            onDelete={handleSubmit(onSubmit)}
                            open={confirmOccurrence}
                            width={469}
                        />
                    </form>
                </S.Container>
            </PersonalModal>
            <ModalMsg
                modalBackground={false}
                height='312px' 
                width={469}
                mensage={
                    watch('status') === 'Approved' 
                    ? 'A ocorrência foi aprovada com sucesso!'
                    : 'A ocorrência foi reprovada com sucesso!'
                }
                onClose={() => {
                    setMsgSuccess(false)
                }}
                open={msgSuccess}
                status='success'
            />
        </>
    );
};

export default ApproveReprove;