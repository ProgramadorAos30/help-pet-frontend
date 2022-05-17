import React from 'react';
import styled from 'styled-components';
import { search } from '../../assets/index';

interface IProps {
    onChange: (e: any) => any
}

const Search: React.FC <IProps> = (props) => {
    const Input = styled.div``;
    return (
        <Input>
            <input type="search" placeholder='Pesquisar'onChange={props.onChange}/>
            <img src={search} alt="" />
        </Input>
    );
};

export default Search;