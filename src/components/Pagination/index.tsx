import React, { useState } from 'react';
import * as S from './style';
import {
    iconShow,
} from '../../assets';

const Pagination: React.FC = () => {
    const [page, setPage] = useState<number>(1);

    return (
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
    )
};

export default Pagination;

