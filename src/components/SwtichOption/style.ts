import styled from "styled-components";

export const Container = styled.div<{ width: string }>`
    width: ${props => props.width};
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    img {
        width: 20px;
        height: 20px;
    }
`;

export const Approve = styled.label<{ value: string | boolean }>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 12px;
    gap: 8px;
    border-radius: 20px;
    cursor: pointer;

    ${(props) => {
        if(props.value === 'Approved'){
            return `
                background: rgba(62, 168, 73, 0.1);
                color: #3EA849;
            
                
            `;
        } else {
            return `
                background: #F8F8F8;
                color: #2C394190;
            `;
        }
    }}

    > input {
        display: none;
    }
`;

export const Repprove = styled.label<{ value: string | boolean }>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 12px;
    gap: 8px;
    border-radius: 20px;
    cursor: pointer;

    ${(props) => {
        if(props.value === 'Disapproved' || props.value === 'Waiting'){
            return `
                background: rgba(250, 20, 59, 0.1);
                color: #FA143B;
            `;
        } else {
            return `
                background: #F8F8F8;
                color: #2C394190;
            `;
        }
    }}

    > input {
        display: none;
    }

`;

export const ContainerBtn = styled.fieldset`

`;