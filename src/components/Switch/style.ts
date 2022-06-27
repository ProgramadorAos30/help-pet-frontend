import styled from 'styled-components';

export const Container = styled.div`
    width: 155px;
    display: flex;
    align-items: center;

    label {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 18px;
        color: #2C3941;
        cursor: pointer;
    }
`;

export const CheckedActive = styled.label<{ checked: boolean }>`
        ${(props) => {
            if(props.checked === true){
                return `
                    font-weight: 700;
                `
            } else {
                return `
                    font-weight: 400;
                `
            }
        }}
        font-style: normal;
        font-size: 16px;
        line-height: 18px;
        color: #2C3941;
        cursor: pointer;
`;

export const CheckedInative = styled.label<{ checked: boolean }>`
        ${(props) => {
            if(props.checked === true){
                return `
                    font-weight: 400;
                `
            } else {
                return `
                    font-weight: 700;
                `
            }
        }}
        font-style: normal;
        font-size: 16px;
        line-height: 18px;
        color: #2C3941;
        cursor: pointer;
`;