import styled from "styled-components";
import { loginBg } from "../../assets";

export const Container = styled.div`
    height: 100vh;
    background: url(${loginBg}) no-repeat center center;
    position:relative;

    > div { 
        position: absolute;
        top: 177px;
        left: 186.01px;
        padding: 89px 98px 83px 98px;
        background: ${props => props.theme.colors.white};
        width: 568px;
        height: 727px;
        border-radius: 40px;

        > img { 
            width: 191.16px;
            height: 48.07px;
            margin-top: 4px;
            margin-bottom: 44px;
        }

        > p { 
            font-style: normal;
            font-weight: 400;
            font-size: 24px;
            line-height: 29px;
            display: flex;
            align-items: center;
            color: #AFAFAF;
            margin-bottom: 16px;
        }

        > h1 { 
            font-style: normal;
            font-weight: 600;
            font-size: 32px;
            line-height: 45px;
            color: #0A3466;
            width: 300px;
            margin-bottom: 43px;
        }

        > form {
            > fieldset {
                
                > span {  
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    margin-bottom: 24px;
                    position: relative;
                    
                    > span { 
                        padding-top: 5px;
                        color: red;
                        font-style: normal;
                        font-weight: 400;
                        font-size: 12px;
                        line-height: 15px;
                        position: absolute;
                        margin-top: 56px;
                    }
                }
            }


            > div {
                margin-bottom: 24px;
            }
        }
    }
`;

export const Button = styled.button <{ disabled: boolean }>`
        width: 100%;
        height: 48px;
        border: none;
        border-radius: 8px;
        color: ${props => props.disabled == false ? props.theme.colors.white : '#2C3941'};
        background: ${props => props.disabled == false ? props.theme.colors.gradient : '#C7C7C7'};
`;

export const RemeberPassword = styled.button`
    text-align: right;
    border-bottom: 1px solid #0A3466;
    color: #0A3466;
    cursor: pointer;
    margin-bottom: 48px;
    float: right;
    cursor: pointer;
    background: none;
    border: none;

    :hover {
        background: none;
    }
`;