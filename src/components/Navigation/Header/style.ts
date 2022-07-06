import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
    grid-area: MH;
    width: 100%;
    height: 80px;
    background: ${props => props.theme.colors.white};
    box-shadow: 1px 0px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: flex-end;
    
    > div {
        margin: 16px 40px;
        display: flex;
        flex-direction: row;

        > div:nth-child(1){
            padding-right: 32px;
            border-right: 1px solid ${props => props.theme.colors.gray};
            display:flex;
            flex-direction: column;
            align-items: flex-end;

            > h1 {
                font-style: normal;
                font-weight: 400;
                font-size: 18px;
                line-height: 24px;
                color: ${props => props.theme.colors.infoOrange};
            }

            p {
                font-style: normal;
                font-weight: 600;
                font-size: 18px;
                line-height: 24px;
            }
        }

        > div:nth-child(2){
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 28px;

            > p {
                font-style: normal;
                font-weight: 400;
                font-size: 18px;
                line-height: 24px;
                color: ${props => props.theme.colors.dark};
                margin-right: 12px;
            }
        }
    }
`;

export const Link = styled.button`
    background: none;
    border: none;

`;

export const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > img {
        width: 60px;
        height: 60px;
        margin-bottom: 24px;
    }

    > h1 {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 34px;
        text-align: center;
        color: ${props => props.theme.colors.dark};
    }

    > div {
        display: flex;
        justify-content: space-between;
        width: 389px;
        margin-top: 32px;

        > button:nth-child(1){
            background: none;
            border: 1px solid #1773E2;
            border-radius: 8px;
            width: 177px;
            height: 48px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 19px;
            text-decoration: none;
            color: #1773E2;
        }
    }
`;

export const LogOut = styled(NavLink)`
    background: #E40B17;
    border-radius: 8px;
    width: 177px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    text-decoration: none;
    color: #FFF;
`;