import styled from "styled-components";

export const Container = styled.div`
    > div {
        > h1 {
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 24px;
            color:${props => props.theme.colors.dark};
        }

        > p {
            font-style: normal;
            font-weight: 600;
            font-size: 20px;
            line-height: 24px;
            color:${props => props.theme.colors.dark};
        }
    }

    > section {
        display: flex;
        justify-content: space-between;
    }
`;

export const ProgressBar = styled.div`
    width: 643px;
    > div {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        > div {
            margin-bottom: 48px;
            > div {
                display: flex;
                justify-content: space-between;

                > p {
                    font-style: normal;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 22px;
                    color: ${props => props.theme.colors.gray};
                }

                > h1 {
                    font-style: normal;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 22px;
                    color: ${props => props.theme.colors.dark};
                }
            }
        }
    }
`;