import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
    grid-area: AS;
    height: 100vh;
    width: 292px;
    background: ${props => props.theme.colors.white};
    box-shadow: 1px 0px 10px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999 !important;
`;

export const logo = styled.div`
    box-shadow: 1px 0px 10px rgba(0, 0, 0, 0.1);
    height: 80px;
    padding: 20.78px 93.08px 19.78px 42.08px;

    > img {
        width: 156.83px;
        height: 39.44px;
    }
`;

export const Navigation = styled.nav`
    display: flex;
    flex-direction: column;
    padding: 40px 20px;
`;

export const Link = styled(NavLink)`
    background: ${props => props.theme.colors.whiteSecconday};
    color: ${props => props.theme.colors.gray};
    text-decoration: none;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 8px;
    padding: 12px 10px;
    margin-bottom: 16px;

    > img{
        margin-right: 22px;
        filter: opacity(0.4) drop-shadow(0 0 0); 
    }

    :hover, &.active {
        color: ${props => props.theme.colors.white};
        background: ${props => props.theme.colors.blue};
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 24px;

        > img {
            filter: brightness(0) invert(1); 
        }
    }

    :hover{
        opacity: 0.5;
    }
`;