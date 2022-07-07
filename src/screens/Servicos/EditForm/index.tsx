import React, { useEffect, useState } from 'react';
import * as S from './style';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores';
import { useMutation } from 'react-query';
import { alertRed } from '../../../assets';
import { BACKGROUND_COLOR } from '../../../constants/backgroundColor';
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
    api, 
    deleteSource, 
    postService, 
    postSource, 
    putService, 
    putSource, 
    queryClient, 
    useSources,
    getSourceById
} from '../../../services';
import { 
    FormData,
    ISources,
    IProps,
    IPropsSources,
    IServices
} from './types';
import { AxiosResponse } from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './validation-schema';

const EditForm: React.FC<IProps> = ({onHide, isModal, itemEdit}) => {
    const { token } = useSelector((state : RootState) => state.clickState);
    const [ isSourceConfirm, setSourceConfirm ] = useState(false);
    const [ isVisibleModal, setVisibleModal ] = useState<string | false >(false);
    const [ service, setService ] = useState<IServices>();
    const [ successMsg, setSuccessMsg ] = useState(false);
    const [ errMsg, setErrMsg ] = useState(false);
    const [ defaultColor, setDefaultColor ] = useState('');
    const [ isSourceSelected, setSourceSelected ] = useState<{ 
        name: string,
        index: number,
    }>();

    const {
        control,
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        getValues,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<FormData>({
        mode: "onChange",
        resolver: yupResolver(schema)
    });

    const { fields, append, remove, insert, update } = useFieldArray({
        control,
        keyName: 'id_source',
        name: 'sources'
    })

    const watchName = watch('name');
    const watchBg = watch('background_color');
    const watchId = watch('id');
    const watchSources = watch('sources');

    useEffect(() => {
        if(!itemEdit) return;

        Object.keys(itemEdit).map((keys) => {
            let key = keys as keyof unknown;
            setValue(key as any, itemEdit[key] as any)
        })
    }, [itemEdit, setValue]);

    async function registerService(values: FormData){
        const { sources, ...item } = values;

        const data: any = {};

        Object.keys(item).map((keys) => {
            let key = keys as keyof unknown;
            if(item[key] !== '') data[key] = item[key]
            else data[key] = null
        });

        if(Object.entries(data).length === 0) return;

        const method: Promise<AxiosResponse<any, any>> = !!data.id
            ? putService(token, data.id, data)
            : postService(token, data);
        
        return await method
            .then((resp) => {
                console.log(resp.data.id);
                setSuccessMsg(!successMsg)
                return resp.data
            })
            .catch((error) => {
                console.log(error)
                return error
            })
    };

    async function handleOnSubmit(values: FormData){
        try {
            console.log('values', values)
            
            let _data = [
                ...(fields || [])
            ];
            
            _data?.forEach((id, index) => {
                if(id.id === null || id.id === undefined || id.id === ""){
                    postSource(token, {
                        name: id.name, 
                        service: id.service
                    }).then((resp) => {
                        update(index, resp.data)
                    })
                } else {
                    update(index, id)
                }
            })

            let temp: any = getValues();

            delete temp.sources
            
            const _service: IServices = await registerService(values);
            setService(_service);
            
            console.log(temp, 'VALUES FFFF');
            
        }
        catch(error){
            console.log('error')
        }
    };

    useEffect(() => {
        if (!isModal) {
            setDefaultColor("")
            reset();
        }
    }, [isModal, reset]);

    useEffect(() => {
        BACKGROUND_COLOR.forEach((id) => {
            if(itemEdit?.background_color === id?.value){
                setDefaultColor(id.label)
            }
        })
    }, [defaultColor]);


    return (
        <PersonalModal 
            modalBackground={false}
            onClose={onHide}
            padding={4}
            open={isModal}
            width={861}        
        >
            <S.Container>
                <h1>Editar serviço</h1>
                <S.Form onSubmit={handleSubmit(handleOnSubmit)}>
                    <input type="hidden" {...register(`id`)}/>
                    <S.Header>
                        <InputIcon />
                        <div>
                            <Controller 
                                name='name'
                                control={control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <>
                                        <CustomInput 
                                            label='Digite o nome do serviço' 
                                            type='Text' 
                                            value={value} 
                                            width={254}                            
                                            onChange={onChange} 
                                            onBlur={onBlur}
                                            id="name_service" 
                                        />
                                        {errors?.name && (
                                            <p style={{color: 'red'}}>
                                                Nome do serviço é obrigatório!
                                            </p>
                                        )}
                                    </>
                                )}
                            />
                            <Controller 
                                name='background_color'
                                control={control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <>
                                        <CustomSelect
                                            width={254}
                                            label='Cor de background'
                                            list={BACKGROUND_COLOR}
                                            value={value == '' ? '#FF954E' : value}
                                            defaultValue={value}
                                            labelDefault="Cor de background"
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            id="background_color"
                                        />
                                        {errors?.background_color && (
                                            <p style={{color: 'red'}}>
                                                Cor do background é obrigatório!
                                            </p>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                        <fieldset>
                            <label htmlFor="">
                                Status do serviço
                            </label>
                            <Controller 
                                name='active'
                                control={control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <CustomSwitch
                                        leftLabel="Inativo"
                                        rightLabel="Ativo"
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        defaultValue={value}
                                    />
                                )}
                            />
                        </fieldset>
                    </S.Header>
                    <S.Fonts>
                        <h1>Fontes</h1>
                        <div>
                            <Controller 
                                //@ts-ignore
                                name={`sources.${isSourceSelected?.index}.name`}
                                control={control}
                                render={({field: {onChange, onBlur, value, name}}) => (
                                    <>
                                        <CustomInput
                                            name={name}
                                            label='Digite o nome da fonte'
                                            type='Text'
                                            value={value}
                                            width={372}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            id="name-source"
                                        />
                                        <S.Button
                                            disabled={value === "" ? true : false}
                                            id='submit-source' 
                                            type="button"
                                            onClick={() => {
                                                append({
                                                    //@ts-ignore
                                                    name: value,
                                                    service: watchId
                                                })
                                                setValue(name, '')
                                            }}
                                        >
                                            Adicionar
                                        </S.Button>
                                    </>
                                )}
                            />
                        </div>
                    </S.Fonts>
                    <S.ItemsList>
                        {fields.map((field, index) => {
                            return (
                                <S.Item>
                                    {field.name}
                                    <button
                                        id='remove-source'
                                        type='button'
                                        onClick={() => {
                                            if(field.id !== null && field.id !== undefined && field.id !== ""){
                                                deleteSource(token, field.id)
                                            }
                                            remove(index)
                                        }}
                                    >
                                        <img src={alertRed} alt="" />
                                    </button>
                                </S.Item>
                            )
                        })}
                    </S.ItemsList>
                    <S.AnotherOptions>
                        <input 
                            id="other_option"
                            type="checkbox" 
                            {...register('other_option')}
                        />
                        <label>Incluir opção <b>outros</b></label>
                    </S.AnotherOptions>
                    <S.ContainerBtn>
                        <button 
                            id='close-modal'
                            type="button" 
                            onClick={() => {
                                reset()
                                onHide()
                            }}
                        >
                            Cancelar
                        </button>
                        <S.ButtonSubmit
                            disabled={!isDirty || !isValid}
                            id='submit-service'
                            type='submit'
                        >
                            
                            {isSubmitting 
                                ? "Editando..."
                                : "Finalizar edição"
                            }
                        </S.ButtonSubmit>
                    </S.ContainerBtn>
                </S.Form>
            </S.Container>
            <ModalMsg
                height='312px'
                modalBackground={false} 
                mensage={itemEdit !== null 
                    ?'O serviço foi editado com sucesso!'
                    :'O serviço foi cadastrado com sucesso!'
                }
                onClose={() => {
                    reset()
                    setSuccessMsg(!successMsg)
                    onHide()
                }}
                open={successMsg}
                status="success"
                width={496}
            />
            <ModalMsg 
                height='312px'
                modalBackground={false}
                mensage='Falha ao cadastrar serviço!'
                onClose={() => {
                    reset()
                    setErrMsg(!errMsg)
                    onHide()
                }}
                open={errMsg}
                status="falha"
                width={496}
            />
        </PersonalModal>
    );
};

export default EditForm;