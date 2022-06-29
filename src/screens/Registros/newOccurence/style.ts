import styled from "styled-components";

export const Container = styled.div`
    background-color: #FFF;
    overflow: scroll;
    > h1 {
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 34px;
        text-align: center;
        color: ${props => props.theme.colors.dark};
        margin-bottom: 48px;
    }

`;

export const FormTop = styled.div`
    width: 1508px;
    display: flex;
    justify-content: space-between;
`;

export const FieldsetTopLeft = styled.fieldset`
    width: 592px;

    > label {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: ${props => props.theme.colors.dark};
    }

    > div { 
        display: flex;
        flex-wrap: wrap;
        > div {
            margin-top: 24px;
            margin-right: 15px;
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
    height: 239px;
    margin-top: 40px;
    display: flex;
    justify-content: space-between;

    > div:nth-child(1) {
        display: flex;
        flex-direction: column;
        width: 372px;

        > label {
            margin-bottom: 24px;
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 19px;
            color: ${props => props.theme.colors.dark};
        }

        > div:nth-child(3){
            display: flex;
            align-items: center;
            margin-top: 41px;
            margin-bottom: 22px;

            > img {
                margin-left: 15px;
            }

            > label {
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 19px;
            color: ${props => props.theme.colors.dark};
        }
        }
    }

    > div:nth-child(2) {
        border: 1px solid blue;
        width: 1096px;
        height: 239px;
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