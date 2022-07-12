import React, { useEffect, useState } from 'react';
import * as S from './style';
import { useSelector } from 'react-redux';
import { api, queryClient, useService } from '../../services';
import { RootState } from '../../stores';
import { 
    CardService,
    ModalDelete,
    ModalMsg
} from '../../components';
import { useMutation } from 'react-query';
import Form from './Form';
import EditForm from './EditForm';

const Servicos: React.FC = () => {
    const { token } = useSelector((state : RootState) => state.clickState);
    const { data: services, refetch } = useService(token);
    const [ serviceTemp, setServiceTemp ] = useState<any>(null);
    const [ idService, setIdService ] = useState<string>('')
    const [ newService, setNewService ] = useState(false);
    const [ editService, setEditService ] = useState(false);
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

    console.log(serviceTemp, 'service temp')

    return (
        <>
            <S.Head>
                <h1>Serviços</h1>
                <div>
                    <button
                        id='new_service'
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
                            onEdit={() => {
                                setServiceTemp(id)
                                setIdService(id.id)
                                setEditService(!editService)
                            }}
                            key={id.id}
                            serviceName={id.name} 
                            status={id.active} 
                            image={id.image}
                            backgrounColor={id.background_color}
                        />
                    )
                })}
            </S.Container>
            
            <Form
                isModal={newService}
                onHide={() => {
                    setNewService(!newService)
                    refetch()
                }}
            />
            <EditForm 
                isModal={editService}
                itemEdit={serviceTemp}
                onHide={() => {
                    setEditService(!editService)
                    setServiceTemp(null)
                    refetch()
                }}
            />

            <ModalDelete 
                backgroundColor='false'
                mensage='Deseja mesmo excluir este serviço?'
                onClose={() => setShowDelete(false)}
                onDelete={() => {
                    mutate(idService)
                    refetch()
                }}
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
                    refetch()
                }}
                open={showSuccess}
                status=""
                width={469}
            />
        </>
    )
}

export default Servicos;