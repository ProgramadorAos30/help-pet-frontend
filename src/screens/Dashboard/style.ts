import styled from "styled-components";

export const Container = styled.div`
`;

export const Navigation = styled.nav`
    margin-bottom: 24px;
    

    div {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.colors.white};
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    width: 448px;
    height: 40px; 
    margin: 2px 0px;
    }
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;

    > h1 {
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
    }

    > button {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        text-decoration-line: underline;
        color: #E40B17;
        background: none;
        border: none;
    }
`;

export const SearchBar = styled.div`
    display: flex;
    justify-content: space-between;

    > div:nth-child(1){
        width: 810px;
        display: flex;
        justify-content: space-between;
    }

    > div:nth-child(2){
        width: 376px;
        display: flex;
        justify-content: space-between;
    }
`;

export const StatusBox = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 24px 0 64px;
`;

export const GraficItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 32px 0;
`;
