import React from 'react';
import * as S from './style';
import Popover from '@mui/material/Popover';
import {
    options,
    alertRed
} from '../../assets/index';


interface IProps {
    onClick: () => any,
    onDelete: () => void,
    onEdit: () => void
}

const Poppover: React.FC <IProps> = ({onDelete, onEdit, onClick}) => {
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
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <S.Dialog>
                    <button 
                        onClick={handleClose}
                        type='button'
                    >
                        <img src={alertRed} alt="" />
                    </button>
                    <button 
                        onClick={onEdit}
                        type='button'
                        id="onEdit_poppover"
                    >
                        Editar
                    </button>
                    <button 
                        onClick={onDelete}
                        type='button'
                        id="onDelete_poppover"
                    >
                        Excluir
                    </button>
                </S.Dialog>
            </Popover>
        </>
    );
};

export default Poppover;