import styled from "styled-components";

export const Container = styled.div <{ padding: string; width?: string}>`
    box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: ${props => props.padding};
    width: ${props => props.width};
`;