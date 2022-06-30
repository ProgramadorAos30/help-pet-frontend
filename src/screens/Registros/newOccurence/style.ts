import styled from "styled-components";

export const Container = styled.div`
    background-color: #FFF;
    overflow: scroll;
    height: 100vh;
    padding: 60px;
    position: relative;

    > h1 {
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 34px;
        text-align: center;
        color: ${props => props.theme.colors.dark};
        margin-bottom: 48px;
    }

    > button {
        background: none;
        border: none;
        position: absolute;
        right: 60px;
        top: 60px;
    }

`;

export const FormTop = styled.div`
    width: 1508px;
    display: flex;
    justify-content: space-between;
`;

export const FieldsetTop = styled.fieldset`
    width: 100%;

    > label {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: ${props => props.theme.colors.dark};
    }

    > fieldset { 
        display: flex;
        flex-wrap: wrap;

        > div {
            margin-top: 24px;
            margin-right: 15px;
        }
    }
`;

export const RadioFieldset = styled.fieldset`
    > fieldset:nth-child(1){
        display: flex;
        align-items: center;
        margin-bottom: 26px;
        > p {
            margin: 0 !important;
            font-weight: 700;
        }
    }

    > fieldset:nth-child(2){
        display: flex;

        > div {
            display: flex;
            align-items: center;
            margin-right: 24px;

            > label {
                margin-left: 6px;
            }
        }
    }
`;

export const FieldsetTopCenter = styled.fieldset`
    width: 372px;

    > label {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: ${props => props.theme.colors.dark};
    }

    > div {
        margin-top: 24px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
`;

export const FieldsetTopRight = styled.fieldset`
    width: 374px;

    > div:nth-child(1) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        > label {
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 19px;
            color: ${props => props.theme.colors.dark};
        }
    }

    > div:nth-child(2) {
        margin-top: 24px;
        display: flex;
        flex-direction: row;
        align-items: center;

        > input {
            margin-right: 15px;
        }

        > label {
            margin-right: 24px;
        }
    }
`;

export const FormCenter = styled.div`
    width: 100%;
    margin-top: 40px;
    display: flex;
    justify-content: space-between;

    > div:nth-child(1) {
        display: flex;
        flex-direction: column;

        > label {
            margin-bottom: 24px;
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 19px;
            color: ${props => props.theme.colors.dark};
        }
    }

    > div:nth-child(2) {
        
    }
`;

export const FormBottom = styled.fieldset`
    margin-top: 40px;

    > label {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: ${props => props.theme.colors.dark};
    }

    > textarea {
        margin-top: 24px;
    }
`;

export const ContainerBtn = styled.fieldset`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 48px;

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 274px;
        height: 48px;
        border-radius: 6px;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
    }

    > button:nth-child(1){
        background: none;
        border: 1px solid ${props => props.theme.colors.warning};
        color: ${props => props.theme.colors.warning};
    }

    > button:nth-child(2){
        background: ${props => props.theme.colors.blue};
        color: ${props => props.theme.colors.white};
    }
`;