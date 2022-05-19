import * as React from 'react';
import { useSelector } from 'react-redux';
import { CardService } from '../../components';
import { useService } from '../../services';
import { RootState } from '../../stores';

const Servicos: React.FC = () => {
    const { token } = useSelector((state : RootState) => state.clickState);
    const { data: services } = useService(token);
    console.log(services);
    

    return (
        <>
            <div>
                <button></button>
                <button></button>
            </div>
            <div>
                {services?.map((id: any) => {
                    return (
                        <CardService 
                            onClick={function () {
                                throw new Error('Function not implemented.');
                            } } 
                            serviceName={id.name} 
                            status={id.active} 
                            image={id.image}
                        />
                    )
                })}
            </div>
        </>
    )
}

export default Servicos;