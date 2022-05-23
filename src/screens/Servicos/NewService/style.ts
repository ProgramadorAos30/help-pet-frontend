import styled from "styled-components";

export const Container = styled.div`
    > h1 {
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        text-align: center;
        color: ${props => props.theme.colors.dark};
        margin-bottom: 32px;
    }
`;

export const Form = styled.form`

`;

export const Header = styled.div`
    width: 696px;
    height: 136px;
    display: flex;
    justify-content: space-between;

    > div:nth-child(2) {
        margin-left: 32px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
`;

export const Button = styled.button`
    width: 177px;
    height: 48px;
    background: ${props => props.theme.colors.white};
    border: 1px solid ${props => props.theme.colors.blue};
    color: ${props => props.theme.colors.blue};
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
`;

export const Fonts = styled.fieldset`
    width: 568px;
    margin: 32px 0 24px 0;
    > h1 {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #2C3941;
        margin-bottom: 24px;
    }

    > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export const Item = styled.p`
    
`;