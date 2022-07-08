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
    PersonalModal, SwitchOptions
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
import { AxiosResponse } from 'axios';

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
        reset,
    } = useForm<FormData>({
        mode: 'onChange',
        defaultValues: {
            "status": "Disapproved"
        }
    });


    // const { mutate: put } = useMutation(putOccurrences, {
    //     onSuccess: () => {

    //     }
    // })

    function onSubmit (values: FormData) {
        const obj = Object.assign(itemEdit, {
            'status': values.status,
            "service": itemEdit.service.id,
            "source": itemEdit.source.id
        })

        //put(token, itemEdit.id, obj)

        console.log(token, values, 'valores submit');
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

    console.log(itemEdit)

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
                    <SwitchOptions 
                        width='252px'
                        register={register}
                        checkedOne={itemEdit.status === 'Approved' ? true : false}
                        checkedTwo={itemEdit.status === 'Disapproved' || itemEdit.status === 'Waiting' ? true : false }
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
                            type='submit'
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