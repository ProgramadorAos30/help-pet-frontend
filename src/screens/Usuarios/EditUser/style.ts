import styled from "styled-components";

export const Container = styled.div`
    overflow: hidden;
    height: 450px;
 
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
                >div {
                    margin-top: 8px;
                    width: 155px;
                    height: 66px;
                    > p{
                        margin-bottom: 10px;
                        font-weight: 400;
                        font-size: 16px;
                        line-height: 22px;
                    }
                    >div {
                        justify-content: space-between;
                        font-size: 16px;
                        line-height: 18px;  
                    }
                }           
            
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
        }
    }
`;

export const ContainerBnt = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 32px;

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