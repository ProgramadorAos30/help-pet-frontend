import styled from "styled-components";

export const Container = styled.div`
    > div {
        display: flex;
        align-items: center;
        padding: 20px 0 0 0;
        > div {
            > h1 {
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                color: ${props => props.theme.colors.lightGray};
            }
    
            > p {
                font-style: normal;
                font-weight: 600;
                font-size: 20px;
                line-height: 24px;
                color: ${props => props.theme.colors.dark};
            }
        }

        > img {
            margin-left: 18px;
            margin-right: 16px;
        }
    }
`;