import './style.css';

import PawVector from "../../images/PawVector"
import CatImg1 from "../../images/CatImg1.svg"


function SectionMenu(props) {
    return (

        <section className="Project SectionMenu">
            <p>{props.title}</p>
            <button className="btn btnYellow"> Clique Aqui </button>
            <img src={CatImg1} alt="imagem de gato" />
            <div className="positionVector">
                <span className="vector1">
                    <PawVector />
                </span>
                <span className="vector2">
                    <PawVector />
                </span>
                <span className="vector3">
                    <PawVector />
                </span>
            </div>
        </section >
    )
};

export default SectionMenu;