import './style.css'

import Img1 from "../../images/img1.png"
import Button1 from "../../components/Button1"
import ProgressBar1 from '../../components/ProgressBar1'

import { Link } from 'react-router-dom'

function ScreenWelcome3() {
    return (
        <div className="screenWelcome3">

            <h1>  <strong>teste</strong> ao Aplicativo <strong>HelpPet</strong> </h1>
            <p>ajude em poucos passos, gerando um Qr code para sua conta bancaria</p>
            <img src={Img1} alt="imagem inicial" />

            <Link to="/HomePage">
                <Button1 className="positionButton1" text="Proximo" />
            </Link>

            <ProgressBar1 className="positionProgressBar1" screenWelcomeNumber="3" />
        </div>
    )
}

export default ScreenWelcome3