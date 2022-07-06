import styled from "styled-components";

export const Container = styled.div`
    background: none;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    width: 372px;

    > div:nth-child(1) {
        display: flex;
    }
`;

export const Top = styled.div<{ background: string }>`
    display: flex;
    justify-content: space-between;
    padding: 16px 16px 16px 24px;
    position: relative;

    > div {
        display: flex;
        > div:nth-child(1) {
            background: ${props => props.background};
            width: 60px;
            height: 60px;
            border-radius: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 16px;
        }

        > div:nth-child(2){
            > p {
                color: #C7C7C7;
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 18px;
            }

            > h1 {
                font-style: normal;
                font-weight: 600;
                font-size: 24px;
                line-height: 34px;
                color: ${props => props.theme.colors.dark};
            }
        }
    }

    > span {
        display: flex;
        width: 24px;
        height: 24px;
        > button {
            align-items: center;
            align-content: center;
            border: none;
            background: none;
        }
    }
`;

export const Bottom = styled.div<{ status: boolean}>`
    background: ${props => props.theme.colors.white};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 37px 18px 24px;

    > div:nth-child(1){
        width: 134px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        > p:nth-child(1){
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 18px;
            color: ${props => props.theme.colors.gray};
        }

        > p:nth-child(2){
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 18px;
            color: ${props => props.theme.colors.dark};
        }
    }   

    > div:nth-child(2){
        width: 140px;
        display: flex;
        align-items: center;

        > p:nth-child(1){
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 18px;
            color: ${props => props.theme.colors.gray};
        }

        > p:nth-child(2){
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 4px 12px;
            border-radius: 20px;
            background-color: ${props => props.status == true ? 'rgba(62, 168, 73, 0.1)' : '#F8F8F8'};
            color: ${props => props.status == true ? '#3EA849' : '#2C394190'};
            margin-left: 20px;
        }
    }
`;  

export const Dialog = styled.div`
    background: ${props => props.theme.colors.white};
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    padding: 8px 8px 24px 8px;
    width: 112px;
    height: 142px;

    button {
        background: none;
        border: none;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
    }

    > button:nth-child(2){
        color: ${props => props.theme.colors.dark};
    }
    
    > button:nth-child(3){
        color: ${props => props.theme.colors.warning};
    }
`;