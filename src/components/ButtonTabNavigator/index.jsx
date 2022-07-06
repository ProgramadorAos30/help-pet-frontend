import './style.css';
//import { useState } from 'react'

import { FaSearch, FaHome, FaHeart, FaUser } from "react-icons/fa";

function ButtonTabNavigator() {
    //const [isActive, setIsActive] = useState(true)

    //const buttons = [`<FaUser alt='Perfil' />`, "<FaHome alt='Home' />", "<FaSearch alt='Pesquisa' />", "<FaHeart alt='Favoritos' />"]


    // const renderButtons = buttons => {
    //     return buttons.map((buttom, index) => {
    //         return (
    //             <li
    //                 key={index}
    //                 className={isActive + 'Class'}
    //                 onClick={() => setIsActive(buttom)}
    //             >
    //                 {buttom}
    //             </li>
    //         )
    //     })
    // }
    return (
        <ul className="nav" >
            <li>
                <FaUser alt='Perfil' />
            </li>
            <li>
                <FaHome alt='Home' />
            </li>
            <li>
                <FaSearch alt='Pesquisa' />
            </li>
            <li>
                <FaHeart alt='Favoritos' />
            </li>
        </ul >

    )
}
export default ButtonTabNavigator