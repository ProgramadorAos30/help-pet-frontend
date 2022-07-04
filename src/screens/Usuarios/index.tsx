import React, { useEffect, useState } from 'react';
import * as S from './style';
import NewUser from './NewUser';
import {
    CardInfo,
    CustomSelect,
    DefaultButton,
    DoubleButton,
    PersonalModal,
    Search,
    Pagination,
    CustomTolltip,
} from '../../components';
import { useUf, useUsers } from '../../services';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores';
import {
    iconShow,
    ocurrenceIcon,
    alertDark,
    trusted,
    noTrusted,
    options,
    registers,
} from '../../assets';
import { ThemeProvider } from 'styled-components';
import { Console } from 'console';
import { number } from 'yup/lib/locale';

const Usuarios: React.FC = () => {
    const { token } = useSelector((state: RootState) => state.clickState);
    const { data: users } = useUsers(token);
    const { data: uf } = useUf()
    const [openTotalList, setOpenTotalList] = useState(false);
    const [openSulList, setOpenSulList] = useState(false);
    const [openNorteList, setOpenNorteList] = useState(false);
    const [openSudesteList, setOpenSudesteList] = useState(false);
    const [openNordesteList, setOpenNordesteList] = useState(false);
    const [openCentroList, setOpenCentroList] = useState(false);
    const [open, setOpen] = useState(false);
    const [app, setApp] = useState(true);
    const [panel, setPanel] = useState(false);
    const [ allUsersList, setAllUsersList ] = useState<any>([])
    const [region_list, setRegion_list] = useState(false);

    let lista = [
        { label: 'Rio de janeiro', value: 'Rio de janeiro', number: 1 },
        { label: 'Pesquisar 2', value: 'pesquisa2', number: 2 },
        { label: 'Pesquisar 3', value: 'pesquisa3', number: 3 },
        { label: 'Pesquisar 4', value: 'pesquisa4', number: 4 },
        { label: 'Pesquisar 5', value: 'pesquisa5', number: 5 },
        { label: 'Pesquisar 6', value: 'pesquisa6', number: 5 },
        
    ];

    // let region_list: [{
    //         name: 'sul',
    //         state_list: [
    //         {
    //             name: 'Rio Grande do Sul',
    //             user_total: 100, 
    //         },
    //         {
    //             name: 'Santa Catarina',
    //             user_total: 200,
    //         },
    //         {
    //             name: 'Parana',
    //             user_total: 300,
    //         }]},
    //         {
    //         name: 'Sudeste',
    //         state_list: [{
    //             name: 'Rio de Janeiro',
    //             user_total: 400, 
    //         },
    //         {
    //             name: 'São Paulo',
    //             user_total: 500,
    //         },
    //         {
    //             name: 'Minas Gerais',
    //             user_total: 600,
    //         }],
    //     }],

    // macro
    // fazer uma lista de todos os estados com todas quantidades, incluido o total
    // fazer uma lista de cada região, apresentando cada estado da região e suas quantidades, incluido o total

    // somar todos os estados iguais dos user antes de fazer a comparação com a do ibge

    //mini
    // fazer a quantidade de cada estado
    // separar os estados com as regiões

    // useEffect(() =>{

    //     let spam:any = []

    //     region_list?.forEach((r) =>{
    //         console.log(r.name + "teste")
    //         spam.push({
    //             estado: r.name,
    //         })
    //     })

    //     // passar por todo o array, e pegar os dados

    //     //pegar o nome da regiao + a quantidade total

    //     //pegar o nome do estado + a quantidade

    //     //devolver em um array

    //     setMapEstadoUserQTD(spam)
    // },[])

    const [ mapEstados, setMapEstados ] = useState<any>()
 
    const [ mapRegiao, setMapRegiao ] = useState<any>()
   
    const [ mapEstadoUser, setMapEstadoUser ] = useState<any>()
  
    const [ mapEstadoUserQTD, setMapEstadoUserQTD ] = useState<any>()

    console.log(mapEstados,mapRegiao,mapEstadoUser,mapEstadoUserQTD , 'teste')

    //setMapEstados
        useEffect(() =>{ 
            let spam: any = []

            uf?.forEach((e) =>{
                spam.push({
                    estado: e.nome,
                    estadoSigla: e.sigla,
                    regiao: e.regiao.nome,
                    qtd: 1
                })
            })

            setMapEstados(spam)
    }, [])

    // setMapRegiao
    // useEffect(() =>{ 
        
    //     let spam: any = []
    //     uf?.forEach((e) =>{
    //         spam.push({
    //             regiao: e.regiao.nome,
    //             qtd: 1
    //         })
    //     })

    //     let novoLista = [];
    //     let m = new Map();

    //     //para todas as regiões repetidas...
    //     for(let reg of spam){
    //         //verifica se indice contiver a chave reg.regiao...
    //         if (m.has(reg.regiao)){
    //             //no item indexado por reg.registro no array novaLista incrementa na lista
    //             novoLista[m.get(reg.regiao)].qtd += reg.qtd;
    //         } else {
    //             //Cria um índice nomeado pelo valor de prod.nome apontando para o mais novo elemento do array novoLista
    //             m.set(reg.regiao, novoLista.push({
    //                 regiao:reg.regiao,
    //                 qtd:reg.qtd}) - 1);
    //         }
    //     }
    //     setMapRegiao(novoLista)
    // }, [])

    // //setMapEstadoUser
    // useEffect(()=>{
    //     let estadoUser: any = []
    //     users?.forEach((u) =>{
    //         estadoUser.push({
    //             estado: "",
    //             estadoSigla: u.state,
    //             regiao: "",
    //             qtd: 1
    //         })
    //     })
    //     let novoLista = [];
    //     let m = new Map();
    //     //Para todos os elementos de listaProdutos...
    //     for(let prod of estadoUser){
    //         //Verifica se índice contiver a chave prod.nome...
    //         if (m.has(prod.estadoSigla)){
    //             //No item indexado por prod.nome no array novoLista incrementa o preço registrado com o novo preço.
    //              novoLista[m.get(prod.estadoSigla)].qtd += prod.qtd;                          
    //         } else {
    //             //Cria um índice nomeado pelo valor de prod.nome apontando para o mais novo elemento do array novoLista
    //             m.set(prod.estadoSigla, novoLista.push({
    //                 estadoSigla:prod.estadoSigla,
    //                 qtd:prod.qtd}) - 1); 
    //       }
    //     } 
    //     setMapEstadoUser(novoLista)    

    //     let estado: any = []
    //         uf?.forEach((e) =>{
    //             estado.push({
    //                 estado: e.nome,
    //                 estadoSigla: e.sigla,
    //                 regiao: e.regiao.nome,
    //                 qtd: 1
    //             })
    //         })

    //     setMapEstados(estado) 

    //     const estado
        
    //     const estadoUser = [].concat(estado)

    //     estadoUser.push(mapEstadoUser)

    //     console.log(arr1) //[ {fruta:"abacaxi"}, {fruta:"damasco"}, {fruta:"cereja"} ]

    //     console.log(arr2)
    //     setMapEstadoUserQTD(jsonResult)

    // },[])  


    return (
        <>
            <S.Nav>
                <div>
                    <DoubleButton 
                        id="ButtonUsuarioApp"
                        text='Usuários do aplicativo'
                        selected={app}
                        onSelect={() => {
                            setApp(true)
                            setPanel(false)
                        }}
                    />
                    <DoubleButton 
                        id="ButtonUsuarioPainel"
                        text='Usuários do painel'
                        selected={panel}
                        onSelect={() => {
                            setApp(false)
                            setPanel(true)
                        }}
                    />
                </div>
                {panel === true && (
                    <DefaultButton 
                        id="ButtonCadastrarMod"
                        onSelect={() => setOpen(!open)}
                        text="Cadastrar moderador"
                    />
                )}
            </S.Nav>
            <>
                {app === true && (
                    <>
                        <S.CardList>
                            <CardInfo
                                icon={ocurrenceIcon}
                                title="Total"/*{/*ExTotal.label}*/
                                value={20/*ExTotal.number*/}
                                type="list"
                                width='273px'
                                list={lista}
                                open={openTotalList}
                                setOpen={() => setOpenTotalList(!openTotalList)}
                            />
                            <CardInfo
                                title="Sul"
                                value={20}
                                type="list"
                                width='236px'
                                list={lista}
                                open={openSulList}
                                setOpen={() => setOpenSulList(!openSulList)}
                            />
                            <CardInfo
                                title="Norte"
                                value={20}
                                type="list"
                                width='236px'
                                list={lista}
                                open={openNorteList}
                                setOpen={() => setOpenNorteList(!openNorteList)}
                            />
                            <CardInfo
                                title="Sudeste"
                                value={20}
                                type="list"
                                width='236px'
                                list={lista}
                                open={openSudesteList}
                                setOpen={() => setOpenSudesteList(!openSudesteList)}
                            />
                            <CardInfo
                                title="Nordeste"
                                value={20}
                                type="list"
                                width='236px'
                                list={lista}
                                open={openNordesteList}
                                setOpen={() => setOpenNordesteList(!openNordesteList)}
                            />
                            <CardInfo
                                title="Centro-Oeste"
                                value={20}
                                type="list"
                                width='236px'
                                list={lista}
                                open={openCentroList}
                                setOpen={() => setOpenCentroList(!openCentroList)}
                            />
                        </S.CardList>
                        <S.ContainerListApp>
                            <S.SearchInputs>
                                <p>Usuários cadastrados no aplicativo</p>
                                <div>
                                    <Search
                                        onChange={(e) => {
                                            console.log(e.target.value)
                                        }}
                                        width='409px'
                                    />

                                    <CustomSelect
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                        }}
                                        label='Raça'
                                        labelDefault='Raça'
                                        list={undefined}
                                        value=''
                                        width={176}
                                    />
                                    <CustomSelect
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                        }}
                                        label='Genero'
                                        labelDefault='Genero'
                                        list={undefined}
                                        value=''
                                        width={176}
                                    />
                                    <CustomSelect
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                        }}
                                        label='Estado'
                                        labelDefault='Estado'
                                        list={undefined}
                                        value='Todos os Estados'
                                        width={176}
                                    />
                                </div>
                            </S.SearchInputs>

                            <S.Table>
                                <S.TableHead>
                                    <tr>    
                                        <th style={{ width: '246px',}}>
                                            <span style={{marginLeft: '24px'}}>
                                                Nome / Apelido
                                                <button>
                                                    <img src={iconShow} alt="" />
                                                </button>
                                            </span>
                                        </th>
                                        <th style={{ width: '173px',}}>
                                            <span>
                                                Whatsapp
                                            </span>
                                        </th>
                                        <th style={{ width: '216px',}}>
                                            <span>
                                                E-mail
                                            </span>
                                        </th>
                                        <th style={{ width: '192px',}}>
                                            <span>
                                                Estado
                                                <button>
                                                    <img src={iconShow} alt="" />
                                                </button>
                                            </span>
                                        </th>
                                        <th style={{ width: '195px', }}>
                                            <span >
                                                Cidade
                                                <button>
                                                    <img src={iconShow} alt="" />
                                                </button>
                                            </span>
                                        </th>
                                        <th style={{ width: '191px', }}>
                                            <span>
                                                Status
                                                <button>
                                                    <img src={iconShow} alt="" />
                                                </button>
                                            </span>
                                        </th>
                                        <th style={{ width: '209px', }}>
                                            <span>
                                                Confiabilidade
                                                <span>
                                                    <CustomTolltip
                                                        title={<img src={alertDark} alt="" />}
                                                        desciption="Usuários que são marcados como não confiáveis precisarão passar pela aprovação dos moderadores antes de serem publicadas"
                                                    />
                                                </span>
                                            </span>
                                        </th>
                                        <th style={{ width: 'auto' }}>
                                            <span style={{ marginRight: '64px' }}>
                                                Ações
                                            </span>
                                        </th>
                                    </tr>
                                </S.TableHead>
                                {users?.map((id: any) => {
                                    return (
                                        <tbody>
                                            {id.role === 'Mobile' && (
                                                <tr>
                                                    <td style={{ width: '246px', }}>
                                                        <span style={{marginLeft: '24px'}}>
                                                            {id.name}
                                                        </span>
                                                    </td>
                                                    <td style={{ width: '173px', }}>
                                                        <span>
                                                            {id.phone_number}
                                                        </span>
                                                    </td>
                                                    <td style={{ width: '216px', }}>
                                                        <span>
                                                            {id.email}
                                                        </span>
                                                    </td>
                                                    <td style={{ width: '192px', }}>
                                                        <span>
                                                            {id.state}
                                                        </span>
                                                    </td>
                                                    <td style={{ width: '195px', }}>
                                                        <span>
                                                            {id.city}
                                                        </span>
                                                    </td>
                                                    <td style={{ width: '191px', }}>
                                                        <S.Active active={id.active}>
                                                            {id.active === true ? "Ativo" : "Inativo"}
                                                        </S.Active>
                                                    </td>
                                                    <td style={{ width: '209px', }}>
                                                        <S.Trusted trusted={id.trusted}>
                                                            <img width="20px" src={id.trusted === true ? trusted : noTrusted} alt={id.trusted === true ? "Confiável" : "Não confiável"} />
                                                            {id.trusted === true ? "Confiável" : "Não confiável"}
                                                        </S.Trusted>
                                                    </td>
                                                    <td style={{ width: 'auto' }}>
                                                        <span>
                                                            <S.Options>
                                                                <img src={options} alt="Opções" />
                                                            </S.Options>
                                                        </span>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    )
                                })}
                            </S.Table>

                        </S.ContainerListApp>
                    </>

                )}

                {panel === true && (
                    <>
                        <S.ContainerListApp>
                            <S.SearchInputs>
                                <p>Usuários cadastrados no painel</p>
                                <Search
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                    }}
                                    width='822px'
                                />
                            </S.SearchInputs>
                            <div>
                            </div>
                            
                            <S.Table>
                                <S.TableHead>
                                    <tr>
                                        <th style={{ width: '367px', }}>
                                            <span style={{ marginLeft: '24px' }}>
                                                Nome do moderador
                                                <button>
                                                    <img src={iconShow} alt="" />
                                                </button>
                                            </span>
                                        </th>
                                        <th style={{ width: '168px', }}>
                                            <span>
                                                Whatsapp
                                            </span>
                                        </th>
                                        <th style={{ width: '362px', }}>
                                            <span>
                                                E-mail
                                            </span>
                                        </th>
                                        <th style={{ width: '181px', }}>
                                            <span>
                                                Estado
                                                <button>
                                                    <img src={iconShow} alt="" />
                                                </button>
                                            </span>
                                        </th>
                                        <th style={{ width: '198px', }}>
                                            <span>
                                                Cidade
                                                <button>
                                                    <img src={iconShow} alt="" />
                                                </button>
                                            </span>
                                        </th>
                                        {/* <th style={{ width: '239px' }}>
                                            <span>
                                                Tipo de acesso
                                            </span>
                                        </th> */}
                                        <th style={{ width: '147px', }}>
                                            <span>
                                                Status
                                                <button>
                                                    <img src={iconShow} alt="" />
                                                </button>
                                            </span>
                                        </th>
                                        <th style={{ width: 'auto' }}>
                                            <span style={{ marginRight: '64px' }}>
                                                Ações
                                            </span>
                                        </th>
                                    </tr>
                                </S.TableHead>
                                {users?.map((id: any) => {
                                    return (
                                        <tbody>
                                            {id.role === 'Administrador' && (
                                                <tr>
                                                    <td style={{ width: '367px', }}>
                                                        <span  style={{ marginLeft: '24px' }}>
                                                            {id.name}
                                                        </span>
                                                    </td>
                                                    <td style={{ width: '168px', }}>
                                                        <span>
                                                            {id.phone_number}
                                                        </span>
                                                    </td>
                                                    <td style={{ width: '358px', }}>
                                                        <span>
                                                            {id.email}
                                                        </span>
                                                    </td>
                                                    <td style={{ width: '181px', }}>
                                                        <span>
                                                            {id.state}
                                                        </span>
                                                    </td>
                                                    <td style={{ width: '198px', }}>
                                                        <span>
                                                            {id.city}
                                                        </span>
                                                    </td>
                                                    {/* <S.Role role={id.role}  style={{ width: '239px' }}>
                                                        <span>
                                                            {id.role === "Administrador" ? `${id.role}` : `${id.role}`}
                                                        </span>
                                                    </S.Role> */}
                                                    <td style={{ width: '147px', }}>
                                                        <S.Active active={id.active}>
                                                            {id.active === true ? "Ativo" : "Inativo"}
                                                        </S.Active>
                                                    </td>
                                                    <td style={{ width: 'auto' }}>
                                                        <span>
                                                            <S.Options>
                                                                <img src={options} alt="Opções" />
                                                            </S.Options>
                                                        </span>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    )
                                })}
                            </S.Table>
                        </S.ContainerListApp>

                    </>
                )}
            </>
        
            <Pagination />
            <NewUser 
            isModal={open}
            onClose={() => setOpen(!open)}
            />
        </>

    )
}

export default Usuarios;