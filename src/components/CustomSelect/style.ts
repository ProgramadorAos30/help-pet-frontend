import styled from "styled-components";
import Select from '@mui/material/Select';

export const StyleSelect = styled(Select) <{ value: string; }> `
    min-width: 254px;
    font-weight: 600;
    font-size: 16px;

    & > div {
        border-radius: 8px;
        background: ${props => props.theme.colors.white} !important;
        border: 1px solid ${props => props.theme.colors.lightGray} !important;
        color: ${props => props.theme.colors.dark};
        font-style: normal;
        font-size: 16px;

        ${(props) => {
            if(props.value == ''){
                return `
                    color: #AFAFAF;
                `
            }
        }}

    }
`;