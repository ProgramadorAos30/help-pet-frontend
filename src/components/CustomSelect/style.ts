import styled from "styled-components";

export const StyleSelect = styled.div <{ width?: string}>`
    width: ${props => props.width};
    border-radius: 8px;
    border: 1px solid ${props => props.theme.colors.lightGray};
    height: 56px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    position: relative;

    > button {
        background: transparent;
        border: none;
    }

    > div {
        display: flex;
        flex-direction: column;
        padding: 8px 0;
        width: 100%;

        > p {
            margin-left: 16px;
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 20px;
            color: ${props => props.theme.colors.dark};
        }
    }

`;
export const Select = styled.div`
    border-left: 1px solid ${props => props.theme.colors.lightGray};
    border-right: 1px solid ${props => props.theme.colors.lightGray};
    border-bottom: 1px solid ${props => props.theme.colors.lightGray};
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    width: 100%;
    background-color: ${props => props.theme.colors.white};
    position: absolute;
    top: 50px;
    left: 0;

    >div {
        width: 100%;
        border: none;
        color: ${props => props.theme.colors.dark};
        padding-bottom: 8px;

        > label {
            width: 100%;
            cursor: pointer;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            background: none;
            border: none;
            margin-bottom: 10px;
            position: relative;
            margin: 0 !important;
            text-align: left;
            padding: 5px 16px !important;
            
        }
        :hover {
            background: #FAFAFA;
        }

        > input {
            display: none;
        }
    }
`;

export const Label = styled.label`
    margin-top: 9px;
    margin-left: 16px;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    align-items: center;
    color: ${props => props.theme.colors.gray};
`;

export const DaufaultLabel = styled.label`
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    margin-left: 16px;
    color: ${props => props.theme.colors.gray};
`;

export const Value = styled.p`
    margin: 0 16px;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: ${props => props.theme.colors.dark};
`;