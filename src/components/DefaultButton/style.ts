import styled from "styled-components";

export const Container = styled.button`
    background: none;
    border-radius: 20px;
    transition: 0.3s ease all;
    background: ${props => props.theme.colors.darkBlue};
    color: ${props => props.theme.colors.white};
    border-radius: 8px;
    width: 224px;
    height: 44px;
    border: none;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    justify-content: center;
    align-items: center;
    
`;