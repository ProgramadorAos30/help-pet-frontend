import './style.css'

import SectionMenu from '../../SectionMenu'


function HomePage() {

    return (
        <div className="HomePage" >
            <SectionMenu title="Conheça nosso projeto" colorId="1" />
            <SectionMenu title="Apoiadores e Patrocinadores" colorId="2" />
            <SectionMenu title="Ajude Mensalmente" colorId="3" />
            <SectionMenu title="Cadastre seu PET" colorId="4" />
            <h1><strong>home page</strong>  </h1>

            <p>ajude em poucos passos, gerando um Qr code para sua conta bancaria</p>
        </div>
    )
}
export default HomePage