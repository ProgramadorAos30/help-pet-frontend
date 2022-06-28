import * as Yup from 'yup';

export const schema = Yup.object().shape({
    name: Yup.string().required("Nome do serviço é obrigatório."),
    background_color: Yup.string().required("Cor de background é obrigatório"),
    
})