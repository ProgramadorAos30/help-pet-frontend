import React from 'react';
import styled from 'styled-components';
import { search } from '../../assets/index';

interface IProps {
    onChange: (e: any) => any,
    width: string
}

const Search: React.FC <IProps> = (props) => {
    const Input = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: ${props.width};
        height: 56px;
        border-radius: 6px;
        background-color: ${props => props.theme.colors.white};
        border: 1px solid ${props => props.theme.colors.lightGray};
        padding: 14px 16px;

        > input {
            width: 100%;
            border: 0 !important;
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 19px;
            color: #2C3941;
        }

        > label {
            width: 28px;
            height: 28px;
        }
    `;

    return (
        <Input>
            <input type="search" placeholder='Pesquisar'onChange={props.onChange} id="search"/>
            <label htmlFor="search">
                <img src={search} alt="" />
            </label>
        </Input>
    );
};

export default Search;