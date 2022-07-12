import React from 'react';
import * as S from './style'
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
    height: string,
    occurence?: boolean,
    finishOccurence?: () => void
}

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
                <S.Container height={props.height}>
                    <img src={props.status == 'success' ? trusted : alertRed} alt="" />
                    <p>{props.mensage}</p>
                    <button
                        id="close_modal"
                        type="button"
                        onClick={props.onClose}
                    >
                        Fechar
                    </button>
                    {props.occurence === true && 
                        <S.ContainerOccurence>
                            <hr />
                            <p>Caso o serviço já tenha sido restabelecido, clique no botão abaixo para registrar.</p>
                            <button
                                type="button"
                                onClick={props.finishOccurence}
                            >
                                Finalizar ocorrência
                            </button>
                        </S.ContainerOccurence>
                    }
                </S.Container>
            </Box>
        </Modal>
    );
};

export default ModalMsg;