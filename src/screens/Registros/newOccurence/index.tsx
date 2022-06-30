import React, { useEffect, useState } from 'react';
import * as S from './style';
import {
    useService,
    api,
    useSources
} from '../../../services';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores';
import {
    CustomInput,
    CustomSelect,
    CustomTextArea,
    CustomTolltip,
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
import { AREA } from '../../../constants/index';
import { useMutation } from 'react-query';
import { queryClient } from '../../../services/index';
import MenuItem from '@mui/material/MenuItem';

const NewOccurence: React.FC<IProps> = ({ onHide, isModal, itemEdit }) => {
    const { token } = useSelector((state: RootState) => state.clickState);
    const { data: services } = useService(token);
    const { data: sources } = useSources(token);

    const postOccurence = async (data: FormData) => {
        const { data: response } = await api.post('/occurrences', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    };

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
        onSuccess: () => {
            queryClient.invalidateQueries('occurence');
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
            "type_place": values.type_place,
            "area": values.area,
            "description": values.description,
            "restoration_description": values.restoration_description,
            "agree_share": values.agree_share,
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
                            <label htmlFor="">Qual serviço esta indisponível?</label>
                            <fieldset>
                                <div>
                                    <Controller 
                                        name='service'
                                        control={control}
                                        render={({field: { onChange, onBlur, value }}) => {
                                            return (
                                                <CustomSelect
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
                                {watch('service') !== undefined ? 
                                    <div>
                                        <Controller 
                                            name="source"
                                            control={control}
                                            render={({field: { onChange, onBlur, value }}) => {
                                                return (
                                                    <CustomSelect
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
                                    :
                                    <div style={{display: 'none', width: '0px'}}/>
                                }
                                <div>
                                    {sources?.map((id) => {
                                        if(watch('source') === id.id){
                                            if(id.name === "Outra fonte"){
                                                return (
                                                    <Controller 
                                                        name="source_name"
                                                        control={control}    
                                                        render={({field: { onChange, onBlur, value }}) => {
                                                            return (
                                                                <CustomInput
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
                                                )
                                            } else {
                                                return <div style={{display: 'none', width: '0px'}}/>
                                            }
                                        }
                                    })}
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
                                                                    <label htmlFor="">Não sei dizer</label>
                                                                </div>
                                                            </fieldset>
                                                        </S.RadioFieldset>
                                                        <S.RadioFieldset>
                                                            <fieldset>
                                                                <p>
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
                                                                    <label htmlFor="">Não sei dizer</label>
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
                                <fieldset>
                                    <fieldset>
                                        <label htmlFor="">Data e hora da ocorrencia:</label>
                                        <Controller 
                                            name="date"
                                            control={control}
                                            render={({ field: { onChange, onBlur, value }}) => {
                                                return (
                                                    <CustomInput 
                                                        label='Data e hora'
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        type="datetime-local"
                                                        value={value}
                                                        width={254}
                                                        id='date_time'
                                                    />
                                                )
                                            }}
                                        />
                                    </fieldset>
                                    <fieldset>
                                        <div>
                                            <label htmlFor="">A ocorrência é em uma localização especial?</label>
                                            <CustomTolltip
                                                title={<img src={blueAlert} alt="" />}
                                                desciption="Se enquadram como localizações especiais lugares como comunidades de assentamento, favelas, quilombos, entre outros"
                                            />
                                        </div>
                                        <div>
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
                                        </div>
                                    </fieldset>
                                </fieldset>
                            </fieldset>
                        </S.FieldsetTop>
                    </S.FormTop>
                    <S.FormCenter>
                        
                        {/* <div>
                            <label htmlFor="">Endereço/Logradouro</label>
                            <CustomInput
                                label='Digite o endereço ou logradouro'
                                onChange={function (e: any) {
                                    throw new Error('Function not implemented.');
                                }}
                                onBlur={function (e: any) {
                                    throw new Error('Function not implemented.');
                                }}
                                type='text'
                                value={undefined}
                                width={372}
                            />
                            <div>
                                <label htmlFor="">Em que escala é a área afetada?</label>
                                <CustomTolltip
                                    title={<img src={blueAlert} alt="" />}
                                    desciption="Se enquadram como localizações especiais lugares como comunidades de assentamento, favelas, quilombos, entre outros"
                                />
                            </div>
                            <CustomSelect
                                onChange={function (e: any) {
                                    throw new Error('Function not implemented.');
                                }}
                                label='Selecione a área afetada'
                                labelDefault='Selecione a área afetada'
                                list={AREA}
                                value=''
                                width={372}
                            />
                        </div> */}
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
                                                list={AREA}
                                            />
                                        )
                                    }}
                                />
                            </fieldset>

                        </fieldset>
                        <div>
                            <img src={mapsDefault} alt="" />
                        </div>
                        <fieldset>
                            <label htmlFor="">Alguma observação sobre a ocorrência?</label>
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
                                            heigth='340px'
                                            id="description"
                                        />
                                    )
                                }}
                            />
                        </fieldset>
                    </S.FormCenter>
                    <S.FormBottom>
                        <label htmlFor="">
                            Caso entrem outras queixas da sua região, você autoriza que as informações da sua reclamação sejam juntadas à elas e compartilhadas com as autoridades competentes para solicitar que o abastecimento da sua residência seja feito pelas agências competentes.
                        </label>
                        <fieldset>
                            <div>
                                <input 
                                    //{...register('agree_share')}
                                    type="radio" 
                                    name="agree_share" 
                                    id="agree_share_yes"
                                    value="true"
                                />
                                <label htmlFor="Yes">Sim</label>
                            </div>
                            <div>
                                <input 
                                    //{...register('agree_share')}
                                    type="radio" 
                                    name="agree_share" 
                                    id="agree_share_no"
                                    value="No"
                                />
                                <label htmlFor="No">Não</label>
                            </div>
                            <div>
                                <input 
                                    //{...register('agree_share')}
                                    type="radio" 
                                    name="agree_share" 
                                    id="agree_share_notKnow"
                                    value="NotKnow"
                                />
                                <label htmlFor="">Não sei dizer</label>
                            </div>
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
    );
};

export default NewOccurence;