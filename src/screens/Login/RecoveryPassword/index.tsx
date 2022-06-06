import React from 'react';

const RecoveryPassword: React.FC = () => {
    return (
        <div>
            <h1>Esqueci minha senha</h1>
            <p>
                Digite o e-mail ou número de telefone que você utilizou na hora do cadastro para receber o código de segurança.
            </p>
            <form>
                <input type="text" />
                <button>Enviar código</button>
            </form>
            <button>Já recebi o código</button>
        </div>
    );
};

export default RecoveryPassword;