import React from 'react';
import * as S from './style';
import { 
    useService, 
    api 
} from '../../../services';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores';
import { 
    CustomInput, 
    CustomSelect, 
    CustomTextArea,
    CustomTolltip 
} from '../../../components';
import { blueAlert } from '../../../assets';
import { 
    useForm, 
    SubmitHandler, 
    Controller 
} from "react-hook-form";
import { useMutation } from 'react-query';
import { queryClient } from '../../../services/index';
import { IProps } from './types';

const NewOccurence: React.FC = () => {
    const { token } = useSelector((state : RootState) => state.clickState);
    const { data: services } = useService(token);

    const postOccurence = async (data: IProps) => {
        const { data: response } = await api.post('/occurrences', data);
        return response.data;
    };

    const { 
        handleSubmit,
        formState: { errors },
        control,
        watch
    } = useForm<IProps>();

    const { mutate, isLoading } = useMutation(postOccurence, {
        onSuccess: () => {
          queryClient.invalidateQueries('occurence');
        }
    });

    const onSubmit = (values: IProps) => {
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

    const area = [
        { label: 'Favela', value: 'Shantytown' },
        { label: 'Comunidade', value: 'Community' },
        { label: 'Ocupação', value: 'Occupation' },
        { label: 'Quiombo', value: 'Quilombo' },
        { label: 'Vila', value: 'Village' },
        { label: 'Povoado', value: 'Settlement' }
    ];
    
    return (
        <S.Container>
            <h1>Registrar ocorrência</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <S.FormTop>
                    <S.FieldsetTopLeft>
                        <label htmlFor="">Qual serviço esta indisponível?</label>
                        <div>
                            <div>
                                <Controller 
                                    control={control}
                                    name="service"
                                    render={({field: { onChange, onBlur, value }}) => (
                                        <input 
                                            type="radio" 
                                            name='service' 
                                            id='energi'
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                        />
                                    )}
                                />
                                <label htmlFor="energi">Energia</label>
                            </div>
                            <div>
                                <input 
                                    type="radio" 
                                    name='service' 
                                    id='whater'
                                />
                                <label htmlFor="whater">Água</label>
                            </div>
                            <CustomSelect 
                                onChange={function (e: any) {
                                    throw new Error('Function not implemented.');
                                } } 
                                label='Fonte do serviço'
                                list={services} 
                                value=''                            
                                labelDefault='Fonte do serviço'
                                width={372}
                            />
                        </div>
                    </S.FieldsetTopLeft>
                    <S.FieldsetTopCenter>
                        <label htmlFor="">Data e hora da ocorrência:</label>
                        <div>
                            <CustomInput 
                                label='Data' 
                                onChange={function (e: any) {
                                    throw new Error('Function not implemented.');
                                } } 
                                onBlur={function (e: any) {
                                    throw new Error('Function not implemented.');
                                } } 
                                type='date' 
                                value={undefined} 
                                width={176}                        
                            />
                            <CustomInput 
                                label='Horário' 
                                onChange={function (e: any) {
                                    throw new Error('Function not implemented.');
                                } } 
                                onBlur={function (e: any) {
                                    throw new Error('Function not implemented.');
                                } } 
                                type='time' 
                                value={undefined} 
                                width={176}                        
                            />
                        </div>
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
                            <input type="radio" name='especial' id="yes"/>
                            <label htmlFor="yes">Sim</label>
                            <input type="radio" name='especial' id="no"/>
                            <label htmlFor="no">Não</label>
                            <input type="radio" name='especial' id="unknow"/>
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
                            } } 
                            onBlur={function (e: any) {
                                throw new Error('Function not implemented.');
                            } } 
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
                            } } 
                            label='Selecione a área afetada' 
                            labelDefault='Selecione a área afetada'
                            list={area} 
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
                        } } 
                        onBlur={function (e: any) {
                            throw new Error('Function not implemented.');
                        } } 
                        value={undefined} 
                        placeholder='Digite sua observação (Opcional)' 
                        width='1508px' 
                        heigth='85px'                  
                    />
                </S.FormBottom>
                <S.ContainerBtn>
                    <button type='button'>
                        Cancelar
                    </button>
                    <button type='submit'>
                        Registrar ocorrência
                    </button>
                </S.ContainerBtn>
            </form>
        </S.Container>
    );
};

export default NewOccurence;