import React, { useState } from 'react';
import * as S from './style';
import { useSelector } from 'react-redux';
import { api, queryClient, useService } from '../../services';
import { RootState } from '../../stores';
import { 
    CardService,
    ModalDelete,
    ModalMsg
} from '../../components';
import NewService from './NewService';
import { useMutation } from 'react-query';

const Servicos: React.FC = () => {
    const { token } = useSelector((state : RootState) => state.clickState);
    const { data: services } = useService(token);
    const [ idService, setIdService ] = useState<string>('')
    const [ newService, setNewService ] = useState(false);
    const [ showDelete, setShowDelete ] = useState(false);
    const [ showSuccess, setShowSuccess ] = useState(false);

    const deleteService = async (id: string) => {
        const data = await api.delete(`/services/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return data
    };

    const { mutate, isLoading } = useMutation(deleteService, {
        onSuccess: () => {
          queryClient.invalidateQueries('services');
          setShowDelete(false)
          setShowSuccess(true)
        }
    });

    return (
        <>
            <S.Head>
                <h1>Serviços</h1>
                <div>
                    <button>
                        Adicionar fonte
                    </button>
                    <button
                        type='button'
                        onClick={() => {
                            setNewService(!newService)
                        }}
                    >
                        Cadastrar Serviço
                    </button>
                </div>
            </S.Head>
            <S.Container>
                {services?.map((id: any) => {
                    return (
                        <CardService
                            onClick={() => {
                            }} 
                            onDelete={() => {
                                setIdService(id.id)
                                setShowDelete(true)
                            }}
                            onEdit={() => {}}
                            serviceName={id.name} 
                            status={id.active} 
                            image={id.image}
                            backgrounColor={id.background_color}
                        />
                    )
                })}
            </S.Container>
            
            <NewService
                isModal={newService}
                onHide={() => setNewService(!newService)}
            />

            <ModalDelete 
                mensage='Deseja mesmo excluir este serviço?'
                onClose={() => setShowDelete(false)}
                onDelete={() => {mutate(idService)}}
                open={showDelete}
                width={469}
                buttonText={isLoading == false ? 'Sim, excluir' : 'Excluindo...' }
            />

            <ModalMsg 
                height='312px'
                modalBackground={false}
                mensage='O serviço foi excluido com sucesso!'
                onClose={() => {
                    setShowSuccess(false)
                    setShowDelete(false)
                }}
                open={showSuccess}
                status=""
                width={469}
            />
        </>
    )
}

export default Servicos;