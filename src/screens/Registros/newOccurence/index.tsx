import React, { useEffect, useState } from 'react';
import * as S from './style';
import {
    useService,
    api,
    useSources,
    useOccurrences
} from '../../../services';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores';
import {
    CustomInput,
    CustomInputData,
    CustomSelect,
    CustomTextArea,
    CustomTolltip,
    ModalDelete,
    ModalMsg,
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
    Controller
} from "react-hook-form";
import {
    FormData,
    IProps
} from './types';
import { 
    TYPE_LOCAL,
    AREA
} from '../../../constants/index';
import { useMutation } from 'react-query';
import { queryClient } from '../../../services/index';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';

const NewOccurence: React.FC<IProps> = ({ onHide, isModal, itemEdit }) => {
    const { token } = useSelector((state: RootState) => state.clickState);
    const { data: services } = useService(token);
    const { data: sources } = useSources(token);
    const [ idOccurrence, setIdOccurrence ] = useState('');
    const [ open, setOpen ] = useState(false);
    const [ closeOccurrence, setCloseOccurrence ] = useState(false);

    const postOccurence = async (data: FormData) => {
        const response  = await api.post('/occurrences', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((resp) => {
            console.log(resp.data, 'resp then')
            setIdOccurrence(resp.data.id)
        });
        return response;
    };

    const putOccurence = async(id: string, data: any) => {
        const { data: response } = await api.put(`/occurrences/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    };

    const {
        handleSubmit,
        formState: { errors, isDirty, isValid, dirtyFields },
        control,
        watch,
        register,
        setValue,
        getValues,
        reset
    } = useForm<FormData>({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            // service: '',
            // source: '',
            // source_name: '',
            // date: '',
            // address: '',
            //special_place: 'NotKnow',
            have_energy_meter: 'NotKnow',
            have_hydrometer: 'NotKnow',
            have_reservoir: 'NotKnow',
            number_residents: 0,
            type_place: 'Other'
            // type_place: '',
            // area: '',
            // description: '',
            // agree_share: false,
        }
    });

    const { mutate, isLoading } = useMutation(postOccurence, {
        onSuccess: (resp) => {
            setOpen(true)
            queryClient.invalidateQueries('occurence');
            console.log(resp, 'onSuccess')
        },

    });

    const onSubmit = (values: FormData) => {
        const obj = Object.assign(values, { 
            "agree_share": values.agree_share === "Yes" ? true : false,
        })

        mutate(obj);
    };

    const watchSpecialPlate = watch('special_place')

    useEffect(() => {
        if(!isModal){
            reset()
        }
    }, [isModal, reset]);

    useEffect(() => {
        if(watchSpecialPlate !== 'Yes'){
            setValue('type_place', 'Other')
        }
    }, [watchSpecialPlate])

    console.log(isDirty, 'isDirty', isValid, 'isValid', dirtyFields);

    return (
        <>
            <PersonalModal
                modalBackground={false}
                onClose={onHide}
                padding={4}
                open={isModal}
                width={1920}  
                register={true}     
            >
                <S.Container>
                    <h1>Registrar ocorrência</h1>
                    <button
                        type='button'
                        id='close-modal'
                        onClick={() => {
                            setCloseOccurrence(!closeOccurrence)
                        }}
                    >
                        <img src={modalIconClose} alt="" />
                    </button>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <S.FormTop>
                            <S.FieldsetTop>
                                <div>
                                    <fieldset>
                                        <label htmlFor="">Qual serviço esta indisponível?</label>
                                        <div>
                                            <Controller 
                                                name='service'
                                                control={control}
                                                render={({field: { onChange, onBlur, value }}) => {
                                                    return (
                                                        <CustomSelect
                                                            id='service'
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value}
                                                            label='Serviço disponível'
                                                            labelDefault='Serviço disponível'
                                                            width={254}
                                                            childrean={
                                                                services?.map((id: any) => {
                                                                    if(id.active === true){
                                                                        return (
                                                                            <MenuItem value={id.id}>
                                                                                {id.name}
                                                                            </MenuItem>
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        />
                                                    )
                                                }}
                                            />
                                        </div>
                                        {errors.service && (
                                            <span>{errors.address?.message}</span>
                                        )}
                                    </fieldset>
                                    {watch('service') !== undefined ? 
                                        <fieldset>
                                            <label htmlFor="" style={{color: '#fff'}}>***</label>
                                            <div>
                                                <Controller 
                                                    name="source"
                                                    control={control}
                                                    render={({field: { onChange, onBlur, value }}) => {
                                                        return (
                                                            <CustomSelect
                                                                id="source"
                                                                onChange={onChange}
                                                                onBlur={onBlur}
                                                                value={value}
                                                                label='Selecione a fonte'
                                                                labelDefault='Selecione a fonte'
                                                                width={254}
                                                                childrean={
                                                                    sources?.map((id: any) => {
                                                                        if(watch('service') === id.service){
                                                                            return (
                                                                                <MenuItem value={id.id}>
                                                                                    {id.name}
                                                                                </MenuItem>
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                            />
                                                        )
                                                    }}
                                                />
                                            </div>
                                        </fieldset>
                                        :
                                        <div style={{display: 'none', width: '0px'}}/>
                                    }
                                    <fieldset>
                                        <label htmlFor="" style={{color: '#fff'}}>***</label>
                                        {sources?.map((id) => {
                                            if(watch('source') === id.id){
                                                if(id.name === "Outra fonte"){
                                                    return (
                                                        <div>
                                                            <Controller 
                                                                name="source_name"
                                                                defaultValue=''
                                                                control={control}    
                                                                render={({field: { onChange, onBlur, value }}) => {
                                                                    return (
                                                                        <CustomInput
                                                                            id='source_name'
                                                                            label='Nome da fonte'
                                                                            onChange={onChange}
                                                                            onBlur={onBlur}
                                                                            value={value}
                                                                            type='text'
                                                                            width={372}
                                                                        />
                                                                    )
                                                                }}
                                                            />
                                                        </div>
                                                    )
                                                } else {
                                                    return <div style={{display: 'none', width: '0px'}}/>
                                                }
                                            }
                                        })}
                                    </fieldset>
                                </div>
                                <div>
                                    {services?.map((id: any) => {
                                        if(watch('service') === id.id){
                                            if(id.name === 'Água'){
                                                return (
                                                    <>
                                                        <S.RadioFieldset>
                                                            <fieldset>
                                                                <label>
                                                                    O imóvel possui hidrômetro (relógio)?
                                                                    <div>
                                                                        <CustomTolltip
                                                                            title={<img src={blueAlert} alt="" />}
                                                                            desciption="Texto em falta"
                                                                        />
                                                                    </div>
                                                                </label>
                                                            </fieldset>
                                                            <fieldset>
                                                                <div>
                                                                    <input 
                                                                        {...register('have_hydrometer')}
                                                                        type="radio" 
                                                                        name="have_hydrometer" 
                                                                        id="have_hydrometer_yes"
                                                                        value="Yes"
                                                                    />
                                                                    <label htmlFor="Yes">Sim</label>
                                                                </div>
                                                                <div>
                                                                    <input 
                                                                        {...register('have_hydrometer')}
                                                                        type="radio" 
                                                                        name="have_hydrometer" 
                                                                        id="have_hydrometer_no"
                                                                        value="No"
                                                                    />
                                                                    <label htmlFor="No">Não</label>
                                                                </div>
                                                                <div>
                                                                    <input 
                                                                        defaultChecked={true}
                                                                        {...register('have_hydrometer')}
                                                                        type="radio" 
                                                                        name="have_hydrometer" 
                                                                        id="have_hydrometer_notKnow"
                                                                        value="NotKnow"
                                                                    />
                                                                    <label htmlFor="" style={{width: '103px'}}>Não sei dizer</label>
                                                                </div>
                                                            </fieldset>
                                                        </S.RadioFieldset>
                                                        <S.RadioFieldset>
                                                            <fieldset>
                                                                <label style={{width: '335px'}}>
                                                                    Você também faz uso de um reservatório, cisterna ou caixa d'água para armazenamento?
                                                                </label>
                                                            </fieldset>
                                                            <fieldset>
                                                                <div>
                                                                    <input 
                                                                        {...register('have_reservoir')}
                                                                        type="radio" 
                                                                        name="have_reservoir" 
                                                                        id="have_reservoir_yes"
                                                                        value="Yes"
                                                                    />
                                                                    <label htmlFor="Yes">Sim</label>
                                                                </div>
                                                                <div>
                                                                    <input 
                                                                        {...register('have_reservoir')}
                                                                        type="radio" 
                                                                        name="have_reservoir" 
                                                                        id="have_reservoir_no"
                                                                        value="No"
                                                                    />
                                                                    <label htmlFor="No">Não</label>
                                                                </div>
                                                                <div>
                                                                    <input 
                                                                        defaultChecked={true}
                                                                        {...register('have_reservoir')}
                                                                        type="radio" 
                                                                        name="have_reservoir" 
                                                                        id="have_reservoir_notKnow"
                                                                        value="NotKnow"
                                                                    />
                                                                    <label htmlFor="" style={{width: '103px'}}>Não sei dizer</label>
                                                                </div>
                                                            </fieldset>
                                                        </S.RadioFieldset>

                                                    </>
                                                )
                                            } else if (id.name === 'Energia'){
                                                return (
                                                    <S.RadioFieldset>
                                                        <fieldset>
                                                            <label>
                                                                O imóvel possui medidor de energia elétrica?
                                                                <div>
                                                                    <CustomTolltip
                                                                        title={<img src={blueAlert} alt="" />}
                                                                        desciption="Texto em falta"
                                                                    />
                                                                </div>
                                                            </label>
                                                            <img src="" alt="" />
                                                        </fieldset>
                                                        <fieldset>
                                                            <div>
                                                                <input 
                                                                    {...register('have_energy_meter')}
                                                                    type="radio" 
                                                                    name="have_energy_meter" 
                                                                    id="have_energy_meter_yes"
                                                                    value="Yes"
                                                                />
                                                                <label htmlFor="Yes">Sim</label>
                                                            </div>
                                                            <div>
                                                                <input 
                                                                    {...register('have_energy_meter')}
                                                                    type="radio" 
                                                                    name="have_energy_meter" 
                                                                    id="have_energy_meter_no"
                                                                    value="No"
                                                                />
                                                                <label htmlFor="No">Não</label>
                                                            </div>
                                                            <div>
                                                                <input
                                                                    defaultChecked={true} 
                                                                    {...register('have_energy_meter')}
                                                                    type="radio" 
                                                                    name="have_energy_meter" 
                                                                    id="have_energy_meter_notKnow"
                                                                    value="NotKnow"
                                                                />
                                                                <label htmlFor="">Não sei dizer</label>
                                                            </div>
                                                        </fieldset>
                                                    </S.RadioFieldset>
                                                )
                                            }
                                        }
                                    })}
                                </div>
                            </S.FieldsetTop>
                        </S.FormTop>
                        <S.FieldMid>
                            <fieldset>
                                <label htmlFor="">Data e hora da ocorrencia:</label>
                                <div>
                                    <Controller 
                                        name="date"
                                        control={control}
                                        render={({ field: { onChange, onBlur, value }}) => {
                                            return (
                                                <CustomInputData 
                                                    label='Data e hora'
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    value={value}
                                                    max={new Date().toISOString().slice(0, -8)}
                                                    type="datetime-local"
                                                    width="372px"
                                                    id='date_time'
                                                />
                                            )
                                        }}
                                    />
                                    {errors.date && (
                                        <span>Preencha o campo data.</span>
                                    )}
                                </div>
                            </fieldset>
                            <fieldset>
                                <div>
                                    <label htmlFor="">A ocorrência é em uma localização especial?</label>
                                </div>
                                <p>
                                    Se enquadram em localizações especiais: favelas, comunidades, ocupações, quilombos, aldeias, assentamento e etc."
                                </p>
                                <fieldset>
                                    <input 
                                        {...register('special_place')}
                                        type="radio" 
                                        id="special_place_yes" 
                                        value="Yes"
                                    />
                                    <label htmlFor="yes">Sim</label>
                                    <input 
                                        {...register('special_place')}
                                        type="radio" 
                                        id="special_place_no" 
                                        value="No"
                                    />
                                    <label htmlFor="no">Não</label>
                                    <input
                                        {...register('special_place')}
                                        defaultChecked={true}
                                        type="radio" 
                                        id="special_place_unknow" 
                                        value="NotKnow"
                                    />
                                    <label htmlFor="unknow">Não sei</label>
                                </fieldset>
                            </fieldset>
                            {watch('special_place') === 'Yes' && (
                                <fieldset>
                                    <label htmlFor="" style={{ marginBottom: '15px !important'}}>
                                        Qual é o tipo de localização especial
                                    </label>
                                    <div>
                                        <Controller 
                                            name='type_place'
                                            control={control}
                                            render={({field: { onChange, onBlur, value }}) => {
                                                return (
                                                    <CustomSelect
                                                        id="type_place"
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        value={value}
                                                        label='Localização especial'
                                                        labelDefault='Localização especial'
                                                        width={372}
                                                        list={AREA}
                                                    />
                                                )
                                            }}
                                        />
                                        {errors.type_place && (
                                            <p>{errors.type_place.message}</p>
                                        )}
                                    </div>
                                </fieldset>
                            )}
                        </S.FieldMid>
                        <S.FormCenter>
                            <div>
                                <fieldset>
                                    <fieldset>
                                        <label htmlFor="">Endereço/Logradouro</label>
                                        <Controller 
                                            name="address"
                                            control={control}
                                            render={({ field: { onChange, onBlur, value }}) => {
                                                return (
                                                    <CustomInput 
                                                        label='Endereço/Logradouro'
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        type="text"
                                                        value={value}
                                                        width={372}
                                                        id='address'
                                                    />
                                                )
                                            }}
                                        />

                                        {errors.address && (
                                            <span>{errors.address.message}</span>
                                        )}
                                    </fieldset>
                                    <fieldset>
                                        <div>
                                            <label htmlFor="">Em que escala é a área afetada?</label>
                                            <CustomTolltip
                                                title={<img src={blueAlert} alt="" />}
                                                desciption="Se enquadram como localizações especiais lugares como comunidades de assentamento, favelas, quilombos, entre outros"
                                            />
                                        </div>
                                        <Controller 
                                            name='area'
                                            control={control}
                                            render={({field: { onChange, onBlur, value }}) => {
                                                return (
                                                    <CustomSelect
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        value={value}
                                                        label='Área afetada'
                                                        labelDefault='Área afetada'
                                                        width={372}
                                                        list={TYPE_LOCAL}
                                                        id='area'
                                                    />
                                                )
                                            }}
                                        />

                                        {errors.area && (
                                            <span>{errors.area.message}</span>
                                        )}
                                    </fieldset>
                                    {watch('area') === 'House' && (
                                        <fieldset>
                                            <label htmlFor="">Quantos moradores vivem no domicílio afetado?</label>
                                            <Controller 
                                                name='number_residents'
                                                control={control}
                                                render={({field: { onChange, onBlur, value }}) => {
                                                    return (
                                                        <CustomInput 
                                                            label='Número de moradores'
                                                            onBlur={onBlur}
                                                            onChange={onChange}
                                                            type="number"
                                                            value={value}
                                                            width={372}
                                                            id='number_residents'
                                                        />
                                                    )
                                                }}
                                            />

                                        {errors.number_residents && (
                                            <span>Verifique o numero digitado.</span>
                                        )}
                                        </fieldset>
                                    )}
                                </fieldset>
                                <fieldset>
                                    <img src={mapsDefault} alt="" />
                                </fieldset>
                                <S.FieldTextArea>
                                    <label htmlFor="">Alguma observação sobre a ocorrência?</label>
                                    <div>
                                        <Controller 
                                            name="description"
                                            control={control}
                                            render={({ field: { onChange, onBlur, value }}) => {
                                                return (
                                                    <CustomTextArea
                                                        onChange={onChange}
                                                        onBlur={onBlur}
                                                        value={value}
                                                        placeholder='Digite sua observação (Opcional)'
                                                        width='408px'
                                                        heigth='303px'
                                                        id="description"
                                                    />
                                                )
                                            }}
                                        />
                                    </div>
                                </S.FieldTextArea>
                            </div>
                        </S.FormCenter>
                        <S.FormBottom>
                            <label htmlFor="">
                                <p>
                                    Caso entrem outras queixas da sua região, você autoriza que as informações da sua reclamação sejam juntadas à elas e compartilhadas com as autoridades competentes para solicitar que o abastecimento da sua residência seja feito pelas agências competentes.
                                </p>
                                <CustomTolltip
                                    title={<img src={blueAlert} alt="" />}
                                    desciption="Texto em falta"
                                />
                            </label>
                            <fieldset>
                                <input 
                                    {...register('agree_share')}
                                    type="radio" 
                                    name="agree_share" 
                                    id="agree_share_yes"
                                    value="Yes"
                                />
                                <label htmlFor="Yes">Sim</label>
                                <input 
                                    defaultChecked={true}
                                    {...register('agree_share')}
                                    type="radio" 
                                    name="agree_share" 
                                    id="agree_share_no"
                                    value="No"
                                />
                                <label htmlFor="No">Não</label>
                            </fieldset>
                        </S.FormBottom>
                        <S.ContainerBtn>
                            <S.CancelBtn 
                                type='button' 
                                id='cancel'
                                onClick={() => {
                                    setCloseOccurrence(!closeOccurrence)
                                }}
                            >
                                Cancelar
                            </S.CancelBtn>
                            <S.SubmitButton 
                                type='submit'
                                id='submit'
                                disabled={isValid === true && isDirty === true ? false : true}
                            >
                                {isLoading ? 'Cadastrando...' : 'Registrar ocorrência'}
                            </S.SubmitButton>
                        </S.ContainerBtn>
                    </form>
                </S.Container>
            </PersonalModal>
            <ModalMsg
                height='477px'
                modalBackground={false} 
                mensage='A ocorrência foi registrada com sucesso!'
                onClose={() => {
                    setOpen(!open)
                    onHide()
                }}
                open={open}
                status="success"
                width={496}
                occurence={true}
                finishOccurence={() => {
                    putOccurence(idOccurrence, {
                        "finished_status": "Yes",
                        "status": 'Approved'
                    })
                    setOpen(!open)
                    onHide()
                }}
            />
            <ModalDelete
                buttonText="Sim, cancelar"
                mensage='Deseja mesmo cancelar o registro desta ocorrência?'
                onClose={() => {
                    setCloseOccurrence(!closeOccurrence)
                }}
                onDelete={() => {
                    setCloseOccurrence(!closeOccurrence)
                    onHide()
                }}
                open={closeOccurrence}
                width={469}
            />
        </>
    );
};

export default NewOccurence;