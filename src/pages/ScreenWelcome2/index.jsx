import './style.css'

import Img1 from "../../images/img1.png"
import Button1 from "../../components/Button1"
import ProgressBar1 from '../../components/ProgressBar1'
import Button2 from '../../components/Button2'

import { Link } from 'react-router-dom'


function ScreenWelcome2() {
    return (
        <div className="screenWelcome2" >
            pagina 2
            <h1> Seja <strong>BEM-VINDO</strong> ao Aplicativo <strong>HelpPet</strong> </h1>

            <img src={Img1} alt="imagem inicial" />

            <p>ajude em poucos passos, gerando um Qr code para sua conta bancaria</p>

            <Link to="/ScreenWelcome3">
                <Button1 className="positionButton1" text="Proximo" />
            </Link>

            <ProgressBar1 className="positionProgressBar1" screenWelcomeNumber="2" />

            <Link to="/ScreenWelcome3">
                <Button2 className="positionButton2" text="Pular" />
            </Link>
        </div >
    )
}

export default ScreenWelcome2