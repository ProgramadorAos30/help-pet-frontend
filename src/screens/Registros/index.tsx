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
    Search,
    TolltipRigth,
    MultSelect,
    Pagination,
} from '../../components';
import { convertDate, useCity, useOccurrences, useService, useUf } from '../../services/index';
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
import { UseQueryResult } from 'react-query';

const Registros: React.FC = () => {
    const { token } = useSelector((state: RootState) => state.clickState);

    const [openList, setOpenList] = useState(false);
    const [maps, setMaps] = useState(true);
    const [list, setList] = useState(false);
    const [open, setOpen] = useState(false);
    const [newOccurence, setNewOccurence] = useState(false);
    const [listServices, setListServices] = useState<any>();
    const [page, setPage] = useState<number>(1);
    const [status, setStatus] = useState<any>(undefined);
    const [service, setService] = useState<string[]>([]);
    const [address, setAddress] = useState<any>();
    const [ufValue, setUfValue] = useState<any>();
    const [cityValue, setCityValue] = useState<any>();
    const [initialDate, setInitialDate] = useState<any>(undefined);
    const [finalDate, setFinalDate] = useState<any>(undefined)

    const {
        data: occurrences,
        isLoading: loadOccurrences,
        refetch: fetchOccurrences,
        isFetched: isFetchedOccurence
    } = useOccurrences(
        token,
        'DESC',
        page,
        10,
        status,
        service,
        address,
        ufValue,
        cityValue,
        undefined,
        initialDate,
        finalDate
    );
    const { data: dataServices } = useService(token);
    const { data: dataUf } = useUf();
    const { data: dataCity } = useCity(ufValue);

    let lista = [
        { label: 'Pesquisar 1', value: 'pesquisa1' },
        { label: 'Pesquisar 2', value: 'pesquisa2' },
        { label: 'Pesquisar 3', value: 'pesquisa3' },
        { label: 'Pesquisar 4', value: 'pesquisa4' },
        { label: 'Pesquisar 5', value: 'pesquisa5' },
        { label: 'Pesquisar 6', value: 'pesquisa6' },
    ];

    function setStatusName(status: string) {
        if (status == "Waiting") {
            return 'Aguardando aprovação'
        } else if (status == "Approved") {
            return 'Aprovado'
        } else if (status == "Reproved") {
            return "Reprovado"
        } else {
            return status
        }
    };

    useEffect(() => {
        let obj: string[] = [];
        dataServices?.forEach((id: any) => {
            obj.push(id.name)
        })
        setListServices(obj)

    }, [dataServices]);

    console.log(initialDate, finalDate, 'date');


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
                                    onChange={(e) => {
                                        setUfValue(e.target.value)
                                        console.log(e.target.value);

                                    }}
                                    label='Selecione o Estado'
                                    labelDefault='Estado'
                                    list={dataUf}
                                    value={ufValue}
                                    width={254}
                                />
                                <CustomSelect
                                    onChange={(e) => {
                                        setCityValue(e.target.value)
                                    }}
                                    label='Selecione a Cidade'
                                    labelDefault='Cidade'
                                    list={dataCity}
                                    value={cityValue}
                                    width={254}
                                />
                                <CustomSelect
                                    onChange={function (e: any) {
                                        throw new Error('Function not implemented.');
                                    }}
                                    label='Selecione o Bairro'
                                    labelDefault='Bairro'
                                    list={lista}
                                    value=''
                                    width={254}
                                />
                                <MultSelect
                                    width={228}
                                    list={listServices}
                                    onChange={(e: any) => {
                                        setService(e)
                                    }}
                                    valueItem={service}
                                />
                                <CustomInput
                                    label='De'
                                    onChange={(e: any) => {
                                        setInitialDate(e.target.value)
                                        console.log(e.target.value)
                                    }}
                                    onBlur={() => { }}
                                    type='datetime-local'
                                    value={initialDate}
                                    width={176}
                                />
                                <CustomInput
                                    label='Até'
                                    onChange={(e: any) => {
                                        setFinalDate(e.target.value)
                                    }}
                                    onBlur={function (e: any) {
                                        throw new Error('Function not implemented.');
                                    }}
                                    type='datetime-local'
                                    value={finalDate}
                                    width={176}
                                />
                            </S.FiltersTop>
                            <S.FiltersBottom>
                                <Search
                                    onChange={(e: any) => {
                                        setAddress(e.target.value);
                                    }}
                                    width="400px"
                                />
                                <S.Radios>
                                    <p>Status:</p>
                                    <div>
                                        <input
                                            onChange={() => setStatus(undefined)}
                                            value={status}
                                            type="radio"
                                            name="status"
                                            id="todos"
                                            defaultChecked
                                        />
                                        <label htmlFor="todos" >Todos</label>
                                    </div>
                                    <div>
                                        <input
                                            onChange={() => setStatus('Yes')}
                                            value={status}
                                            type="radio"
                                            name="status"
                                            id="aproved"
                                        />
                                        <label htmlFor="aproved">Aprovado</label>
                                    </div>
                                    <div>
                                        <input
                                            onChange={() => setStatus('No')}
                                            value={status}
                                            type="radio"
                                            name="status"
                                            id="reproved"
                                        />
                                        <label htmlFor="reproved">Reprovado</label>
                                    </div>
                                    <div>
                                        <input
                                            onChange={() => setStatus('Abandoned')}
                                            value={status}
                                            type="radio"
                                            name="status"
                                            id="Abandoned"
                                        />
                                        <label htmlFor="Abandoned">Aguardando aprovação</label>
                                    </div>
                                </S.Radios>
                            </S.FiltersBottom>
                            <S.Table>
                                <S.TableHead>
                                    <tr>
                                        <th style={{ width: '218px' }}>
                                            <span>
                                                Serviço interrompido
                                                <button>
                                                    <img src={iconShow} alt="" />
                                                </button>
                                            </span>
                                        </th>
                                        <th style={{ width: '218px' }}>
                                            <span>
                                                Registrado por
                                                <button>
                                                    <img src={iconShow} alt="" />
                                                </button>
                                            </span>
                                        </th>
                                        <th style={{ width: '179px' }}>
                                            <span>
                                                Horá da ocorrência
                                            </span>
                                        </th>
                                        <th style={{ width: '358px' }}>
                                            <span>
                                                Endereço
                                            </span>
                                        </th>
                                        <th style={{ width: '207px' }}>
                                            <span>
                                                Status ocorrência
                                                <button>
                                                    <img src={iconShow} alt="" />
                                                </button>
                                            </span>
                                        </th>
                                        <th style={{ width: '150px' }}>
                                            <span>
                                                Já foi finalizada?
                                            </span>
                                        </th>
                                        <th style={{ width: '85px' }}>
                                            <span>
                                                Ações
                                            </span>
                                        </th>
                                        <th style={{ width: '135px' }}>
                                            <span>
                                                Ver no mapa
                                            </span>
                                        </th>
                                    </tr>
                                </S.TableHead>
                                <S.TableBody>
                                    {/* @ts-ignore */}
                                    {occurrences?.data.map((id: any) => {
                                        return (
                                            <tr>
                                                <td style={{ width: '218px' }}>
                                                    <span>
                                                        <S.Icon backgroundColor={id.service.background_color}    >
                                                            <img src={id.service.image} alt="" />
                                                        </S.Icon>
                                                        {id.service.name}
                                                    </span>
                                                </td>
                                                <S.User>
                                                    <span>
                                                        {id?.user?.name}
                                                        <TolltipRigth trusted={id?.user?.trusted} />
                                                    </span>
                                                </S.User>
                                                <td style={{ width: '179px' }}>
                                                    <span>
                                                        {convertDate(id.updatedAt)}
                                                    </span>
                                                </td>
                                                <td style={{ width: '358px' }}>
                                                    <span>
                                                        {id.address}
                                                    </span>
                                                </td>
                                                <S.Status status={id.status}>
                                                    <span>
                                                        <p>
                                                            {setStatusName(id.status)}
                                                        </p>
                                                    </span>
                                                </S.Status>
                                                <S.Finished finished={id.finished_status}>
                                                    <span>
                                                        <p>
                                                            {id.finished_status}
                                                        </p>
                                                    </span>
                                                </S.Finished>
                                                <S.Button showOccurence={false} style={{ width: '83px' }}>
                                                    <span>
                                                        <button>
                                                            <img src={options} alt="" />
                                                        </button>
                                                    </span>
                                                </S.Button>
                                                <S.Button showOccurence={true} style={{ width: '135px' }}>
                                                    <span>
                                                        <button>
                                                            <img src={iconShow} alt="" />
                                                        </button>
                                                    </span>
                                                </S.Button>
                                            </tr>
                                        )
                                    })}
                                </S.TableBody>
                            </S.Table>
                        </S.Container>
                    </Box>
                    <Pagination />
                    <S.ContainerBtn>
                        <S.PrevNext
                            to="prev"
                            onClick={() => {
                                let cont = page - 1;
                                setPage(cont);
                            }}
                            disabled={page === 1 ? true : false}
                        >
                            <img src={iconShow} alt="" />
                        </S.PrevNext>
                        <S.AtualPage>{page}</S.AtualPage>
                        <S.Page>{page + 1}</S.Page>
                        <S.Page>{page + 2}</S.Page>
                        <S.Page>{page + 3}</S.Page>
                        <S.PrevNext
                            to="next"
                            onClick={() => {
                                let cont = page + 1;
                                setPage(cont);
                            }}
                        >
                            <img src={iconShow} alt="" />
                        </S.PrevNext>
                    </S.ContainerBtn>
                </>
            )}

            <NewOccurence
                isModal={newOccurence}
                onHide={() => {
                    setNewOccurence(!newOccurence)
                    fetchOccurrences()
                }}
            />

            {/* <PersonalModal 
                modalBackground={true}
                width={1604}
                padding={4}
                open={open}
                onClose={() => setOpen(!open)}
                children={<NewOccurence/>}
            /> */}
        </>
    )
}

export default Registros;