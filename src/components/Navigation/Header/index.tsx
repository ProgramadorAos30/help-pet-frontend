import * as React from 'react';
import * as S from './style';
import { logOut } from '../../../assets';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../stores';
import { TOKEN, USER } from '../../../stores/actions';

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state : RootState) => state.clickState);
    return (
        <S.Container>
            <div>
                <div>
                    <h1>{user.role}</h1>
                    <p>{user.name}</p>
                </div>
                <div>
                    <p>Sair</p>
                    <S.Link 
                        to="/singup"
                        onClick={() => {
                            dispatch({type: USER, user: {}})
                            dispatch({type: TOKEN, token: ''})
                        }}  
                    >
                        <img src={logOut} alt="" />
                    </S.Link>
                </div>
            </div>
        </S.Container>
    )
}

export default Header;