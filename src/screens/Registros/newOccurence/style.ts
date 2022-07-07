import styled from "styled-components";

export const Container = styled.div`
    background-color: #FFF;
    overflow: scroll;
    height: 100vh;
    padding: 20px 40px 20px 40px;
    position: relative;

    > h1 {
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 34px;
        text-align: left;
        color: ${props => props.theme.colors.dark};
        margin-bottom: 32px;
    }

    > button {
        background: none;
        border: none;
        position: absolute;
        right: 60px;
        top: 40px;
    }

    span {
        color: red;
    }
`;

export const FormTop = styled.div`
    width: 1508px;
    display: flex;
    justify-content: space-between;
`;

export const FieldsetTop = styled.fieldset`
    width: 100%;
    display: flex;
    margin-bottom: 32px;

    > div {
        display: flex;
        
        > fieldset { 
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 91px;
            margin-right: 25px;
        
            > label {
                font-style: normal;
                font-weight: 600;
                font-size: 16px;
                line-height: 19px;
                color: ${props => props.theme.colors.dark};
            }
        }
    }
    
`;

export const FieldMid = styled.fieldset`
    display: flex;

    > fieldset {
        margin-right: 70px;
        height: 91px;
    }

    > fieldset:nth-child(1){
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        > label {
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 19px;
            color: ${props => props.theme.colors.dark};
        }
    }

    > fieldset:nth-child(2){
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 20px;
    
        > div {
            display: flex;
            flex-direction: row;
            align-items: center;

            > label {
                font-style: normal;
                font-weight: 600;
                font-size: 16px;
                line-height: 19px;
                color: ${props => props.theme.colors.dark};
                margin-right: 10px;
            }
        }

        > p {
            width: 879px;
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 15px;
            color: #2C3941;
            opacity: 0.6;
        }

        > fieldset {
            display: flex;
            align-items: center;

            > label {
                margin-right: 24px;
            }

            > input {
                margin-right: 8px;
            }
        }
    }

    > fieldset:nth-child(3){
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        > label {
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 19px;
            color: ${props => props.theme.colors.dark};
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

export const FormCenter = styled.fieldset`
    width: 100%;
    > div {
        margin-top: 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        > fieldset:nth-child(1) {
            margin-right: 60px;
            > fieldset {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                height: 91px;
                margin-bottom: 24px !important;
            }

            > fieldset:nth-child(2) {
                > div {
                    display: flex;
                    > label {
                        margin-right: 5px;
                    }
                }
            }
        }

        > fieldset:nth-child(2) {
            > img {
                height: 338px;
                object-fit: cover;
            }
        }
    }
`;

export const FieldTextArea = styled.fieldset`
    margin-left: 60px;
    > div {
        margin-top: 24px !important;
    }
`;

export const RadioFieldset = styled.fieldset`
    > fieldset:nth-child(1){
        width: 325px;
        display: flex;
        align-items: center;
        margin-bottom: 26px;
        margin-right: 10px;

        > label {
            display: flex;
            align-items: center;
            margin: 0 !important;
            font-weight: 700;

            > div {
                margin-left: 5px;
            }
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

export const FormBottom = styled.fieldset`
    margin-top: 32px;

    > label {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        color: ${props => props.theme.colors.dark};
        display: flex;
        align-items: flex-start;

        > p {
            width: 1138px;
        }
    }
    
    > fieldset {
        display: flex;
        align-items: center;
        margin-top: 24px;

        > label {
            margin-right: 10px;
        }

        > input {
            margin-right: 8px;
        }
    }
`;

export const ContainerBtn = styled.fieldset`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 32px;
`;

export const CancelBtn = styled.button`
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
    background: none;
    border: 1px solid ${props => props.theme.colors.warning};
    color: ${props => props.theme.colors.warning};
`;

export const SubmitButton = styled.button<{ disabled: boolean }>`
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
    border: none;
    color: ${props => props.disabled == false ? props.theme.colors.white : '#2C3941'};
    background: ${props => props.disabled == false ? props.theme.colors.blue : '#C7C7C7'};
`;