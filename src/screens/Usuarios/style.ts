import styled from "styled-components";

export const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const CardList = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    margin-bottom: 24px;
`;

export const SearchInputs = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32px 24px;

    > p {
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        color: ${props => props.theme.colors.dark};
    }

    > div {
        width: 1087px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export const ContainerListApp = styled.div`
    background-color: ${props => props.theme.colors.white};
    
`;

export const Table = styled.table`
    width: 100%;
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    border-bottom-left-radius: 8px;
    border-bottom-left-radius: 8px;
    margin-bottom: 28px;
    border: none !important;
    border-collapse: collapse;
    

    td, th {
        border: none !important;
    }
`;

export const TableHead = styled.thead`
    background-color: rgba(23, 115, 226, 0.2);
    color: ${props => props.theme.colors.blue};
    height: 44px;
    text-align: left;
    
    > tr {
        > th {
            > span {
                display: flex;
                align-items: center;
                margin-left: 10px;
                font-style: normal;
                font-weight: 700;
                font-size: 14px;
                line-height: 18px;
                > button {
                    border: none;
                    background: none;
                    margin-left: 15.5px;
                }
            }
        }
    }
`;