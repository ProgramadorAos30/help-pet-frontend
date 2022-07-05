import * as Yup from 'yup';

export const schema = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório"),
    phone_number: Yup.string().min(15).max(15).required("Digite o DDD e o numero"),
    email: Yup.string().required("Digite um E-mail valido").email(),
    state: Yup.string().required("Selecione um Estado"),
    city: Yup.string().required("Selecione uma Cidade"),
    password: Yup.string().required("A senha deve ter no minimo 6 dígitos").min(6),
});