import React, { useEffect, useState } from 'react';
import * as S from './style';
import NewUser from './NewUser';
import EditUser from './EditUser';
import {
    CardInfo,
    CustomSelect,
    DefaultButton,
    DoubleButton,
    PersonalModal,
    Search,
    Pagination,
    CustomTolltip,
    Poppover,
    ModalDelete,
    ModalMsg,
} from '../../components';
import { 
    api, 
    useUf, 
    queryClient, 
    useUsers,
    useDashboardRegionList,
} from '../../services';
import { useSelector } from 'react-redux';
import { RootState } from '../../stores';
import { useMutation } from 'react-query';
import {
    iconShow,
    alertDark,
    trusted,
    noTrusted,
    //userIcon
} from '../../assets';
import {regex} from '../../services/functions/regex'

const Usuarios: React.FC = () => {
    const { token } = useSelector((state: RootState) => state.clickState);
    const { data: uf, isLoading: loadingUf } = useUf();
    const { data: regionUsers } = useDashboardRegionList(token);
    console.log(regionUsers, "teste")

    const [ idUser, setIdUser ] = useState('');
    const [ objUser, setObjUser ] = useState<any>(null);

    const [totalList, setTotalList] = useState<any>();

    const [openTotalList, setOpenTotalList] = useState(false);
    const [openSulList, setOpenSulList] = useState(false);
    const [openNorteList, setOpenNorteList] = useState(false);
    const [openSudesteList, setOpenSudesteList] = useState(false);
    const [openNordesteList, setOpenNordesteList] = useState(false);
    const [openCentroList, setOpenCentroList] = useState(false);

    const [open, setOpen] = useState(false);
    const [app, setApp] = useState(true);
    const [panel, setPanel] = useState(false);
    const [editUser, setEditUser] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [showDelete, setShowDelete ] = useState(false);
    const [showSuccess, setShowSuccess ] = useState(false);
    const [regexPhone, setRegexPhone] = useState('');

    const [ page, setPage ] = useState<number>(1);
    const [ user, setUser] = useState<any>();
    const [ genre, setGenre ] = useState<any>();
    const [ breed, setBreed] = useState<any>();
    const [ ufValue, setUfValue ] = useState<any>();
    const [ role, setRole] = useState<any>();

    const {
        data: users,
        isLoading: loadUsers,
        refetch: refetch,
        isFetched: isFetchedUsers,
    } = useUsers(
        token,
        'DESC',
        page,
        100,
        user,
        ufValue,
        genre,
        breed,
        role,
    );

    // console.log('pagina  -  ', page)
    // console.log('user  -  ', user)
    // console.log('ufValue  -  ', ufValue)
    // console.log('genre  -  ', genre)
    // console.log('breed  -  ', breed)
    // console.log('role  -  ', role)

    // useEffect(() => {

    //     let spam:any = []
    //     regionUsers?.forEach((e) =>{

    //         let estados e.forEach(id => {
                
    //         });

    //         let cont = e.user_total
    //         spam.push({
    //             estado: e.state_list,
    //             // estadoSigla: e.sigla,
    //             // regiao: e.regiao.nome,
    //             qtd: e.user_total
    //         })
    //     })
    //     setTotalList(spam)
    // },[])

    console.log ('regiões', totalList)

    let lista = [
        { label: 'Rio de janeiro', value: 'Rio de janeiro', number: 1 },
        { label: 'Pesquisar 2', value: 'pesquisa2', number: 2 },
        { label: 'Pesquisar 3', value: 'pesquisa3', number: 3 },
        { label: 'Pesquisar 4', value: 'pesquisa4', number: 4 },
        { label: 'Pesquisar 5', value: 'pesquisa5', number: 5 },
        { label: 'Pesquisar 6', value: 'pesquisa6', number: 5 },
    ];

    let listaRaça = [
        { label: 'Humana', value: 'Humana' },
        { label: 'Barata', value: 'Barata'},
        { label: 'Mosquito', value: 'Mosquito'},
        { label: 'Golfinho', value: 'Golfinho'},
    ];
    
    let listaGenero = [
        { label: 'Heterosexual', value: 'Hetero' },
        { label: 'Homosexual', value: 'Homosexual'},
        { label: 'Pansexual', value: 'Pansexual'},
        { label: 'Bisexual', value: 'Bisexual'},
    ];

    const deleteUser = async (id: string) => {
        const data = await api.delete(`/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return data
    };

    const { mutate: onDelete, isLoading } = useMutation(deleteUser, {
        onSuccess: () => {
          queryClient.invalidateQueries('users');
          setShowDelete(false)
          setShowSuccess(true)
          refetch()
        }
    });    

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
                                //icon={userIcon}
                                title="Total"
                                value={20}
                                type="list"
                                width='273px'
                                list={lista}
                                open={openTotalList}
                                setOpen={() => setOpenTotalList(!openTotalList)}
                            />
                            {regionUsers?.map((id: any, index: number) => {
                                return (
                                    <CardInfo key={id}
                                        title={id.name}
                                        value={id.user_total}
                                        type="list"
                                        width='236px'
                                        list={id.state_list}
                                        open={openSulList}
                                        setOpen={() => setOpenSulList(!openSulList)}
                                    />
                                )
                            })}
                        </S.CardList>
                        <S.ContainerListApp>
                            <S.SearchInputs>
                                <p>Usuários cadastrados no aplicativo</p>
                                <div>
                                    <Search
                                        onChange={(e) => {
                                            // setUser(e.target.value);
                                            // console.log(e.target.value)
                                        }}

                                        width='409px'
                                    />

                                    <CustomSelect
                                        onChange={(e) => {
                                            // setBreed(e.target.value);
                                            // console.log(e.target.value);
                                        }}
                                        id='Raça'
                                        label='Raça'
                                        labelDefault='Raça'
                                        list={listaRaça}
                                        value=''
                                        width={176}
                                    />
                                    <CustomSelect
                                        onChange={(e) => {
                                            // setGenre(e.target.value);
                                            // console.log(e.target.value);
                                        }}
                                        id='Genero'
                                        label='Genero'
                                        labelDefault='Genero'
                                        list={listaGenero}
                                        value=''
                                        width={176}
                                    />
                                    <CustomSelect
                                        onChange={(e) => {
                                            // setUfValue(e.target.value);
                                            // console.log(e.target.value);
                                        }}
                                        id="state"
                                        label='Estado'
                                        labelDefault='Estado'
                                        list={uf}
                                        value='Todos os Estados'
                                        width={254}
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
                                                Telefone
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
                                <tbody>
                                {users?.data?.map((id: any) => {
                                    if(id.role === 'Mobile'){
                                        return (
                                            <tr>
                                                <td style={{ width: '246px', }}>
                                                    <span style={{marginLeft: '24px'}}>
                                                        {id.name}
                                                    </span>
                                                </td>
                                                <td style={{ width: '173px', }}>
                                                    <span>
                                                        {regex(id.phone_number)}                                                                                            
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
                                                            <Poppover
                                                                onClick={() => {}}
                                                                onDelete={() => {
                                                                    setShowDelete(!false)
                                                                    setIdUser(id.id)
                                                                }}
                                                                onEdit={() => setEditUser(!editUser)}
                                                                type={'userApp'} 

                                                            /> 
                                                        </S.Options>
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    }
                                })}
                                </tbody>
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
                                        // console.log(e.target.value)
                                    }}
                                    width='822px'
                                />
                            </S.SearchInputs>
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
                                                Telefone
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
                                {users?.data?.map((id: any) => {
                                    if(id.role === 'Administrador'){
                                        return (
                                            <tbody>
                                                <tr>
                                                    <td style={{ width: '367px', }}>
                                                        <span  style={{ marginLeft: '24px' }}>
                                                            {id.name}
                                                        </span>
                                                    </td>
                                                    <td style={{ width: '168px', }}>
                                                        <span>
                                                            {regex(id.phone_number)}  
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
                                                                <Poppover
                                                                    onClick={() => {}}
                                                                    onDelete={() => {
                                                                        setShowDelete(!false)
                                                                        setIdUser(id.id)
                                                                    }}
                                                                    onEdit={() => {
                                                                        setEditUser(!editUser)
                                                                        setObjUser(id)
                                                                        setIdUser(id.id)
                                                                    }} 
                                                                    type={'userPanel'} 
                                                                />
                                                            </S.Options>
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )
                                    }
                                })}
                            </S.Table>
                        </S.ContainerListApp>
                    </>
                )}
            </>
            <Pagination 
                onPage={(e: any) => {
                    setPage(e)
                }} 
                value={page} 
            />
            <NewUser 
                isModal={open}
                onClose={() => setOpen(!open)}
            />
            <EditUser 
                isModal={editUser}
                onClose={() => {                    
                    setEditUser(!editUser)
                    setObjUser(null)                                        
                }}
                itemEdit={objUser}
            />
            <ModalDelete
                backgroundColor='false'
                mensage='Deseja mesmo excluir este usuário?'
                onClose={() => setShowDelete(false)}
                onDelete={() => {
                    onDelete(idUser)
                    refetch()
                }}
                open={showDelete}
                width={469}
                buttonText={isLoading == false ? 'Sim, excluir' : 'Excluindo...' }
            />
            <ModalMsg 
                height='312px'
                modalBackground={false}
                mensage='O usuário foi excluido com sucesso!'
                onClose={() => {
                    setShowSuccess(false)
                    setShowDelete(false)
                    refetch()
                }}
                open={showSuccess}
                status="success"
                width={469}
            />
        </>

    )
}

export default Usuarios;