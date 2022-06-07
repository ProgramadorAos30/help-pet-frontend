import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    padding: 40px 64px 32px;
    position: relative;

    > h1 {
        text-align: center;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 34px;
        color: ${props => props.theme.colors.dark};
        margin-bottom: 24px;
    }

    > p {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 25px;
        color: ${props => props.theme.colors.dark};
        text-align: center;
        margin-bottom: 32px;
    }

    > form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        > fieldset {
            display: flex;
            flex-direction: column;
            > span {
                color: red;
                font-size: 14px;
            }
        }

        > div {
            width: 400px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 24px;
            
            > p {
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 20px;
                color: #2C3941;
            }

            > button {
                border: none;
                background: none;
                font-family: 'Inter';
                font-style: normal;
                font-weight: 600;
                font-size: 14px;
                line-height: 17px;
                text-decoration-line: underline;
                color: #1773E2;
            }
        }

    }
`;

export const ButtonBack = styled.button`
    position: absolute;
    left: 32px;
    border-radius: 100%;
    background: none;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    width: 32px;
    height: 32px;
    border: 1px solid ${props => props.theme.colors.lightGray};
    display: flex;
    align-items: center;
    justify-content: center;

    > img {
        transform: rotate(90deg);
    }
`;

export const ButtonSend = styled.button <{ disabled: boolean }>`
    width: 372px;
    height: 48px;
    border: none;
    margin-top: 32px;
    color: ${props => props.disabled == false ? props.theme.colors.white : '#2C3941'};
    background: ${props => props.disabled == false ? props.theme.colors.gradient : '#C7C7C7'};
    border-radius: 8px;
`;

export const ReciveCode = styled.button`
    width: 100%;
    height: 70px;
    border: none;
    border-radius: 0px 0px 16px 16px;
    background: #F8F8F8;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const InputCode = styled.div`

    --ReactInputVerificationCode-itemWidth: 54px;
    --ReactInputVerificationCode-itemHeight: 54px;
    .ReactInputVerificationCode__item{
        border: none !important;
        color: ${props => props.theme.colors.dark};
        background: #F8F8F8;
    }
`;