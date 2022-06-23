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
import { alertRed, services } from '../../../assets';
import { useMutation } from 'react-query';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { BACKGROUND_COLOR } from '../../../constants/backgroundColor';

interface IProps {
    isModal: boolean;
    onHide: () => void;
    service: any
}

const EditService: React.FC <IProps> = ({ isModal, onHide, service }) => {
    const { token } = useSelector((state : RootState) => state.clickState);
    const { data: source } = useSources(token);
    const [ successMsg, setSuccessMsg ] = useState(false);
    const [ errMsg, setErrMsg ] = useState(false);
    const [ isFontSelected, setFontSelected ] = useState<{ name: string; index: any; }>();
    const [ sourcesList, setSourcesList ] = useState<any>([]);
    const [ otherOptions, setOtherOptions ] = useState<boolean>(false);
    const [ backgroundColor, setBackgroundColor ] = useState('');
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

    useEffect(() => {
        if(service !== undefined || service !== null) {
            reset(service)
        }
    }, [service])

    const putService = async (id: string, dados?: any) => {
        const { data: resp } = await api.put(`/services/${id}`, dados, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return resp
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

    const fontsFieldArray = useFieldArray({
        control,
        name: 'sources',
    });

    const { mutate: mutateService } = useMutation(putService, {
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

    const { mutate: mutateDeleteSource } = useMutation(deleteSource, {
        onSuccess: () => {
            queryClient.invalidateQueries('sources')
        }
    })

    const onSubmitService = (values: ServiceFormData) => {

        const obj = {
            'name': values.name,
            'background_color': values.background_color,
            'active': values.active,
            'other_option': otherOptions,
            'sources': sourcesList
        }
        let aux = Object.assign(service, obj)
        
        mutateService(service.id, aux);
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

    useEffect(() => {
        BACKGROUND_COLOR.map((id) => {
            if(id.value === service?.background_color){
                setBackgroundColor(id.label)
            }
        })
    }, [service]);    
    
    return (
        <>
            <PersonalModal 
                open={isModal} 
                onClose={onHide} 
                width={861}
                padding={4} 
                modalBackground={false}            
                children={  
                    <S.Container>
                    <h1>Editar serviço</h1>
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
                                            list={BACKGROUND_COLOR}
                                            value={value}
                                            label="Cor de background"
                                            defaultValue={value}
                                            labelDefault={backgroundColor}
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
                                            defaultValue={service?.active == true ? true : false}
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
                                <>
                                    <S.Item key={field.id}>
                                        {field.name}
                                        <button
                                            id='remove-source'
                                            type='button'
                                            onClick={() => {
                                                if(!watch(`sources.${index}.id`)){
                                                    source?.forEach((id) => {
                                                        if(id.name === field.name){
                                                            removeField(fontsFieldArray as any, index);
                                                            mutateDeleteSource(id?.id)
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
                                </>
                            )
                        })}
                    </S.ItemsList>
                    <S.AnotherOptions>
                        <input 
                            checked={service?.other_option === true ? true : false}
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
                                        source?.forEach((id) => {
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
                                "Finalizar edição"
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

            <>
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
                    mensage='Falaha ao editar serviço!'
                    onClose={() => {
                        setErrMsg(!errMsg)
                        onHide()
                    }}
                    open={errMsg}
                    status="falha"
                    width={496}
                />
            </>
        </>
    );
};

export default EditService;