import React, { useEffect, useState } from 'react';
import * as S from './style';
import { 
    CustomSelect, 
    CustomInput,
    InputIcon,
    CustomSwitch 
} from '../../../components';
import { 
    Controller,
    useFieldArray, 
    UseFieldArrayReturn, 
    useForm 
} from 'react-hook-form';
import { 
    ServiceFormData, 
    Services 
} from '../../../@types';
import { api } from '../../../services';
import { AxiosResponse } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores';
import { alertRed } from '../../../assets';

const NewService: React.FC = () => {
    const { token } = useSelector((state : RootState) => state.clickState);
    const [ services, setServices ] = useState<Services>();
    const [ isFontSelected, setFontSelected ] = useState<{ name: string; index: any; }>();
    const [ sourceConfirm, setSourceConfirm ] = useState(false);
    const [ sourceValue, setSourceValue ] = useState<string>();

    const {
        control,
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<ServiceFormData>();

    const fontsFieldArray = useFieldArray({
        control,
        name: "sources",
    });

    const postService = async (token: string, { id, ...dados }: any ) => {
        const { data: response } = await api.post('/services', dados, {
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    };

    const putService = async (token: string, id:any, data: Services ) => {
        const { data: response } = await api.put(`/services/${id}`, data, {
            'headers': {
                'Authorization': `Bearer: ${token}`
            }
        });
        return response.data;
    };

    const postSource = async (token: string, { id, ...dados }: any) => {
        const { data: response } = await api.post(`/sources`, dados, {
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data
    };

    const putSource = async (token: string, id: any, dados: any) => {
        const { data: response } = await api.put(`/sources/${id}`, dados, {
            'headers': {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data
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
            let key = keys as keyof unknown
            if (item[key] !== '') data[key] = item[key];
            else data[key] = null;
        });

        if (Object.entries(data).length === 0) return;
        
        const method: Promise<AxiosResponse <any, any> > = !!data.id 
            ? putService(token, data.id,data)
            : postService(token, data)

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

            let arraySources = [
                ...(values?.sources || [])
            ];

            for await(let item of arraySources){
                let data: any = {
                    services: _service.id
                };

                Object.keys(item).map((keys) => {
                    let key = keys as keyof unknown;
                    if(item[key] !== '') data[key] = item[key];
                    else data[key] = null;
                });

                if(!!data){
                    const method = !!data?.id
                    ? putSource(token, data?.id, data)
                    : postSource(token, data)
                    
                    await method
                        .then((resp) => {
                            return resp.data
                        }).catch((error) => {
                            return error
                        })
                };
            };
        }

        catch(error){
            console.log(error)
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

    return(
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
                        <input type='hidden' {...register(`sources.${isFontSelected?.index}.id`)}/>
                        <Controller 
                            name={`sources.${isFontSelected?.index}.name`}
                            control={control}
                            render={({field: {onChange, onBlur, value}}) => (
                                <CustomInput
                                    label='Digite o nome da fonte'
                                    type='Text'
                                    value={value}
                                    width={372}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                            )}
                        
                        />
                        <S.Button 
                            type="button"
                            onClick={() => {
                                addField(fontsFieldArray as any, { type: 'sources' })
                            }}
                        >
                            Adicionar
                        </S.Button>
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
                    <button type="button">Cancelar</button>
                    <button type="submit">Finalizar cadastro</button>
                </S.ContainerBtn>
            </S.Form>
        </S.Container>
    );
};

export default NewService;