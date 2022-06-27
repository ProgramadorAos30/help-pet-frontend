import React from 'react';
import {
    iconShow,
} from '../../assets';

//https://getbootstrap.com.br/docs/4.1/components/pagination/

const Pagination: React.FC = () => {
    return (
        <nav aria-label="Navegação de página exemplo">
            <ul className="pagination">
                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Anterior">
                        <span aria-hidden="true"><img src={iconShow} alt="Anterior" /></span>
                        <span className="sr-only">Anterior</span>
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">1</a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">2</a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">3</a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#">4</a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Próximo">
                        <span aria-hidden="true"><img src={iconShow} alt="Próximo" /></span>
                        <span className="sr-only">Próximo</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
};

export default Pagination;

