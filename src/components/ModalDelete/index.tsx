import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { orangeAlert } from '../../assets/index';

interface IProps {
    open: boolean,
    onClose: () => void,
    width: number,
    mensage: string,
    onDelete: () => void,
    buttonText: any,
    backgroundColor: string
}

const Container = styled.div<{ backgroundColor: string }>`
        padding: 40px;
        height: 312px;
        width: 389px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

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
            text-align: center;
            margin-bottom: 32px;
        }

        > div {
            display: flex;
            justify-content: space-between;
            width: 389px;

            button {
                border: none;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-style: normal;
                font-weight: 600;
                font-size: 16px;
                line-height: 19px;
                width: 177px;
                height: 48px;
            }

            > button:nth-child(1){
                border: 1px solid #1773E2;
                color: #1773E2;
                background: none;
            }

            > button:nth-child(2){
                ${props => {
                    if(props.backgroundColor === ''){
                        return `
                            background: #E40B17;
                            color: #FFF;
                        `;
                    } else if (props.backgroundColor === 'false'){
                        return `
                            background: #E40B17;
                            color: #FFF;
                        `;
                    } else {
                        return `
                            background: #3EA849;
                            color: #FFF;
                        `;
                    }
                }}
            }
        }
`;

const ModalDelete: React.FC <IProps> = (props) => {
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
        >
            <Box sx={style}>
                <Container backgroundColor={props.backgroundColor}>
                    <img src={orangeAlert} alt="" />
                    <p>{props.mensage}</p>
                    <div>
                        <button
                            id="back"
                            type="button"
                            onClick={props.onClose}
                        >
                            Não, voltar
                        </button>
                        <button 
                            id="close_modal"
                            type='button'
                            onClick={props.onDelete}
                        >
                            {props.buttonText}
                        </button>
                    </div>
                </Container>
            </Box>
        </Modal>
    );
}

export default ModalDelete;