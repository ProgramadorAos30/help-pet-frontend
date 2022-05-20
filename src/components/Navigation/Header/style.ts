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
            margin-left: 32px;

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

export const Link = styled(NavLink)`
    
`;