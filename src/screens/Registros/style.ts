import styled from "styled-components";

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Container = styled.div`
    > h1 {
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        color: ${props => props.theme.colors.dark};
        margin: 33px 0;
    }
`;

export const CardsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    margin-bottom: 25px;
`;

export const FiltersTop = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
    margin-right: 32px;
`;

export const FiltersBottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
`;

export const Radios = styled.div`
    display: flex;
    margin-right: 32px;

    > p {
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        color: ${props => props.theme.colors.dark};
        margin-right: 12px;
    }

    > div {
        display: flex;
        align-items: center;

        > input[type="radio"] {
            margin: 0 9px 0 12px;
        }
    }
`;

export const Table = styled.table`
    width: 100%;
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    border-bottom-left-radius: 8px;
    border-bottom-left-radius: 8px;
    margin-bottom: 68px;
    border: none !important;
    border-collapse: collapse;

    td, th {
        border: none !important;
    }
`;

export const TableHead = styled.thead`
    background: #1773E290;
    color: ${props => props.theme.colors.blue};
    height: 44px;
    text-align: left;
    
    > th {
        > tr {
            padding-left: 24px;
        }
    }
`;

export const TableBody = styled.tbody``;