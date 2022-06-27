import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-columns: 372px 372px 372px 372px;
    gap: 20px 20px;
`;

export const Head = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;

    > h1 {
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        display: flex;
        align-items: center;
        color: ${props => props.theme.colors.dark};
    }

    > div {
        display: flex;
        
        button {
            width: 274px;
            height: 48px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 19px;
            border: none;
            color: ${props => props.theme.colors.white};
            background: #0A3466;
        }
    }
`;