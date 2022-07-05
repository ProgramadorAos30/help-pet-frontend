import * as Yup from 'yup';

export const schema = Yup.object().shape({
    service: Yup.string().required('Selecione um serviço.'),
    source: Yup.string().required('Selecione uma fonte.'),
    date: Yup.string().required('Preencha o campo data.'),
    adress: Yup.string().required('Preencha o campo de endereço.'),
    special_place: Yup.string().required('Selecione uma localização especial.'),
    have_energy_meter: Yup.string().required('Preencha o campo com algum valor.'),
    have_hydrometer: Yup.string().required('Preencha o campo com algum valor.'),
    have_reservoir:  Yup.string().required('Preencha o campo com algum valor.'),
    number_residents: Yup.number().required('Preencha o campo com algum valor.'),
    type_place: Yup.string().required('Selecione o tipo de localização.'),
    area: Yup.string().required('Selecione uma area afetada.'), 
    agree_share: Yup.string().required('Preencha o campo com algum valor.'), 
});