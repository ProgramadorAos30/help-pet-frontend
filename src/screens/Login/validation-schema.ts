import * as Yup from 'yup';

export const schema = Yup.object().shape({
    username: Yup.string().required("Email ou Telefone são obrigatórios"),
    password: Yup.string().required("Senha é obrigatória")
});