import React from 'react';
import * as S from './style';

interface IProps {
    onClick: () => any,
    serviceName: string,
    fonte?: number | string,
    status: boolean,
    image: string
}

const CardService: React.FC <IProps> = (props) => {
    return (
        <S.Container>
            <div>
                <img src={props.image} alt="" />
                <div>
                    <p>Serviço</p>
                    <h1>{props.serviceName}</h1>
                </div>
                <button>...</button>
            </div>
            <div>
                <div>
                    <p>Fontes</p>
                    <p>{props.fonte}</p>
                </div>
                <div>
                    <p>Status</p>
                    <p>{props.status == true ? 'Ativo' : 'Inativo'}</p>
                </div>
            </div>
        </S.Container>
    );
};

export default CardService;