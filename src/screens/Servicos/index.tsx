import React, { useState } from 'react';
import * as S from './style';
import { useSelector } from 'react-redux';
import { useService } from '../../services';
import { RootState } from '../../stores';
import { 
    CardService,
    PersonalModal
} from '../../components';
import NewService from './NewService';
import ModalDelete from '../../components/ModalDelete';

const Servicos: React.FC = () => {
    const { token } = useSelector((state : RootState) => state.clickState);
    const { data: services } = useService(token);
    const [ newService, setNewService ] = useState(false);
    const [ showDelete, setShowDelete ] = useState(false);

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
                onDelete={() => {
                    
                }}
                open={showDelete}
                width={469}
            />
        </>
    )
}

export default Servicos;