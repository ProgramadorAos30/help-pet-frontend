import React, { useState } from 'react';
import * as S from './style';
import { 
    DoubleButton,
    Box,
    CustomSelect,
    CustomInputText,
    CardInfo,
    CardGraficItem,
    MultSelect
} from '../../components';
import {
    ocurrenceIcon,
    energiIcon,
    whaterIcon,
    wifiIcon,
    gasIcon
} from '../../assets/index';

const Dashboard: React.FC = () => {
    const [ open, setOpen ] = useState(false);
    const [ map, setMap ] = useState(true);
    const [ users, setUsers ] = useState(false);
    const [ value, setValue ] = useState('');
    const [ value2, setValue2 ] = useState('');
    const [ value3, setValue3 ] = useState('');
    const [ data, setData] = useState('');
    const [ multValue, setMultValue ] = useState<string[]>([]);

    let list = [
        {label: 'Pesquisar 1', value: 'pesquisa1'},
        {label: 'Pesquisar 2', value: 'pesquisa2'},
        {label: 'Pesquisar 3', value: 'pesquisa3'},
        {label: 'Pesquisar 4', value: 'pesquisa4'},
        {label: 'Pesquisar 5', value: 'pesquisa5'},
        {label: 'Pesquisar 6', value: 'pesquisa6'},
    ]

    const card = {
        title: "Quedas de energia",
        list: [
            {
                label: 'Quedas de energia',
                value: '43'
            }, {
                label: 'Quedas de energia',
                value: '63'
            }, {
                label: 'Quedas de energia',
                value: '43'
            }, {
                label: 'Quedas de energia',
                value: '13'
            }, {
                label: 'Quedas de energia',
                value: '63'
            },
        ]
    }

    const card2 = {
        title: "Falta de água",
        list: [
            {
                label: 'Falta de água',
                value: '43'
            }, {
                label: 'Falta de água',
                value: '63'
            }, {
                label: 'Falta de água',
                value: '43'
            }, {
                label: 'Falta de água',
                value: '13'
            }, {
                label: 'Falta de água',
                value: '63'
            },
        ]
    }

    const card3 = {
        title: "Quedas de internet",
        list: [
            {
                label: 'Quedas de internet',
                value: '43'
            }, {
                label: 'Quedas de internet',
                value: '63'
            }, {
                label: 'Quedas de internet',
                value: '43'
            }, {
                label: 'Quedas de internet',
                value: '13'
            }, {
                label: 'Quedas de internet',
                value: '63'
            },
        ]
    }

    const card4 = {
        title: "Falta de gás",
        list: [
            {
                label: 'Falta de gás',
                value: '43'
            }, {
                label: 'Falta de gás',
                value: '63'
            }, {
                label: 'Falta de gás',
                value: '43'
            }, {
                label: 'Falta de gás',
                value: '13'
            }, {
                label: 'Falta de gás',
                value: '63'
            },
        ]
    }

    return (
        <>
            <S.Navigation>
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
            </S.Navigation>
            <S.Container>

                {map == true && (
                    <>
                        <Box padding='24px 20px'>
                            <S.Header>
                                <h1>Filtros</h1>
                                {value != '' && data != '' && (
                                    <button 
                                        onClick={() => {
                                            setValue('');
                                            setValue2('');
                                            setValue3('');
                                            setData('');
                                        }}
                                    >
                                        Limpar filtros
                                    </button>
                                )}
                            </S.Header>
                            <S.SearchBar>
                                <div>
                                    <CustomSelect
                                        width='254px'
                                        defaultValue="Estados"
                                        label='Filtrar por Estados'
                                        value={value}
                                        list={list}
                                        onChange={(e: any) => {
                                            setValue(e)
                                            console.log(e);
                                        }}
                                    />
                                    <CustomSelect
                                        width='254px'
                                        defaultValue="Município"
                                        label='Filtrar por Estados'
                                        value={value2}
                                        list={list}
                                        onChange={(e: any) => {
                                            setValue2(e)
                                        }}
                                    />
                                    <CustomSelect
                                        width='254px'
                                        defaultValue="Bairro"
                                        label='Filtrar por Estados'
                                        value={value3}
                                        list={list}
                                        onChange={(e: any) => {
                                            setValue3(e)
                                        }}
                                    />
                                </div>
                                <div>
                                    <CustomInputText 
                                        type='date'
                                        label='De:'
                                        onChange={(e: any) => {
                                            setData(e)
                                            console.log(e);
                                            
                                        }}  
                                        value={data == '' ? '' : data}
                                    />
                                    <>
                                        {console.log(data)}
                                    </>
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
                        <S.StatusBox>
                            <CardInfo 
                                icon={ocurrenceIcon}
                                title="Ocorrências no período"
                                value={20}
                                type=""
                                width='372px'
                            />
                            <CardInfo 
                                icon=''
                                title="Total de novas ocorrências (hoje)"
                                value={10}
                                type=""
                                width='372px'
                            />
                            <CardInfo 
                                icon=''
                                title="Total de ocorrências aprovadas (hoje)"
                                value={10}
                                type=""
                                width='372px'
                            />
                            <CardInfo 
                                icon=''
                                title="Total de ocorrências reprovadas (hoje)"
                                value={0}
                                type=""
                                width='372px'
                            />
                        </S.StatusBox>
                        <p>
                            Gráfico de ocorrências - <b>RJ, Rio de Janeiro, Duque de Caxias | De 11/11/21 até 11/01/22</b>
                        </p>
                        <S.GraficItemContainer>
                            <CardGraficItem 
                                list={card.list}
                                title={card.title}
                                value='325'
                                icon={energiIcon}
                                id="energia"
                            />

                            <CardGraficItem 
                                list={card2.list}
                                title={card2.title}
                                value='55'
                                icon={whaterIcon}
                                id="agua"
                            />

                            <CardGraficItem 
                                list={card3.list}
                                title={card3.title}
                                value='25'
                                icon={wifiIcon}
                                id="wifi"
                            />

                            <CardGraficItem 
                                list={card4.list}
                                title={card4.title}
                                value='155'
                                icon={gasIcon}
                                id="gas"
                            />
                        </S.GraficItemContainer>
                    </>
                )}
                {users == true && (
                    <Box padding='24px 20px'>
                        <h1>users</h1>   
                        <MultSelect 
                            valueItem={multValue}
                            onChange={(e) => {
                                setMultValue(e)
                            }}
                        />                 
                    </Box>
                )}
            </S.Container>
        </>
    );
};

export default Dashboard;