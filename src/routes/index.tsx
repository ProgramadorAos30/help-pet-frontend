import * as React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route  } from 'react-router-dom'
import { 
    Dashboard, 
    Configuracoes,
    Mensagens,
    Notificacoes,
    Registros,
    Servicos,
    Usuarios,
    Login
 } from '../screens/index';
import { RootState } from '../stores';

const AuthRoutes: React.FC = () => {
    const { token } = useSelector((state : RootState) => state.clickState)

    const routes = [
        { id: 1, path: '/', component: <Dashboard />},
        { id: 2, path: '/configuracoes', component: <Configuracoes />},
        { id: 3, path: '/mensagens', component: <Mensagens />},
        { id: 4, path: '/notificacoes', component: <Notificacoes />},
        { id: 5, path: '/registros', component: <Registros />},
        { id: 6, path: '/servicos', component: <Servicos />},
        { id: 7, path: '/usuarios', component: <Usuarios />},
    ];

    return (
        <Routes>
            {routes.map((id: any, index: number) => {
                return (
                    <>
                        {token === '' ?
                            <Route path='/singup' element={<Login />} />
                            :
                            <Route path={id.path} element={id.component} key={index}/>
                        }
                    </>
                )
            })}

        </Routes>
    )
}

export default AuthRoutes;