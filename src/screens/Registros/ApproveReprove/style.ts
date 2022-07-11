import styled from "styled-components";

export const Container = styled.div`
    width:389px;
    height: 206px;
    text-align: center;

    > h1 {
        margin-bottom: 24px;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        text-align: center;
        color: ${props => props.theme.colors.dark};
    }

    > p {
        margin-bottom: 16px;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: ${props => props.theme.colors.dark};
    }
`;

export const ContainerBtn = styled.fieldset`
    margin-top: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    button {
        width: 177px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        font-weight: 600;
    }

    > button:nth-child(1) {
        background: none;
        border: 1px solid ${props => props.theme.colors.blue};
        color: ${props => props.theme.colors.blue};
    }

    > button:nth-child(2) {
        border: none;
        background: ${props => props.theme.colors.blue};
        color: ${props => props.theme.colors.white};
    }
`;