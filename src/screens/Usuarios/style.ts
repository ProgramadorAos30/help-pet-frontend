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
    margin-bottom: 10px;

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
    border-radius: 8px;
    margin-bottom: 10px;

`;

export const Table = styled.table`
    width: 100%;
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    border: none !important;
    border-collapse: collapse;
    margin-bottom: 10px;
    
    td, th {
        border: none !important;
    }

    td {
        box-shadow: inset 0px -1px rgba(0, 0, 0, 0.2);
        height: 47px;     
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
    }

    td > span {
        display: flex;
        align-items: center;
        margin-left: 10px;
        line-height: 18px;
    }
`;

export const Active = styled.span <{ active: boolean }> `
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
    padding: 4px 12px;
    gap: 8px;
    height: 31px;
  
    ${props => {
        if (props.active === true) {
            return `
                background: rgba(62, 168, 73, 0.1);
                border-radius: 20px;
                color: #3EA849;
                width: 54px;
            `
        } else {
            return `
                background: #F8F8F8;
                border-radius: 20px;
                color: #2C3941;
                opacity: 0.5;
                width: 64px;
            `
        }
    }}
`;

export const Trusted = styled.span <{ trusted: boolean }> `
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
    padding: 4px 12px;
    gap: 8px;
    height: 31px;

    ${props => {
        if (props.trusted === true) {
            return `
                background: rgba(62, 168, 73, 0.1);
                border-radius: 20px;
                color: #3EA849;
                width: 107px;
            `
        } else {
            return `
                background: rgba(250, 20, 59, 0.1);
                border-radius: 20px;
                color: #E40B17;
                width: 131px;
            `
        }
    }}
`;

export const Options = styled.button`
    display: flex;
    justify-content: center;
    border: none;
    background: none;
    width: 24px;
    margin-left: 10px;
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
