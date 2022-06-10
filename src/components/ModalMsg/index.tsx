import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {
    trusted,
    alertRed
} from '../../assets/index';

interface IProps {
    open: boolean,
    onClose: () => void,
    width: number,
    status: string,
    mensage: string
    modalBackground: boolean,
    height: string
}

const Container = styled.div<{ height: string }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: ${props => props.height == '' ? '312px' : props.height};

    > img {
        width: 60px;
        height: 60px;
        margin-bottom: 24px;
    }

    > p {
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 34px;
        color: #2C3941;
        text-align: center;
        margin-bottom: 32px;
    }

    > button {
        border: none;
        border-radius: 8px;
        color: #FFF;
        background-color: #1773E2;
        display: flex;
        align-items: center;
        justify-content: center;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        width: 311px;
        height: 48px;
    }
`;

const ModalMsg: React.FC <IProps> = (props) => {
    const style = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: props.width,
        bgcolor: 'background.paper',
        border: 'none',
        p: 4,
        borderRadius: '8px'
    };

    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
            hideBackdrop={props.modalBackground}
        >
            <Box sx={style}>
                <Container height={props.height}>
                    <img src={props.status == 'success' ? trusted : alertRed} alt="" />
                    <p>{props.mensage}</p>
                    <button
                        type="button"
                        onClick={props.onClose}
                    >
                        Fechar
                    </button>
                </Container>
            </Box>
        </Modal>
    );
};

export default ModalMsg;