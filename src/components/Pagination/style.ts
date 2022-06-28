import styled from "styled-components";

export const DivConatainerBtn = styled.div`
display: flex;
flex-direction: row-reverse;
`;

export const ContainerBtn = styled.div`
    width: 232px;
    margin-top: 40px;
    margin-right: 0;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    align-content: end;
`;

export const PrevNext = styled.button < { to: string } >`
    background: none;
    border: none;
    width: 32px;
    height: 32px;

    > img {
        ${props => {
        if (props.to == 'next') {
            return `
                    transform: rotate(265deg);
                `;
        } else if (props.to == 'prev') {
            return `
                    transform: rotate(90deg);
                `;
        }
    }}
    }
`;

export const Page = styled.button`
    width: 36px;
    height: 36px;
    border: none;
    background: none;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: ${props => props.theme.colors.dark};
`;

export const AtualPage = styled.button`
    width: 36px;
    height: 36px;
    border: none;
    background: ${props => props.theme.colors.blue};
    border-radius: 8px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    color: ${props => props.theme.colors.white};
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