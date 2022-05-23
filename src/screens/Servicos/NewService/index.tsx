import React, { useState } from 'react';
import * as S from './style';
import { 
    CustomSelect, 
    CustomInput,
    InputIcon,
    CustomSwitch 
} from '../../../components';
import Soucers from '../Sources/index';

const NewService: React.FC = () => {
    const [ list, setList ] = useState();

    let colors = [
        {label: 'Laranja', value: '#FF954E'},
        {label: 'Ciano', value: '#47DED0'},
        {label: 'Lilas', value: '#9D86ED'},
        {label: 'Rosa', value: '#FF77F1'},
        {label: 'Verde', value: '#B8D335'},
        {label: 'Amarelro escuro', value: '#E59724'},
        {label: 'Azul', value: '#4A7EE4'},
        {label: 'Amarelo', value: '#FFB906'}
    ]

    return(
        <S.Container>
            <h1>Cadastrar serviço</h1>
            <S.Form>
                <S.Header>
                    <InputIcon />
                    <div>
                        <CustomInput 
                            label='Digite o nome do serviço' 
                            type='Text' 
                            value='' 
                            width={254}                            
                            onChange={function (e: any) {
                                throw new Error('Function not implemented.');
                            } } 
                            onBlur={function (e: any) {
                                throw new Error('Function not implemented.');
                            } } 
                        />
                        <CustomSelect
                            width={254}
                            label='Cor de background'
                            list={colors}
                            value=''
                            labelDefault='Cor de background'
                            onChange={() => {}}
                            onBlur={() => {}}
                        />
                    </div>
                    <fieldset>
                        <label htmlFor="">
                            Status do serviço
                        </label>
                        <CustomSwitch
                            leftLabel="Inativo"
                            rightLabel="Ativo"
                            value={false}
                            onChange={() => {}}
                            onBlur={() => {}}
                        />
                    </fieldset>
                </S.Header>
                <div>
                    <S.Fonts>
                        <h1>Fontes</h1>
                        <div>
                            <Soucers 
                                idService={'123'}
                            />
                        </div>
                    </S.Fonts>
                </div>
            </S.Form>
        </S.Container>
    );
};

export default NewService;