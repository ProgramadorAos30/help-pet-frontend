import React from 'react';
import * as S from './style';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import {
    options,
    alertRed
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
                
                <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                            <>
                                <button
                                    id="open_triger"
                                    type='button'
                                    {...bindTrigger(popupState)}
                                >   
                                    <img src={options} alt="" />
                                </button>
                                <Popover
                                    {...bindPopover(popupState)}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                >
                                    <S.Dialog>
                                        <button 
                                            {...bindPopover(popupState)}
                                            type='button'
                                        >
                                            <img src={alertRed} alt="" />
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
                            </>
                    )}
                </PopupState>
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