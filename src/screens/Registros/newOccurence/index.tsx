import React, { useEffect, useState } from 'react';
import * as S from './style';
import {
    useService,
    api,
    useSources,
    useOccurrences
} from '../../../services';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores';
import {
    CustomInput,
    CustomInputData,
    CustomSelect,
    CustomTextArea,
    CustomTolltip,
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
import MenuItem from '@mui/material/MenuItem';

const NewOccurence: React.FC<IProps> = ({ onHide, isModal, itemEdit }) => {
    const { token } = useSelector((state: RootState) => state.clickState);
    const { data: services } = useService(token);
    const { data: sources } = useSources(token);
    const [ idOccurrence, setIdOccurrence ] = useState('');
    const [ open, setOpen ] = useState(false);

    const postOccurence = async (data: FormData) => {
        const { data: response } = await api.post('/occurrences', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    };

    const putOccurence = async(data: any) => {
        const { data: response } = await api.put(`/occurrences/${idOccurrence}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    }

    const {
        handleSubmit,
        formState: { errors, isDirty, isValid },
        control,
        watch,
        register,
        getValues,
        setValue,
        reset
    } = useForm<FormData>();

    const { mutate, isLoading } = useMutation(postOccurence, {
        onSuccess: (resp) => {
            setOpen(true)
            queryClient.invalidateQueries('occurence');
            console.log(resp, 'onSuccess')
        }
    });

    const onSubmit = (values: FormData) => {
        const obj = {
            "service": values.service,
            "source": values.source,
            "source_name": values.source_name,
            "date": values.date,
            "restoration_date": values.restoration_date,
            "address": values.address,
            "neighborhood": values.neighborhood,
            "city": values.city,
            "state": values.state,
            "country": values.country,
            "special_place": values.special_place,
            "have_energy_meter": values.have_energy_meter,
            "have_hydrometer": values.have_hydrometer,
            "have_reservoir": values.have_reservoir,
            "number_residents": values.number_residents,
            "type_place": values.type_place,
            "area": values.area,
            "description": values.description,
            "restoration_description": values.restoration_description,
            "agree_share": values.agree_share === "Yes" ? true : false,
            "latitude": values.latitude,
            "longitude": values.longitude,
            "status": values.status,
            "finished_status": values.finished_status
        }
        mutate(obj);
        console.log(values, 'valores');
    };

    useEffect(() => {
        if(!isModal){
            reset()
        }
    }, [isModal, reset]);

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
                        onClick={() => {
                            onHide()
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
                                                            width={372}
                                                            childrean={
                                                                services?.map((id: any) => {
                                                                    return (
                                                                        <MenuItem value={id.id}>
                                                                            {id.name}
                                                                        </MenuItem>
                                                                    )
                                                                })
                                                            }
                                                        />
                                                    )
                                                }}
                                            />
                                        </div>
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
                                                                width={372}
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
                                                                <p>
                                                                    O imóvel possui hidrômetro (relógio)?
                                                                    <CustomTolltip
                                                                        title={<img src={blueAlert} alt="" />}
                                                                        desciption="Texto em falta"
                                                                    />
                                                                </p>
                                                                <img src="" alt="" />
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
                                                                <p style={{width: '335px'}}>
                                                                    Você também faz uso de um reservatório, cisterna ou caixa d'água para armazenamento?
                                                                </p>
                                                                <img src="" alt="" />
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
                                                            <p>
                                                                O imóvel possui medidor de energia elétrica?
                                                                <CustomTolltip
                                                                    title={<img src={blueAlert} alt="" />}
                                                                    desciption="Texto em falta"
                                                                />
                                                            </p>
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
                                                    type="datetime-local"
                                                    value={value}
                                                    width="254px"
                                                    id='date_time'
                                                />
                                            )
                                        }}
                                    />
                                </div>
                            </fieldset>
                            <fieldset>
                                <div>
                                    <label htmlFor="">A ocorrência é em uma localização especial?</label>
                                    <CustomTolltip
                                        title={<img src={blueAlert} alt="" />}
                                        desciption="Se enquadram como localizações especiais lugares como comunidades de assentamento, favelas, quilombos, entre outros"
                                    />
                                </div>
                                <p>
                                    Se enquadram em localizações especiais: favelas, comunidades, ocupações, quilombos, aldeias, assentamento e etc."
                                </p>
                                <fieldset>
                                    <input 
                                        type="radio" 
                                        id="special_place_yes" 
                                        value="Yes"
                                        {...register('special_place')}
                                    />
                                    <label htmlFor="yes">Sim</label>
                                    <input 
                                        type="radio" 
                                        id="special_place_no" 
                                        value="No"
                                        {...register('special_place')}
                                    />
                                    <label htmlFor="no">Não</label>
                                    <input 
                                        type="radio" 
                                        id="special_place_unknow" 
                                        value="NotKnow"
                                        {...register('special_place')}
                                    />
                                    <label htmlFor="unknow">Não sei</label>
                                </fieldset>
                            </fieldset>
                            {watch('special_place') === 'Yes' && (
                                <fieldset>
                                    <div>
                                        <label htmlFor="">
                                            Qual é o tipo de localização especial
                                        </label>
                                    </div>
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
                                                        width={254}
                                                        id='date_time'
                                                    />
                                                )
                                            }}
                                        />
                                    </fieldset>
                                    <fieldset>
                                        <label htmlFor="">Em que escala é a área afetada?</label>
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
                                                    />
                                                )
                                            }}
                                        />
                                    </fieldset>

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
                                                        heigth='349px'
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
                            <button 
                                type='button' 
                                onClick={() => {
                                    onHide()
                                }}
                            >
                                Cancelar
                            </button>
                            <button type='submit'>
                                { 
                                    isLoading ? 'Cadastrando...' : 'Registrar ocorrência'
                                }
                            </button>
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
                    putOccurence({
                        "finished_status": "Yes"
                    })
                }}
            />
        </>
    );
};

export default NewOccurence;