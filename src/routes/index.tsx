import * as React from 'react';
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

const AuthRoutes: React.FC = () => {

    const routes = [
        { id: 1, path: '/singup', component: <Login /> },
        { id: 2, path: '/dashboard', component: <Dashboard />},
        { id: 3, path: '/configuracoes', component: <Configuracoes />},
        { id: 4, path: '/mensagens', component: <Mensagens />},
        { id: 5, path: '/notificacoes', component: <Notificacoes />},
        { id: 6, path: '/registros', component: <Registros />},
        { id: 7, path: '/servicos', component: <Servicos />},
        { id: 8, path: '/usuarios', component: <Usuarios />},
    ]

    return (
        <Routes>
            {routes.map((id: any, index: number) => {
                return (
                    <Route path={id.path} element={id.component} key={index}/>
                )
            })}

        </Routes>
    )
}

export default AuthRoutes;