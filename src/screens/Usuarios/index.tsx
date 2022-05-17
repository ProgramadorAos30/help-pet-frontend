import React, { useState } from 'react';
import * as S from './style';
import { DefaultButton, DoubleButton, PersonalModal } from '../../components';
import NewUser from './NewUser';
import { useUsers } from '../../services';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores';

const Usuarios: React.FC = () => {
    const { token } = useSelector((state : RootState) => state.clickState);
    const { data: users } = useUsers(token);
    const [ open, setOpen ] = useState(false);
    const [ app, setApp ] = useState(true);
    const [ panel, setPanel ] = useState(false);

    return (
        <>
        <S.Nav>
            <div>
                <DoubleButton
                    text='Usuários do aplicativo'
                    selected={app}
                    onSelect={() => {
                        setApp(true)
                        setPanel(false)
                    }}
                />
                <DoubleButton
                    text='Usuários do painel'
                    selected={panel}
                    onSelect={() => {
                        setApp(false)
                        setPanel(true)
                    }}
                />
            </div>
            {panel == true && (
                <DefaultButton 
                    onSelect={() => setOpen(!open)}
                    text="Cadastrar moderador"
                />
            )}
        </S.Nav>
            <>
                {app == true && (
                    <div>
                        <h1>App</h1>
                    </div>
                )}

                {panel == true && (
                    <>
                        <h1>Painel</h1>
                        <PersonalModal 
                            open={open}
                            onClose={() => setOpen(!open)}
                            children={<NewUser />}
                        />
                    </>
                )}
            </>
        </>
    )
}

export default Usuarios;