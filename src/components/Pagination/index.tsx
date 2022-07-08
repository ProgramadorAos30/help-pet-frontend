import React, { useEffect, useState } from 'react';
import * as S from './style';
import {
    iconShow,
} from '../../assets';

interface IProps {
    onPage: (e: any) => any,
    value: any,
}

const Pagination: React.FC <IProps> = ({onPage,value}) => {

    const [page, setPage] = React.useState<number>(value);
    
    useEffect(()=>{
        onPage(page)
    }, [page])


    return (
        <S.DivConatainerBtn>
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
                <div>
                    <S.AtualPage>{page}</S.AtualPage>
                    <S.Page
                            onClick={() => {
                                let cont = page + 1
                                setPage(cont);
                            }}
                        >{page + 1}</S.Page>
                        <S.Page
                            onClick={() => {
                                let cont = page + 2
                                setPage(cont);
                            }}
                        >{page + 2}</S.Page>
                        <S.Page
                            onClick={() => {
                                let cont = page + 3
                                setPage(cont);
                            }}
                        >{page + 3}</S.Page>
                </div>
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
        </S.DivConatainerBtn>

    )
};

export default Pagination;