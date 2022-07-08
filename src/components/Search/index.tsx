import React from 'react';
import * as S from './style'
import { search } from '../../assets/index';

interface IProps {
    onChange: (e: any) => void,
    width: string,
}

const Search: React.FC <IProps> = (props) => {

    return (
        <S.Input width={props.width}>
            <input 
                onChange={props.onChange} 
                type="input" 
                placeholder='Pesquisar'
                id="search"
                autoComplete='off'
            />
            <label htmlFor="search">
                <img src={search} alt="" />
            </label>
        </S.Input>
    );
};

export default Search;