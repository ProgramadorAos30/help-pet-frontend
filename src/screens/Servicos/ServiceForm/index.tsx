import React, { useEffect, useRef, useState } from 'react';
import * as S from './style';
import { 
    CustomSelect, 
    CustomInput,
    InputIcon,
    CustomSwitch, 
    ModalMsg,
    PersonalModal
} from '../../../components';
import { 
    Controller,
    useFieldArray, 
    UseFieldArrayReturn, 
    useForm 
} from 'react-hook-form';
import { 
    ServiceFormData, 
    Services,
    Soucers,
    SourceFormData, 
} from '../../../@types';
import { 
    api, 
    postService, 
    putService, 
    queryClient, 
    useSources 
} from '../../../services';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores';
import { alertRed } from '../../../assets';
import { useMutation } from 'react-query';
import { FormData } from '../types';
import { AxiosResponse } from 'axios';

export interface IProps {
    isModal: boolean;
    onHide: () => void;
    itemEdit?: any;
  }

const ServiceForm: React.FC <IProps> = ({ isModal, onHide, itemEdit }) => {
    const { token } = useSelector((state : RootState) => state.clickState);
    const { data: sources } = useSources(token);

    const [ sourcesList, setSourcesList ] = useState<any>([]);
    const [ successMsg, setSuccessMsg ] = useState(false);
    const [ errMsg, setErrMsg ] = useState(false);
    const [ otherOptions, setOtherOptions ] = useState(false);
    const [ isFontSelected, setFontSelected ] = useState<{ 
        name: string; 
        index: any; 
    }>();
    
    const refSubmit = useRef<any>(null);

    const {
        control,
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();

    const fontsFieldArray = useFieldArray({
        control,
        name: 'sources',
    });

    const addField = (field: UseFieldArrayReturn, values?: any) => {
        field.append(values || {});
    };

    const removeField = (field: UseFieldArrayReturn, index: number) => {
        field.remove(index);
    };
    
    useEffect(() => {
        if (!itemEdit) return;

        Object.keys(itemEdit).map((keys) => {
            let key = keys as keyof unknown;

        if (!!itemEdit?.[key]?.["id"] && key !== "sources"){
            setValue(key as any, itemEdit?.[key]?.["id"] as any)
        }
        else if (key === "sources") {
            setValue(
                "sources",
                itemEdit?.[key]
                ?.filter((v: any) => v.type === "sources")
                .map((item: Soucers) => ({
                    ...item,
                    service: item.service,
                    name: item.name
            })))
        } 
        else setValue(key as any, itemEdit[key] as any)
    })}, [itemEdit, setValue]);

    async function registerService(values: FormData){
        const { sources, ...item } = values;

        const data: any = {};

        Object.keys(item).map((keys) => {
            let key = keys as keyof unknown;
            if (item[key] !== "") data[key] = item[key];
            else data[key] = null;
        });

        if (Object.entries(data).length === 0) return;

        const method: Promise<AxiosResponse<any, any>> = !!data.id
            ? putService(token, data.id, data)
            : postService(token, data);

        return await method
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log("error");
                return error;
            });
    };

    async function handleOnSubmit(values: FormData){
        try { 

        }

        catch(error){
            
        }
    }

    useEffect(() => {
        if (!isModal) {
          reset();
          setSourcesList([])
        }
    }, [isModal, reset]);

    return (
        <PersonalModal 
            modalBackground={false}
            onClose={onHide}
            open={isModal}
            padding={4}
            width={861}
        >

        </PersonalModal>
    );
};

export default ServiceForm;