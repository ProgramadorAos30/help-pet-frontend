import * as Yup from 'yup';
import { useUsers } from "../../services";



export const schema = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório"),
    phone_number: Yup.string().length(15, "Digitar DDD sem o zero seguido do número").required("Digite o DDD e o número"),
    email: Yup.string().required("Digite um e-mail válido").email("Digite um e-mail válido")/*.test('E-mail Valido','E-mail em uso' )*/,
    state: Yup.string().required("Selecione um Estado"),
    city: Yup.string().required("Selecione uma Cidade"),
    password: Yup.string().required("A senha deve ter no minímo 6 dígitos").min(6, "A senha deve ter no minímo 6 dígitos"),
});