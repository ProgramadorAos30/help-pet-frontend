import React from 'react';
import * as S from './style';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import {
    options,
    closeRed
} from '../../assets/index'

interface IProps {
    onClick: () => any,
    serviceName: string,
    fonte?: number | string,
    status: boolean,
    image: string,
    backgrounColor: string,
    onDelete: () => void,
    onEdit: () => void
}

const CardService: React.FC <IProps> = (props) => {

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
        <S.Container>
            <S.Top background={props.backgrounColor}>
                <div>
                    <div>
                        <img src={props.image} alt="" />
                    </div>
                    <div>
                        <p>Serviço</p>
                        <h1>{props.serviceName}</h1>
                    </div>
                </div>
                <span>
                    <button
                        id="open_triger"
                        type='button'
                        onClick={handleClick}
                        
                    >   
                        <img src={options} alt="" />
                    </button>
                </span>                
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
                    <S.Dialog>
                        <button 
                            onClick={handleClose}
                            type='button'
                        >
                            <img src={closeRed} alt="" />
                        </button>
                        <button 
                            onClick={props.onEdit}
                            type='button'
                            id="edit_service"
                        >
                            Editar
                        </button>
                        <button 
                            onClick={props.onDelete}
                            type='button'
                            id="delete_service"
                        >
                            Excluir
                        </button>
                    </S.Dialog>
                </Popover>
            </S.Top>
            <S.Bottom status={props.status}>
                <div>
                    <p>Fontes</p>
                    <p>{props.fonte}</p>
                </div>
                <div>
                    <p>Status</p>
                    <p>{props.status == true ? 'Ativo' : 'Inativo'}</p>
                </div>
            </S.Bottom>
        </S.Container>
    );
};

export default CardService;