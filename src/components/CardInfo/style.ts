import styled from "styled-components";

export const Container = styled.div <{ width: string }>`
    max-width: 392px;
`;

export const Card = styled.div`
    display: flex;

    > img {
        margin-right: 12px;
    }
`;

export const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    > div {
        > h1 {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            color: ${props => props.theme.colors.lightGray};
        }

        > p {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 600;
            font-size: 20px;
            line-height: 24px;
            color: ${props => props.theme.colors.dark};
        }
    }

    > button {
        border: ${props => props.theme.colors.dark};
        background: ${props => props.theme.colors.white};
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
        border-radius: 100%;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const List = styled.div`
    padding-top: 10px;

    > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;

        > h1 {
            font-style: normal;
            font-weight: 700;
            font-size: 16px;
            line-height: 19px;
            color: ${props => props.theme.colors.dark};


        }

        > p {
            color: ${props => props.theme.colors.blue};
            font-weight: 500;
        }
    }
`;