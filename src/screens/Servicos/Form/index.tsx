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
    useSources 
} from '../../../services';
import { 
    FormData,
    ISources,
    IProps,
    IPropsSources,
    IServices
} from './types';
import { AxiosResponse } from 'axios';
import { schema } from './validation-schema';
import { yupResolver } from '@hookform/resolvers/yup';

const FormService: React.FC<IProps> = ({onHide, isModal}) => {
    const { token } = useSelector((state : RootState) => state.clickState);
    const [ isSourceConfirm, setSourceConfirm ] = useState(false);
    const [ isVisibleModal, setVisibleModal ] = useState<string | false >(false);
    const [ service, setService ] = useState<IServices>();
    const [ successMsg, setSuccessMsg ] = useState(false);
    const [ serviceId, setServiceId ] = useState('');
    const [ sourcesId, setSourceId ] = useState('');
    const [ errMsg, setErrMsg ] = useState(false);
    const [ defaultColor, setDefaultColor ] = useState('');
    const [ isSourceSelected, setSourceSelected ] = useState<{ 
        name: string,
        index: number,
    }>();

    const {
        formState: { errors, isSubmitting, isDirty, isValid },
        control,
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        getValues,
    } = useForm<FormData>({
        mode: "onChange",
        resolver: yupResolver(schema)
    });

    const watchName = watch('name');
    const watchBg = watch('background_color');

    const sourceFieldArray = useFieldArray({
        control,
        name: "sources"
    });

    const addField = (field: UseFieldArrayReturn, values?: any) => {
        field.append(values || {});
    };

    const removeField = (field: UseFieldArrayReturn, index?: number) => {
        field.remove(index)
    };

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
                setServiceId(resp.data.id);
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

            const _service: IServices = await registerService(values);
            setService(_service);

            if(!_service.id) return;

            let arraySources = [
                ...(values?.sources || [])
            ];

            for await (let item of arraySources){
                let data: any = {
                    service: _service.id,
                };

                Object.keys(item).map((keys) => {
                    let key = keys as keyof unknown;
                    if (item[key] !== "") {
                        return data[key] = item[key]
                    } else {
                        return data[key] = null
                    };
                });

                if (!!data) {
                    await postSource(token, data).then((resp) => {
                        putSource(token, resp.data.id, {
                            "service": _service.id
                        })
                    })
                  }
            }
        }
        catch(error){
            console.log('error')
        }
    };

    async function handleDeleteSource(){
        if(!isSourceSelected) return;

        const { name, index } = isSourceSelected;
        const fieldArray: any =
            name === "sources" ? sourceFieldArray : sourceFieldArray;
        const id = watch(`${name}.${index}.id` as any);
        
        console.log(id,'id source')
        
        if (!id) return removeField(fieldArray, index);

        try {
            await deleteSource(token, id);
            removeField(fieldArray, index);
            
          } catch (error) {
            setVisibleModal("error");
          }
    };

    useEffect(() => {
        handleDeleteSource()
    }, [isSourceSelected])

    useEffect(() => {
        if (!isModal) {
            setDefaultColor("")
            reset();
        }
    }, [isModal, reset]);

    return (
        <PersonalModal 
            modalBackground={false}
            onClose={onHide}
            padding={4}
            open={isModal}
            width={861}        
        >
            <S.Container>
                <h1>Cadastrar serviço</h1>
                <S.Form onSubmit={handleSubmit(handleOnSubmit)}>
                    <input type="hidden" {...register(`id`)}/>
                    <S.Header>
                        <InputIcon />
                        <div>
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
                        </div>
                        <fieldset>
                            <label htmlFor="">
                                Status do serviço:
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
                                                addField(sourceFieldArray as any, {
                                                    name: value
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
                        {sourceFieldArray?.fields?.map((field, index) => {
                            return (
                                <S.Item>
                                    {field.name}
                                    <button
                                        id='remove-source'
                                        type='button'
                                        onClick={() => {
                                            if(!watch(`sources.${index}.id`)){
                                                removeField(sourceFieldArray as any, index);
                                            } else {
                                                setSourceConfirm(true)
                                                setSourceSelected({
                                                    index,
                                                    name: 'sources'
                                                })
                                            }
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
                            onClick={() => onHide()} 
                        >
                            Cancelar
                        </button>
                        <S.ButtonSubmit 
                            id='submit-service'
                            type='submit'
                            disabled={!isDirty || !isValid}
                        >
                            {isSubmitting
                                ? "Cadastrando ..." 
                                : "Finalizar cadastro"
                            }
                        </S.ButtonSubmit>
                    </S.ContainerBtn>
                </S.Form>
            </S.Container>
            <ModalMsg
                height='312px'
                modalBackground={false} 
                mensage='O serviço foi editado com sucesso!'
                onClose={() => {
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
                mensage='Falaha ao cadastrar serviço!'
                onClose={() => {
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

export default FormService;