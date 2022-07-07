import React from 'react';
import * as S from './style';
import Popover from '@mui/material/Popover';
import {
    options,
    closeRed
} from '../../assets/index';


interface IProps {
    onClick: () => any,
    onDelete: () => void,
    onEdit: () => void,
    onFinish?: () => void,
    onApprove?: () => void,
    onView?: () => void,
    onAnswer?: () => void,
    onMark?: () => void,
    type?: string,
}

const Poppover: React.FC <IProps> = ({onDelete, onEdit, onClick, type, onView, onApprove, onFinish, onAnswer, onMark}) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <button
                id="open_triger"
                type='button'
                onClick={handleClick}
            >   
                <img src={options} alt="" />
            </button>
            <>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: -8,
                        horizontal: 32,
                    }}
                    transformOrigin={{
                        vertical: 'top',
                            horizontal: 'right',
                    }}
                                    
                >
                    {type === 'userApp' && (
                        <S.TwoItens>
                            <button 
                                onClick={handleClose}
                                type='button'
                            >
                                <img src={closeRed} alt="" />
                            </button>
                            <button 
                                onClick={() => {
                                    onEdit()
                                    handleClose()
                                }}
                                type='button'
                                id="onEdit_poppover"
                            >
                                Gerenciar
                            </button>
                            <button 
                                onClick={() => {
                                    onDelete()
                                    handleClose()
                                }}
                                type='button'
                                id="onDelete_poppover"
                            >
                                Excluir
                            </button>
                        </S.TwoItens>
                    )}
                    {type === 'userPanel' && (
                        <S.TwoItens>
                            <button 
                                onClick={()=>{
                                    handleClose()
                                }}
                                type='button'
                            >
                                <img src={closeRed} alt="" />
                            </button>
                            <button 
                                onClick={()=>{
                                    onEdit();
                                    handleClose();
                                }}
                                type='button'
                                id="onEdit_poppover"
                            >
                                Editar
                            </button>
                            <button 
                                onClick={() => {
                                    onDelete()
                                    handleClose()
                                }}
                                type='button'
                                id="onDelete_poppover"
                            >
                                Excluir
                            </button>
                        </S.TwoItens>
                    )}
                    {type === 'occurrences' && (
                        <S.FiveItems>
                            <button 
                                onClick={handleClose}
                                type='button'
                            >
                                <img src={closeRed} alt="" />
                            </button>
                            <button 
                                onClick={() => {
                                    onEdit()
                                    handleClose()
                                }}
                                type='button'
                                id="onEdit_poppover"
                            >
                                Editar
                            </button>
                            <button 
                                // onClick={() => {
                                //     onView()
                                //     handleClose()
                                // }}
                                onClick={onView}
                                type='button'
                                id="onView_poppover"
                            >
                                Visualizar
                            </button>
                            <button 
                                // onClick={() => {
                                //     onFinish()
                                //     handleClose()
                                // }}
                                onClick={onFinish}
                                type='button'
                                id="onFinish_poppover"
                            >
                                Finalizar ocorrência
                            </button>
                            <button 
                                // onClick={() => {
                                //     onApprove()
                                //     handleClose()
                                // }}
                                onClick={onApprove}
                                type='button'
                                id="onApprove_poppover"
                            >
                                Aprovar/Reprovar
                            </button>
                            <button 
                                onClick={() => {
                                    onDelete()
                                    handleClose()
                                }}
                                type='button'
                                id="onDelete_poppover"
                            >
                                Excluir
                            </button>
                        </S.FiveItems>
                    )}
                    {type === 'menssage' && (
                        <S.ThreeItems>
                            <button 
                                onClick={handleClose}
                                type='button'
                            >
                                <img src={closeRed} alt="" />
                            </button>
                            <button 
                                // onClick={() => {
                                //     onAnswer()                                    
                                //     handleClose()
                                // }}
                                onClick={onAnswer}
                                type='button'
                                id="onAnswer_poppover"
                            >
                                Responder
                            </button>
                            <button 
                                // onClick={() => {
                                //     onMark()
                                //     handleClose()
                                // }}
                                onClick={onMark}
                                type='button'
                                id="onMark_poppover"
                            >
                                Marcar como respondida
                            </button>
                            <button 
                                onClick={() => {
                                    onDelete()
                                    handleClose()
                                }}
                                type='button'
                                id="onDelete_poppover"
                            >
                                Excluir
                            </button>
                        </S.ThreeItems>
                    )}
                </Popover>
            </>
        </>      
    );
};

export default Poppover;