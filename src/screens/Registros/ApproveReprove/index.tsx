import React, { useEffect } from 'react';
import * as S from './style';
import {
    useService,
    api,
    useSources,
    useOccurrences,
    putOccurrences
} from '../../../services';
import {
    PersonalModal
} from '../../../components';
import { 
    blueAlert,
    modalIconClose,
    mapsDefault
} from '../../../assets';
import {
    useForm,
    SubmitHandler,
} from "react-hook-form";
import {
    FormData,
} from '../newOccurence/types';
import { useMutation } from 'react-query';
import { queryClient } from '../../../services/index';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores';

interface IProps {
    onHide: () => void,
    isModal: boolean,
    itemEdit: any
}

const ApproveReprove: React.FC<IProps> = ({ onHide, isModal, itemEdit }) => {
    const { token } = useSelector((state: RootState) => state.clickState);

    const {
        handleSubmit,
        watch,
        register,
        setValue,
        reset
    } = useForm<FormData>({
        mode: 'onChange',
        defaultValues: {
            
        }
    });

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

    const putOccurrence = (id: string, dados: any) => {
        const resp = api.put(`/occurrences/${id}`, dados, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return resp
    }

    const onSubmit = (values: FormData) => {
        putOccurrences(token, itemEdit.id, values)
        console.log(values, 'valores submit');
    };

    console.log(watch('status'))

    return (
        <PersonalModal
            modalBackground={false}
            padding={4}
            width={469}
            open={isModal}
            onClose={onHide}
        >
            <S.Container>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <S.Approve htmlFor="approve">
                            <img src="" alt="" />
                            Aprovar
                            <input 
                                {...register('status')}
                                type="radio" 
                                name="status" 
                                id="approve"
                                value="Approved"
                                defaultChecked={true}
                            />
                        </S.Approve>
                        <S.Repprove htmlFor="reprove">
                            <img src="" alt="" />
                            Aprovar
                            <input 
                                {...register('status')}
                                type="radio" 
                                name="status" 
                                id="reprove" 
                                value='Disapproved'
                            />
                        </S.Repprove>
                    </fieldset>
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
                            type='button'
                            onClick={() => {
                                
                            }}
                        >
                            Finalizar
                        </button>
                    </S.ContainerBtn>
                </form>
            </S.Container>
        </PersonalModal>
    );
};

export default ApproveReprove;