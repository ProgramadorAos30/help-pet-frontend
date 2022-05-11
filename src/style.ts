import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-columns: 292px auto;
    grid-template-rows: 80px auto;

    grid-template-areas: 
        'AS MH'
        'AS CT'
    ;
`;

export const Content = styled.div`
    grid-area: CT;
    padding: 40px;
    background: ${props => props.theme.colors.whiteSecconday};
`;