import styled from "styled-components";

export const Container = styled.div`
    overflow: hidden;

    > h1 {
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        text-align: center;
        margin-bottom: 32px;
    }
    
    > form {
        div {
            > fieldset {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                border: none;
                > div {
                    margin-bottom: 20px;
                }
            }
        }
    }
`;

export const ContainerBnt = styled.div`
    display: flex;
    justify-content: space-between;

    button { 
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 274px;
        height:48px;
        border-radius: 8px;
    }

    >button:nth-child(1){
        color: ${props => props.theme.colors.warning};
        border: 1px solid ${props => props.theme.colors.warning};
        background: transparent;
    }

    >button:nth-child(2){
        background: ${props => props.theme.colors.blue};        
        color: ${props => props.theme.colors.white};
        border: none;
    }
`;

export const Button = styled.button <{ disabled: boolean }>`
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 274px;
        height:48px;
        border-radius: 8px;
        color: ${props => props.disabled == false ? props.theme.colors.white : '#2C3941'};
        background: ${props => props.disabled == false ? props.theme.colors.blue : '#C7C7C7'};
        border: none;
`;