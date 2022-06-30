import styled from 'styled-components';

export const Container = styled.button<{ selected: boolean; }>`
    background: none;
    border-radius: 20px;
    transition: 0.3s ease-out;
    background-color: ${props => props.selected ? props.theme.colors.blue : "trasparent"};
    color: ${props => props.selected ? props.theme.colors.white : props.theme.colors.lightGray};
    box-shadow: ${props => props.selected ? "0px 4px 4px rgba(0, 0, 0, 0.25)" : "none"};
    border-radius: 8px;
    width: 224px;
    height: ${props => props.selected ? '44px' : '40px'};
    border: none;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    
`;