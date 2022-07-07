import * as Yup from 'yup';

export const schema = Yup.object().shape({
    service: Yup.string().required('Selecione um serviço.'),
    source: Yup.string().required('Selecione uma fonte.'),
    date: Yup.date().required('Preencha o campo data.'),
    address: Yup.string().required('Preencha o campo de endereço.'),
    area: Yup.string().required('Selecione uma area afetada.'), 
    //special_place: Yup.string().required('Selecione uma localização especial.'),
    //type_place: Yup.string().required('Selecione o tipo de localização.'),
    number_residents: Yup.number().required('Preencha o campo com algum valor.').min(0).default(0),
});