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
import { blueAlert } from '../../../assets';
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
        const { data: response } = await api.post('/occurrences', data);
        return response.data;
    };

    const {
        handleSubmit,
        formState: { errors, isDirty, isValid },
        control,
        watch,
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
        //mutate(obj);
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <S.FormTop>
                        <S.FieldsetTopLeft>
                            <label htmlFor="">Qual serviço esta indisponível?</label>
                            <div>
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
                                    <div style={{display: 'none'}}/>
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
                                                return <div style={{display: 'none'}}/>
                                            }
                                        }
                                    })}
                                </div>
                                <div>
                                    {services?.map((id: any) => {
                                        if(watch('service') === id.id){
                                            if(id.name === 'Água'){
                                                return (
                                                    <Controller 
                                                        name="have_hydrometer"
                                                        control={control}
                                                        render={({ field: { onChange, onBlur, value }}) => {
                                                            return (
                                                                <div>
                                                                    <div>
                                                                        <label htmlFor="">
                                                                            O imóvel possui hidrômetro (relógio)?
                                                                        </label>
                                                                        <img src="" alt="" />
                                                                    </div>
                                                                    <div>
                                                                        <div>
                                                                            <input 
                                                                                type="radio" 
                                                                                name="have_hydrometer" 
                                                                                id="have_hydrometer_yes"
                                                                                value="Yes"
                                                                            />
                                                                            <label htmlFor="Yes">Sim</label>
                                                                        </div>
                                                                        <div>
                                                                            <input 
                                                                                type="radio" 
                                                                                name="have_hydrometer" 
                                                                                id="have_hydrometer_no"
                                                                                value="No"
                                                                            />
                                                                            <label htmlFor="No">Não</label>
                                                                        </div>
                                                                        <div>
                                                                            <input 
                                                                                type="radio" 
                                                                                name="have_hydrometer" 
                                                                                id="have_hydrometer_notKnow"
                                                                                value="NotKnow"
                                                                            />
                                                                            <label htmlFor="">Não sei dizer</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }}
                                                    />
                                                )
                                            } else if (id.name === 'Energia'){
                                                return (
                                                    <>
                                                    </>
                                                )
                                            }
                                        }
                                    })}
                                </div>
                            </div>
                        </S.FieldsetTopLeft>
                        <S.FieldsetTopCenter>

                        </S.FieldsetTopCenter>
                        <S.FieldsetTopRight>
                            <div>
                                <label htmlFor="">A ocorrência é em uma localização especial?</label>
                                <CustomTolltip
                                    title={<img src={blueAlert} alt="" />}
                                    desciption="Se enquadram como localizações especiais lugares como comunidades de assentamento, favelas, quilombos, entre outros"
                                />
                            </div>
                            <div>
                                <input type="radio" name='especial' id="yes" />
                                <label htmlFor="yes">Sim</label>
                                <input type="radio" name='especial' id="no" />
                                <label htmlFor="no">Não</label>
                                <input type="radio" name='especial' id="unknow" />
                                <label htmlFor="unknow">Não sei</label>
                            </div>
                        </S.FieldsetTopRight>
                    </S.FormTop>
                    <S.FormCenter>
                        <div>
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
                        </div>
                        <div>
                            mapa
                        </div>
                    </S.FormCenter>
                    <S.FormBottom>
                        <label htmlFor="">Alguma observação sobre a ocorrência?</label>
                        <CustomTextArea
                            onChange={function (e: any) {
                                throw new Error('Function not implemented.');
                            }}
                            onBlur={function (e: any) {
                                throw new Error('Function not implemented.');
                            }}
                            value={undefined}
                            placeholder='Digite sua observação (Opcional)'
                            width='1508px'
                            heigth='85px'
                        />
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