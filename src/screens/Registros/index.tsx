import React, { useState } from 'react';
import * as S from './style';
import { 
    DoubleButton,
    DefaultButton
} from '../../components';

const Registros: React.FC = () => {
    const [ maps, setMaps ] = useState(true);
    const [ list, setList ] = useState(false);
    const [ open, setOpen ] = useState(false);
    
    return (
        <>
            <S.Header>
                <div>
                    <DoubleButton
                        text='Mapa'
                        selected={maps}
                        onSelect={() => {
                            setMaps(true)
                            setList(false)
                        }}
                    />
                    <DoubleButton
                        text='Lista'
                        selected={list}
                        onSelect={() => {
                            setMaps(false)
                            setList(true)
                        }}
                    />
                </div>
                <DefaultButton 
                    onSelect={() => {}}
                    text="Registrar ocorrência"
                />
            </S.Header>
        </>
    )
}

export default Registros;