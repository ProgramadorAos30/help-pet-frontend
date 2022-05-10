import * as React from 'react';
import * as S from './style';
import { logOut } from '../../../assets';

const Header: React.FC = () => {
    return (
        <S.Container>
            <div>
                <div>
                    <h1>Administrador</h1>
                    <p>Roberto Carlos</p>
                </div>
                <div>
                    <p>Sair</p>
                    <button>
                        <img src={logOut} alt="" />
                    </button>
                </div>
            </div>
        </S.Container>
    )
}

export default Header;