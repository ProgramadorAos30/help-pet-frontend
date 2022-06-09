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
    const refSubmit = useRef<any>(null);
    const refCheckbok = useRef<any>(null);
    const refLabel = useRef<any>(null);

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

    console.log(watch('other_option'));
    
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
                    <S.Form>
                        <input 
                            {...register("other_option")}
                            type="checkbox" 
                            id="other_option"
                            name='other_option'
                            ref={refCheckbok}
                            style={{display: 'none'}}
                        />
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
                                            //@ts-ignore
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
                        <button 
                            type='submit'
                            ref={refSubmit}
                            style={{display: 'none'}}
                        />
                    </S.Form>

                    <form>
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
                    </form>
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
                        <input 
                            type="checkbox" 
                            ref={refLabel}
                            onClick={() => {
                                refCheckbok?.current?.click()
                            }}
                        />
                        <label>Incluir opção <b>outros</b></label>
                    </S.AnotherOptions>
                    <S.ContainerBtn>
                        <button type="button" onClick={onHide}>Cancelar</button>

                        <button 
                            type="button"
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