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

const FormService: React.FC<IProps> = ({onHide, isModal, itemEdit}) => {
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
        control,
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();

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
                setServiceId(resp.data.id);
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
            }
                
            await postSource(token, _service).then((resp) => {
                setSuccessMsg(true)
                putSource(token, resp.data.id, {
                    "service": serviceId
                }).then(() => {
                    putService(token, serviceId, {
                        "sources": [
                            resp.data.id
                        ]
                    })
                })
                return resp.data
            }).catch((error) => {
                console.log(error);
                setErrMsg(true)
                return error
            });
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
            const _data: any = {
              ...itemEdit
            };
      
            for (const key of Object.keys(_data)) {
              if (Array.isArray(_data[key]) && _data[key]?.[0]?.id) {
                _data[key] = _data[key].map((v: any) => ({ id: v.id }));
              } else if (_data[key]?.id) {
                _data[key] = _data[key]?.id;
              }
            }
      
            await putService(token, _data?.id, _data);
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

    useEffect(() => {
        BACKGROUND_COLOR.forEach((id) => {
            if(itemEdit?.background_color === id?.value){
                setDefaultColor(id.label)
            }
        })
    }, [defaultColor])

    console.log(defaultColor, 'bg');

    return (
        <PersonalModal 
            modalBackground={false}
            onClose={onHide}
            padding={4}
            open={isModal}
            width={861}        
        >
            <S.Container>
                <h1>{itemEdit === null ? "Cadastrar serviço" : "Editar serviço"}</h1>
                <S.Form onSubmit={handleSubmit(handleOnSubmit)}>
                    <input type="hidden" {...register(`id`)}/>
                    <S.Header>
                        <InputIcon />
                        <div>
                            <Controller 
                                name='name'
                                control={control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <CustomInput 
                                        label='Digite o nome do serviço' 
                                        type='Text' 
                                        value={value} 
                                        width={254}                            
                                        onChange={onChange} 
                                        onBlur={onBlur}
                                        id="name_service" 
                                    />
                                )}
                            />
                            <Controller 
                                name='background_color'
                                control={control}
                                render={({field: {onChange, onBlur, value}}) => (
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
                                                addField(sourceFieldArray as any, {
                                                    name: value
                                                })
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
                        >
                            Cancelar
                        </button>
                        <button 
                            id='submit-service'
                            type='submit'
                        >
                            {itemEdit === null && (
                                <>
                                    {isSubmitting
                                        ? "Cadastrando ..." 
                                        : "Finalizar cadastro"
                                    }
                                </>
                            )}
                            {itemEdit !== null && (
                                <>
                                    {isSubmitting 
                                        ? "Editando..."
                                        : "Finalizar edição"
                                    }
                                </>
                            )}
                        </button>
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