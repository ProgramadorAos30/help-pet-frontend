import styled from "styled-components";

export const Container = styled.div`
    > div:nth-child(1)  {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 40px;

        > div {
            > p {
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                color: ${props => props.theme.colors.gray};
            }

            > h1 {
                font-style: normal;
                font-weight: 600;
                font-size: 20px;
                line-height: 24px;
                color: ${props => props.theme.colors.dark};
            }
        }
    }
`;

export const Values = styled.section`
    width: 100%;

    > div {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        
        > div {
            display: flex;
            align-items: center;
            margin-left: 12px;
            > div {
                border-radius: 5px;
                width: 16px;
                height: 8px;
            }
        }
    }

    p {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
        color: #6E6B7B;
        margin-left: 8px;
    }
`;