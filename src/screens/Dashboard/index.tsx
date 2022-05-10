import React, { useState } from 'react';
import * as S from './style';
import { 
    DoubleButton,
    Box,
    CustomSelect,
    CustomInputText,
    CardInfo
} from '../../components';
import {
    ocurrenceIcon
} from '../../assets/index';

const Dashboard: React.FC = () => {
    const [ map, setMap ] = useState(true);
    const [ users, setUsers ] = useState(false);
    const [ value, setValue ] = useState('');
    const [ data, setData] = useState('');
    const [ open, setOpen ] = useState(false);

    let list = [
        {label: 'Pesquisar', value: 'pesquisa'}
    ]

    let card = [
        {label: 'item1', number: 1},
        {label: 'item1', number: 1},
        {label: 'item1', number: 1},
        {label: 'item1', number: 1},
        {label: 'item1', number: 1},
        {label: 'item1', number: 1},
        {label: 'item1', number: 1},
        {label: 'item1', number: 1},
    ]

    return (
        <S.Container>
            <nav>
                <DoubleButton
                    text='Mapa'
                    selected={map}
                    onSelect={() => {
                        setMap(true)
                        setUsers(false)
                    }}
                />
                <DoubleButton
                    text='Usuários'
                    selected={users}
                    onSelect={() => {
                        setMap(false)
                        setUsers(true)
                    }}
                />
            </nav>

            {map == true && (
                <>
                    <Box padding='24px 20px'>
                        <S.Header>
                            <h1>Filtros</h1>
                            {value != '' && data != '' && (
                                <button 
                                    onClick={() => {
                                        setValue('')
                                        setData('')
                                    }}
                                >
                                    Limpar filtros
                                </button>
                            )}
                        </S.Header>
                        <S.SearchBar>
                            <div>
                                <CustomSelect 
                                    placeholder="Filtrar por Estados"
                                    label='Filtrar por Estados'
                                    value={value}
                                    list={list}
                                    onChange={(e: any) => setValue(e.target.value)}
                                />
                                <CustomSelect 
                                    placeholder="Filtrar por Município"
                                    label='Filtrar por Município'
                                    value={value}
                                    list={list}
                                    onChange={(e: any) => setValue(e.target.value)}
                                />
                                <CustomSelect 
                                    placeholder="Filtrar por Bairro"
                                    label='Filtrar por Bairro'
                                    value={value}
                                    list={list}
                                    onChange={(e: any) => setValue(e.target.value)}
                                />
                            </div>
                            <div>
                                <CustomInputText 
                                    type='date'
                                    label='De:'
                                    onChange={(e: any) => {
                                        setData(e.target.value)
                                    }}  
                                    value={data == '' ? '' : data}
                                />
                                <CustomInputText 
                                    type='date'
                                    label='Até:'
                                    onChange={(e: any) => {
                                        setData(e.target.value)
                                    }}  
                                    value={data}
                                />
                            </div>
                        </S.SearchBar>
                    </Box>
                        <CardInfo 
                            icon={ocurrenceIcon}
                            list={card}
                            open={open}
                            setOpen={() => {setOpen(!open)}}
                            title="Ocorrências no período"
                            value={20}
                            type="list"
                            width='372px'
                        />
                        <CardInfo 
                            icon=''
                            list={card}
                            open={open}
                            setOpen={() => {setOpen(!open)}}
                            title="Ocorrências no período"
                            value={20}
                            type="list"
                            width='372px'
                        />
                        <CardInfo 
                            icon=''
                            title="Ocorrências no período"
                            value={20}
                            type=""
                            width='372px'
                        />
                        <CardInfo 
                            icon={ocurrenceIcon}
                            list={card}
                            title="Ocorrências no período"
                            value={20}
                            type=""
                            width='372px'
                        />
                        
                </>
            )}
            {users == true && (
                <Box padding='24px 20px'>
                    <h1>users</h1>                    
                </Box>
            )}
        </S.Container>
    );
};

export default Dashboard;