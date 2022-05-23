import styled from "styled-components";

export const Container = styled.div``;

export const Upload = styled.button`
    width: 223px;
    height: 136px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(23, 115, 226, 0.1);
    border: 1px solid #C7C7C7;
    border-radius: 8px;

    > div {
        > img {
            width: 32px !important;
            height: 32px;
            margin-bottom: 8px;
        }

        > p {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 22px;
            color: #2C3941;
            opacity: 0.5;
        }
    }
`;