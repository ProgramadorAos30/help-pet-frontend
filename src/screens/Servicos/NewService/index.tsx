import React, { useEffect, useState } from 'react';
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
    SourceFormData
} from '../../../@types';
import { api } from '../../../services';
import { AxiosResponse } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores';
import { alertRed } from '../../../assets';

interface IProps {
    isModal: boolean;
    onHide: () => void;
}

const NewService: React.FC <IProps> = ({ isModal, onHide }) => {
    const { token } = useSelector((state : RootState) => state.clickState);
    const [ services, setServices ] = useState<Services>();
    const [ isFontSelected, setFontSelected ] = useState<{ name: string; index: any; }>();
    const [ sourceConfirm, setSourceConfirm ] = useState(false);
    const [ idSource, setIdSource ] = useState<any>([]);
    const [ successMsg, setSuccessMsg ] = useState(false);
    const [ errMsg, setErrMsg ] = useState(false);

    const {
        control,
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ServiceFormData>();

    const fontsFieldArray = useFieldArray({
        control,
        name: 'sources',
    });

    function postService (token: string, { id, ...dados }: any ) {
        const resp = api.post('/services', dados, {
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        });
        return resp;
    };

    function putService (token: string, id:string, data: Services ) {
        const resp = api.put(`/services/${id}`, data, {
            'headers': {
                'Authorization': `Bearer: ${token}`
            }
        });
        return resp;
    };

    function postSource (token: string, { id, ...dados }: any) {
        const resp = api.post(`/sources`, dados, {
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        });
        return resp
    };

    function putSource (token: string, id: string, dados: any){
        const resp = api.put(`/sources/${id}`, dados, {
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        });
        return resp
    };

    const addField = (field: UseFieldArrayReturn, values?: any) => {
        field.append(values || {});
    };

    const removeField = (field: UseFieldArrayReturn, index: number) => {
        field.remove(index);
    };

    async function registerService(values: ServiceFormData) {
        const { sources, ...item } = values;

        const data: any = [];

        Object.keys(item).map((keys) => {
            let key = keys as keyof unknown;
            if (item[key] !== "") data[key] = item[key];
            else data[key] = null;
        });

        if (Object.entries(data).length === 0) return;

        const obj: any = {
            image: values.image,
            name: values.name,
            background_color: values.background_color,
            active: values.active,
            other_option: values.other_option,
            sources: idSource
        }
        
        const method: Promise<AxiosResponse <any, any> > = !!data.id 
            ? putService(token, data.id,data)
            : postService(token, obj)
            console.log(obj, data, 'return')

        return await method
            .then((resp) => {
                return resp.data
            }).catch((error) => {
                return error
            })
    };

    async function onSubmit(values: ServiceFormData) {
        try {
            const _service: Services = await registerService(values);
            setServices(_service);

            if (!_service.id) return;

            let arraySources = [
                ...(values?.sources || [])
            ];

            for await(let item of arraySources){
                let data: any = {
                    services: _service.id
                };

                Object.keys(item).map((keys) => {
                    let key = keys as keyof unknown;
                    if (item[key] !== "") data[key] = item[key];
                    else data[key] = null;
                });

                if(!!data){
                    const method = !!data?.id
                    ? putSource(token, data?.id, data)
                    : postSource(token, data)
                    
                    await method
                        .then((resp) => {
                            setSuccessMsg(!successMsg)
                            return resp.data
                        }).catch((error) => {
                            setErrMsg(!errMsg)
                            return error
                        })
                };
            };
        }

        catch(error){
            console.log(error);
            
        }
    };

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

    useEffect(() => {
        if (!isModal) {
          reset();
        }
      }, [isModal, reset]);

    console.log(fontsFieldArray.fields);
    
    return(
        <PersonalModal 
            onClose={onHide}
            open={isModal}
            width={861}
            children={
                <S.Container>
                    <h1>Cadastrar serviço</h1>
                    <S.Form onSubmit={handleSubmit(onSubmit)}>
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
                                        />
                                    )}
                                />
                            </fieldset>
                        </S.Header>
                        <div>
                        </div>
                        <S.Fonts>
                            <h1>Fontes</h1>
                            <div>
                                <Controller 
                                    name={`sources.${isFontSelected?.index}.name`}
                                    control={control}
                                    render={({field: {onChange, onBlur, value}}) => (
                                        <>
                                            <CustomInput
                                                label='Digite o nome da fonte'
                                                type='Text'
                                                value={value}
                                                width={372}
                                                onBlur={onBlur}
                                                onChange={onChange}
                                            />
                                            <S.Button 
                                                type="button"
                                                onClick={() => {
                                                    addField(fontsFieldArray as any, {
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
                        {fontsFieldArray?.fields?.map((field, index) => {
                            return (
                                <>
                                    <S.Item>
                                        {field.name}
                                        <button
                                            type='button'
                                            onClick={() => {
                                                if(!watch(`sources.${index}.id`)){
                                                    removeField(fontsFieldArray as any, index)
                                                } else {
                                                    setSourceConfirm(true);
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
                            <input type="checkbox" {...register('other_option')} id="other"/>
                            <label htmlFor="other">Incluir opção <b>outros</b></label>
                        </S.AnotherOptions>
                        <S.ContainerBtn>
                            <button type="button" onClick={onHide}>Cancelar</button>

                            <button type="submit">
                                {isSubmitting ? (
                                    "Cadastrando ..."
                                ) : (
                                    "Finalizar cadastro"
                                )}
                            </button>
                        </S.ContainerBtn>
                    </S.Form>
                    <ModalMsg 
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