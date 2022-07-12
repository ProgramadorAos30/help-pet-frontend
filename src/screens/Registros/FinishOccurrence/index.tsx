import React from 'react';
import * as S from './style';
import { PersonalModal } from '../../../components';

interface IProps {
    onHide: () => void,
    isModal: boolean,
    itemEdit: any
}

const FinishOccurence: React.FC<IProps> = ({ onHide, isModal, itemEdit }) => {

    console.log(itemEdit,'teste')

    return (
        <>
            <PersonalModal
                modalBackground={false}
                padding={4}
                width={1280}
                open={isModal}
                onClose={onHide}
            >
                <S.Container>
                    <h1>Finalizar ocorrência</h1>
                    <div>
                        
                    </div>
                </S.Container>
            </PersonalModal>
            
        </>
    );
};

export default FinishOccurence;