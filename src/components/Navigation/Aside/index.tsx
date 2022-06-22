import * as React from 'react';
import * as S from './style';
import { 
    logo,
    logoPng,
    dashboard,
    configurations,
    mensage,
    notification,
    registers,
    services,
    users
} from '../../../assets';

const Aside: React.FC = () => {
    const link = [
        {to: '/', icon: dashboard, label: 'Dashboard'},
        {to:'/registros', icon: registers, label: 'Registros'},
        {to: '/usuarios', icon: users, label: 'Usuários'},
        {to:'/servicos', icon: services, label: 'Serviços'},
        {to: '/notificacoes', icon: notification, label: 'Notificações'},
        {to: '/mensagens', icon: mensage, label: 'Mensagens'},
        {to:'/configuracoes', icon: configurations, label: 'Configurações'}
    ];

    return (
        <S.Container>
            <S.logo>
                <img src={logoPng} alt="" />
            </S.logo>
            <S.Navigation>
                {link.map((id: any) => {
                    return (
                        <S.Link 
                            to={id.to}
                            id={id.label}
                        >
                            <img src={id.icon} alt="" />
                            {id.label}
                        </S.Link>
                    )
                })}
            </S.Navigation>

        </S.Container>
    )
}

export default Aside;