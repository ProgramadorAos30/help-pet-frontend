import styled from "styled-components";

export const Container = styled.div`
    background: ${props => props.theme.colors.white};
    border: 1px solid ${props => props.theme.colors.lightGray};
    border-radius: 8px;
    padding: 8px 16px;
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;

    > label {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: ${props => props.theme.colors.lightGray};
    }
    
    > input {
        max-height: 100%;
        border: none;
        margin-left: 5px;
    }

    >input:focus, input:focus{
        outline: none;
    }
`;