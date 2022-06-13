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
    SourceFormData, 
} from '../../../@types';
import { api, queryClient, useSources } from '../../../services';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores';
import { alertRed } from '../../../assets';
import { useMutation } from 'react-query';

interface IProps {
    isModal: boolean;
    onHide: () => void;
}

const NewService: React.FC <IProps> = ({ isModal, onHide }) => {
    const { token } = useSelector((state : RootState) => state.clickState);
    const { data: sources } = useSources(token);

    const [ isFontSelected, setFontSelected ] = useState<{ name: string; index: any; }>();
    const [ sourcesList, setSourcesList ] = useState<any>([]);
    const [ successMsg, setSuccessMsg ] = useState(false);
    const [ errMsg, setErrMsg ] = useState(false);
    const [ otherOptions, setOtherOptions ] = useState<boolean>(false);

    const refSubmit = useRef<any>(null);

    const {
        control,
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ServiceFormData>();

    const {
        handleSubmit: handleSources,
        control: controlSOurce,
        reset: resetSource,
        setValue: setValueSource,
        formState: { isSubmitting: SubmitSource }
    } = useForm<SourceFormData>();  

    const fontsFieldArray = useFieldArray({
        control,
        name: 'sources',
    });

    const postService = async (dados: ServiceFormData) => {
        const {data: resp} = await api.post('/services', dados, {
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        });
        return resp;
    };

    const postSource = async (dados: SourceFormData) => {
        const resp = api.post(`/sources`, dados, {
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        });
        return resp
    };

    const deleteSource = async (id: any) => {
        const resp = await api.delete(`/sources/${id}`, {
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        })

        return resp
    };

    const addField = (field: UseFieldArrayReturn, values?: any) => {
        field.append(values || {});
    };

    const removeField = (field: UseFieldArrayReturn, index: number) => {
        field.remove(index);
    };

    const { mutate: mutateService } = useMutation(postService, {
        onSuccess: () => {
          queryClient.invalidateQueries('services');
          setSuccessMsg(true)
          setSourcesList([])
        }
    });

    const { mutate: mutateSource, isLoading } = useMutation(postSource, {
        onSuccess: (resp) => {
            queryClient.invalidateQueries('sources')
            console.log(resp.data, 'resp')

            let obj =  [
                ...sourcesList, 
                resp.data.id
            ]

            setSourcesList(obj)
            setValueSource('name', '')

        }
    });

    const onSubmitService = (values: ServiceFormData) => {
        const obj = {
            'name': values.name,
            'background_color': values.background_color,
            'active': values.active,
            'other_option': otherOptions,
            'sources': sourcesList
        }

        mutateService(obj);
    };

    const onSubmitSource = (values: SourceFormData) => {
        const obj = {
            "name": values.name
        }

        mutateSource(obj)
    };

    setValue('other_option', otherOptions);

    useEffect(() => {
        if (!isModal) {
          reset();
          resetSource();
          setSourcesList([])
        }
    }, [isModal, reset]);

    const colors = [
        {label: 'Laranja', value: '#FF954E'},
        {label: 'Ciano', value: '#47DED0'},
        {label: 'Lilas', value: '#9D86ED'},
        {label: 'Rosa', value: '#FF77F1'},
        {label: 'Verde', value: '#B8D335'},
        {label: 'Amarelro escuro', value: '#E59724'},
        {label: 'Azul', value: '#4A7EE4'},
        {label: 'Amarelo', value: '#FFB906'}
    ];
    
    return(
        <PersonalModal 
            modalBackground={false}
            onClose={onHide}
            padding={4}
            open={isModal}
            width={861}
            children={
                <S.Container>
                    <h1>Cadastrar serviço</h1>
                    <S.Form onSubmit={handleSubmit(onSubmitService)}>
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
                                            list={colors}
                                            value={value}
                                            labelDefault='Cor de background'
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
                                            value={value?.toString() === "false"}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                        />
                                    )}
                                />
                            </fieldset>
                        </S.Header>
                        <button 
                            type='submit'
                            ref={refSubmit}
                            style={{display: 'none'}}
                        />
                    </S.Form>

                    <form onSubmit={handleSources(onSubmitSource)}>
                        <S.Fonts>
                            <h1>Fontes</h1>
                            <div>
                                <Controller 
                                    name='name'
                                    control={controlSOurce}
                                    render={({field: {onChange, onBlur, value}}) => (
                                        <>
                                            <CustomInput
                                                label='Digite o nome da fonte'
                                                type='Text'
                                                value={value}
                                                width={372}
                                                onBlur={onBlur}
                                                onChange={onChange}
                                                id="name-source"
                                            />
                                            <S.Button
                                                id='submit-source' 
                                                type="submit"
                                                onClick={() => {
                                                    addField(fontsFieldArray as any, {
                                                        name: value
                                                    })
                                                }}
                                            >
                                                {isLoading ? (
                                                    "Adicionando ..."
                                                ) : (
                                                    "Adicionar"
                                                )}
                                            </S.Button>
                                        </>
                                    )}
                                
                                />
                            </div>
                        </S.Fonts>
                    </form>
                    <S.ItemsList>
                        {fontsFieldArray?.fields?.map((field, index) => {
                            return (
                                <S.Item>
                                    {field.name}
                                    <button
                                        id='remove-source'
                                        type='button'
                                        onClick={() => {
                                            if(!watch(`sources.${index}.id`)){
                                                removeField(fontsFieldArray as any, index);
                                                sources?.forEach((id) => {
                                                    if(id.name === field.name){
                                                        deleteSource(id?.id)
                                                    }
                                                })
                                            } else {
                                                setFontSelected({
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
                            onClick={() => {
                                setOtherOptions(!otherOptions)
                            }}
                        />
                        <label>Incluir opção <b>outros</b></label>
                    </S.AnotherOptions>
                    <S.ContainerBtn>
                        <button 
                            id='close-modal'
                            type="button" 
                            onClick={() => {
                                onHide();
                                fontsFieldArray?.fields?.map((field, index) => {
                                    if(!watch(`sources.${index}.id`)){
                                        removeField(fontsFieldArray as any, index);
                                        sources?.forEach((id) => {
                                            if(id.name === field.name){
                                                deleteSource(id?.id)
                                            }
                                        })
                                    }
                                })
                            }}
                        >
                            Cancelar
                        </button>
                        <button 
                            id='submit-service'
                            type='button'
                            onClick={() => {
                                refSubmit?.current?.click();
                            }}
                        >
                            {isSubmitting ? (
                                "Cadastrando ..."
                            ) : (
                                "Finalizar cadastro"
                            )}
                        </button>
                    </S.ContainerBtn>
                    <ModalMsg
                        height='312px'
                        modalBackground={false} 
                        mensage='O serviço foi cadastrado com sucesso!'
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
                </S.Container>
            }
        />
    );
};

export default NewService;