import React, { useState } from 'react';
import * as S from './style';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { 
    logOut,
    orangeAlert
} from '../../../assets';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../stores';
import { TOKEN, USER } from '../../../stores/actions';

const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 469,
    bgcolor: 'background.paper',
    border: 'none',
    p: 4,
    borderRadius: '8px'
};

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state : RootState) => state.clickState);
    const [ open, setOpen ] = useState(false);
    return (
        <>
            <S.Container>
                <div>
                    <div>
                        <h1>{user.role}</h1>
                        <p>{user.name}</p>
                    </div>
                    <div>
                        <p>Sair</p>
                        <S.Link 
                            //to="/singup"
                            onClick={() => {
                                setOpen(!open)
                            }}  
                        >
                            <img src={logOut} alt="" />
                        </S.Link>
                    </div>
                </div>
            </S.Container>
            <Modal
                open={open}
                onClose={() => setOpen(!open)}
            >
                <Box sx={style}>
                    <S.ModalContainer>
                        <img src={orangeAlert} alt="" />
                        <h1>Deseja mesmo sair da conta?</h1>
                        <div>
                            <button
                                onClick={() => {
                                    setOpen(false)
                                }}
                            >
                                Não, voltar
                            </button>
                            <S.LogOut
                                to="/singup"
                                onClick={() => {
                                    dispatch({type: USER, user: {}})
                                    dispatch({type: TOKEN, token: ''})
                                    setOpen(false)
                                }}                        
                            >
                                Sim, sair
                            </S.LogOut>
                        </div>
                    </S.ModalContainer>
                </Box>
            </Modal>
        </>
    )
}

export default Header;