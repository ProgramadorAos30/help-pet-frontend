import React, { useEffect, useState } from 'react';
import * as S from './style';
import { 
    DoubleButton,
    DefaultButton,
    PersonalModal,
    CardInfo,
    Box,
    CustomSelect,
    CustomInput,
    Search
} from '../../components';
import { useOccurrences } from '../../services/index';
import NewOccurence from './newOccurence';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { ocurrenceIcon } from '../../assets/index';
import {
    options,
    iconShow,
    energiIcon,
    whaterIcon,
    wifiIcon
} from '../../assets/index';

const Registros: React.FC = () => {
    const { token } = useSelector((state : RootState) => state.clickState);
    const { 
        data: occurrences, 
        isLoading: loadOccurrences,
        refetch: fetchOccurrences
    } = useOccurrences(token);
    const [ maps, setMaps ] = useState(true);
    const [ list, setList ] = useState(false);
    const [ open, setOpen ] = useState(false);
    const [ icon, setIcon ] = useState('');
    const [ openList, setOpenList ] = useState(false);
    
    console.log(occurrences);

    let lista = [
        {label: 'Pesquisar 1', value: 'pesquisa1'},
        {label: 'Pesquisar 2', value: 'pesquisa2'},
        {label: 'Pesquisar 3', value: 'pesquisa3'},
        {label: 'Pesquisar 4', value: 'pesquisa4'},
        {label: 'Pesquisar 5', value: 'pesquisa5'},
        {label: 'Pesquisar 6', value: 'pesquisa6'},
    ];

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
                    onSelect={() => setOpen(!open)}
                    text="Registrar ocorrência"
                />
            </S.Header>
            {maps == true && (
                <>
                    <h1>mapa</h1>
                </>
            )}
            {list == true && (
                <>
                    <S.CardsContainer>
                        <CardInfo 
                            icon={ocurrenceIcon}
                            title="Total"
                            value={20}
                            type="list"
                            width='273px'
                            list={lista}
                            open={openList}
                            setOpen={() => setOpenList(!openList)}
                        />
                        <CardInfo 
                            title="Sul"
                            value={20}
                            type="list"
                            width='236px'
                            list={lista}
                            open={openList}
                            setOpen={() => setOpenList(!openList)}
                        />
                        <CardInfo 
                            title="Norte"
                            value={20}
                            type="list"
                            width='236px'
                            list={lista}
                            open={openList}
                            setOpen={() => setOpenList(!openList)}
                        />
                        <CardInfo 
                            title="Sudeste"
                            value={20}
                            type="list"
                            width='236px'
                            list={lista}
                            open={openList}
                            setOpen={() => setOpenList(!openList)}
                        />
                        <CardInfo 
                            title="Nordeste"
                            value={20}
                            type="list"
                            width='236px'
                            list={lista}
                            open={openList}
                            setOpen={() => setOpenList(!openList)}
                        />
                        <CardInfo 
                            title="Centro-Oeste"
                            value={20}
                            type="list"
                            width='236px'
                            list={lista}
                            open={openList}
                            setOpen={() => setOpenList(!openList)}
                        />
                    </S.CardsContainer>
                    <Box
                        padding='0'
                        width='1548px'
                    >
                        <S.Container>
                            <h1>Ocorrências registradas no aplicativo</h1>
                            <S.FiltersTop>
                                <CustomSelect 
                                    onChange={function (e: any) {
                                        throw new Error('Function not implemented.');
                                    } } 
                                    label='Selecione o Estado'
                                    labelDefault='Estado'
                                    list={lista} 
                                    value=''
                                    width={254}
                                />
                                <CustomSelect 
                                    onChange={function (e: any) {
                                        throw new Error('Function not implemented.');
                                    } } 
                                    label='Selecione a Cidade'
                                    labelDefault='Cidade'
                                    list={lista} 
                                    value=''
                                    width={254}
                                />
                                <CustomSelect 
                                    onChange={function (e: any) {
                                        throw new Error('Function not implemented.');
                                    } } 
                                    label='Selecione o Bairro'
                                    labelDefault='Bairro'
                                    list={lista} 
                                    value=''
                                    width={254}
                                />
                                <CustomSelect 
                                    onChange={function (e: any) {
                                        throw new Error('Function not implemented.');
                                    } } 
                                    label='Selecione o Bairro'
                                    labelDefault='Bairro'
                                    list={lista} 
                                    value=''
                                    width={254}
                                />
                                <CustomInput 
                                    label='De' 
                                    onChange={function (e: any) {
                                    throw new Error('Function not implemented.');
                                    } } 
                                    onBlur={function (e: any) {
                                    throw new Error('Function not implemented.');
                                    } } 
                                    type={'date'} 
                                    value={undefined} 
                                    width={176}                                
                                />
                                <CustomInput 
                                    label='Até' 
                                    onChange={function (e: any) {
                                    throw new Error('Function not implemented.');
                                    } } 
                                    onBlur={function (e: any) {
                                    throw new Error('Function not implemented.');
                                    } } 
                                    type={'date'} 
                                    value={undefined} 
                                    width={176}                                
                                />
                            </S.FiltersTop>
                            <S.FiltersBottom>
                                <Search onChange={() => {}} width="400px"/>
                                <S.Radios>
                                    <p>Status:</p>
                                    <div>
                                        <input type="radio" name="status" id="todos" defaultChecked/>
                                        <label htmlFor="todos" >Todos</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="status" id="aproved"/>
                                        <label htmlFor="aproved">Aprovado</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="status" id="reproved"/>
                                        <label htmlFor="reproved">Reprovado</label>
                                    </div>
                                    <div>
                                        <input type="radio" name="status" id="await"/>
                                        <label htmlFor="await">Aguardando aprovação</label>
                                    </div>
                                </S.Radios>
                            </S.FiltersBottom>
                            <S.Table>
                                <S.TableHead>
                                    <tr>
                                        <th style={{width: '218px'}}>Serviço interrompido</th>
                                        <th style={{width: '218px'}}>Registrado por</th>
                                        <th style={{width: '179px'}}>Horá da ocorrência</th>
                                        <th style={{width: '358px'}}>Endereço</th>
                                        <th style={{width: '207px'}}>Status ocorrência</th>
                                        <th style={{width: '150px'}}>Já foi finalizada?</th>
                                        <th style={{width: '85px'}}>Ações</th>
                                        <th style={{width: '135px'}}>Ver no mapa</th>
                                    </tr>
                                </S.TableHead>
                                <S.TableBody>
                                    {occurrences?.map((id: any) => {
                                        return (
                                            <tr>
                                                <td>
                                                    <img src={icon} alt="" />
                                                    {id.service.name}
                                                </td>
                                                <td>{id.user.name}</td>
                                                <td>{id.updatedAt}</td>
                                                <td>{id.address}</td>
                                                <td>{id.status}</td>
                                                <td>{id.finished_status}</td>
                                                <td>
                                                    <button>
                                                        <img src={options} alt="" />
                                                    </button>
                                                </td>
                                                <td>
                                                    <button>
                                                        <img src={iconShow} alt="" />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </S.TableBody>
                            </S.Table>
                        </S.Container>
                    </Box>
                </>
            )}

            <PersonalModal 
                width={1604}
                open={open}
                onClose={() => setOpen(!open)}
                children={<NewOccurence/>}
            />
        </>
    )
}

export default Registros;