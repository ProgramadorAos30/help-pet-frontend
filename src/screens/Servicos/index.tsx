import React, { useState } from 'react';
import * as S from './style';
import { useSelector } from 'react-redux';
import { useService } from '../../services';
import { RootState } from '../../stores';
import { 
    CardService,
    PersonalModal
} from '../../components';

const Servicos: React.FC = () => {
    const { token } = useSelector((state : RootState) => state.clickState);
    const { data: services } = useService(token);
    const [ newService, setNewService ] = useState(false);

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
                            onClick={function () {
                                throw new Error('Function not implemented.');
                            } } 
                            serviceName={id.name} 
                            status={id.active} 
                            image={id.image}
                            backgrounColor={id.background_color}
                        />
                    )
                })}
            </S.Container>
            <PersonalModal 
                onClose={() => setNewService(!newService)}
                open={newService}
                width={861}
                children={<h1>asda</h1>}
            />
        </>
    )
}

export default Servicos;