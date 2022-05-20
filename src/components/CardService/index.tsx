import React from 'react';
import * as S from './style';
import {
    options
} from '../../assets/index'

interface IProps {
    onClick: () => any,
    serviceName: string,
    fonte?: number | string,
    status: boolean,
    image: string,
    backgrounColor: string
}

const CardService: React.FC <IProps> = (props) => {
    return (
        <S.Container>
            <S.Top background={props.backgrounColor}>
                <div>
                    <div>
                        <img src={props.image} alt="" />
                    </div>
                    <div>
                        <p>Serviço</p>
                        <h1>{props.serviceName}</h1>
                    </div>
                </div>
                <button
                    onClick={props.onClick}
                >   
                    <img src={options} alt="" />
                </button>
            </S.Top>
            <S.Bottom status={props.status}>
                <div>
                    <p>Fontes</p>
                    <p>{props.fonte}</p>
                </div>
                <div>
                    <p>Status</p>
                    <p>{props.status == true ? 'Ativo' : 'Inativo'}</p>
                </div>
            </S.Bottom>
        </S.Container>
    );
};

export default CardService;