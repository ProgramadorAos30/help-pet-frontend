import styled from "styled-components";

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    
    > div {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${props => props.theme.colors.white};
        box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        height: 40px; 
        margin: 2px 0px;
    }
`;

export const Container = styled.div`
    > h1 {
        font-style: normal;
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        color: ${props => props.theme.colors.dark};
        padding: 33px 24px;
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
    margin-left: 24px;
`;

export const FiltersBottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    margin-left: 24px;
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

export const TableBody = styled.tbody`
    > tr {
        box-shadow: inset 0px -1px 1px rgba(0, 0, 0, 0.2) !important;

        > td {
            height: 48px;
            > span {
                display: flex;
                align-items: center;
                font-style: normal !important;
                font-weight: 400 !important;
                font-size: 12px !important;
                line-height: 15px !important;
                color: ${props => props.theme.colors.dark} !important;
            }
        }
    }
`;

export const Status = styled.td<{ status: string }>`
    width: 207px;
    > span {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        > p {
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            line-height: 23px;
            padding: 4px 12px;
            border-radius: 20px;
            ${props => {
                if(props.status == "Waiting"){
                    return `
                        background: rgba(255, 135, 53, 0.1);
                        color: #FF8735 !important;
                    `;
                } else if (props.status == "Approved"){
                    return `
                        background: rgba(62, 168, 73, 0.1);
                        color: #3EA849 !important;
                    `;
                } else if(props.status == "Disapproved"){
                    return `
                        background: rgba(250, 20, 59, 0.1);
                        color: #E40B17 !important;
                    `;
                }
            }}
        }
    }
`;

export const Finished = styled.td<{ finished: string }>`
    width: 150px;
    > span {
        display: flex;
        justify-content: center;
        align-items: center;
        
        > p {
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            line-height: 23px;
            padding: 4px 12px;
            border-radius: 20px;

            ${props => {
                if(props.finished == "No"){
                    return `
                        background: rgba(255, 135, 53, 0.1);
                        color: #FF8735 !important;
                    `;
                } else if (props.finished == "Yes"){
                    return `
                        background: rgba(62, 168, 73, 0.1);
                        color: #3EA849 !important;
                    `;
                } else if(props.finished == "Abandoned"){
                    return `
                        background: rgba(250, 20, 59, 0.1);
                        color: #E40B17 !important;
                    `;
                }
            }}
        }

    }
`;
export const Options = styled.span`
> button {
    display: flex;
    justify-content: center;
    border: none;
    background: none;
    width: 24px;
    margin-left: 10px;}
`;

export const Button = styled.td<{ showOccurence: boolean }>`
    > span {
        display: flex;
        align-items: center;
        justify-content: center;
        > button {
            border: none;
            background: none;
            
            > img {
                ${props => {
                    if(props.showOccurence){
                        return `
                            transform: rotate(265deg);
                        `;
                    }
                }}
            }
        }
    }
`;

export const User = styled.td`
    width: 218px;
    > span {
        img {
            margin-left: 5px;
        }
    }
`;

export const Icon = styled.div<{ backgroundColor: string }>`
    border-radius: 100%;
    background-color: ${props => props.backgroundColor};
    margin: 0 8px 0 32px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    > img {
        width: 15px;
        height: 15px;
    }
`;