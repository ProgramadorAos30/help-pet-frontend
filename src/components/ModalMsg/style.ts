import styled from "styled-components";

export const Container = styled.div<{ height: string }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: ${props => props.height == '' ? '312px' : props.height};

    > img {
        width: 60px;
        height: 60px;
        margin-bottom: 24px;
    }

    > p {
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 34px;
        color: #2C3941;
        text-align: center;
        margin-bottom: 32px;
    }

    > button {
        border: none;
        border-radius: 8px;
        color: #FFF;
        background-color: #1773E2;
        display: flex;
        align-items: center;
        justify-content: center;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        width: 311px;
        height: 48px;
    }
`;

export const ContainerOccurence = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > hr {
        margin: 24px 0;
        width: 421px;
    }

    > p {
        margin-bottom: 24px;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        text-align: center;
        color: #000000;
    }

    > button {
        border: 1px solid #1773E2;
        border-radius: 8px;
        color: #1773E2;
        background: none;
        display: flex;
        align-items: center;
        justify-content: center;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        width: 311px;
        height: 48px;
    }

`;