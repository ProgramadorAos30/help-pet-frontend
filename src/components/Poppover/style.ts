import styled from "styled-components";

export const TwoItens = styled.div`
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

export const FiveItems = styled.div`
    background: ${props => props.theme.colors.white};
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    padding: 8px 8px 24px 8px;
    width: 190px;
    height: 279px;

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
    
    > button:nth-child(6){
        color: ${props => props.theme.colors.warning};
    }
`;
export const ThreeItems = styled.div`
    background: ${props => props.theme.colors.white};
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    padding: 8px 8px 24px 8px;
    width: 190px;
    height: 279px;

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
    
    > button:nth-child(6){
        color: ${props => props.theme.colors.warning};
    }
`;