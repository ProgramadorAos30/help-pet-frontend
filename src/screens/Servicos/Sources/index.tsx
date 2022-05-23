import React from 'react';
import * as S from '../NewService/style'
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Soucers } from '../../../@types';
import { CustomInput } from '../../../components';
import { api, queryClient } from '../../../services';
import { IPropsSources } from '../types';

const Sources: React.FC <IPropsSources> = ({idService}) => { 

    const postSources = async (data: Soucers) => {
        const { data: response } = await api.post('/sources', data);
        return response.data;
    };

    const { 
        handleSubmit,
        register,
        control
    } = useForm<Soucers>();

    const { mutate, isLoading } = useMutation(postSources, {
        onSuccess: () => {
          queryClient.invalidateQueries('sources');
        }
    });

    const onSubmitSources = (values: Soucers) => {
        const obj = {
            'service': idService,
            'name': values.name,
        }
        //mutate(obj);
        console.log(values, 'valores');
    };
    return(
        <form>
            <input type="hidden" {...register('service')} />
            <S.Fonts>
                <div>
                    <Controller
                        control={control}
                        name='name'
                        render={({field: {onChange, onBlur, value}}) => {
                            return (
                                <CustomInput
                                    label='Digite o nome da fonte'
                                    type='Text'
                                    value={value}
                                    width={372}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                />
                            )
                        }}
                        />
                    <S.Button type="button" onSubmit={handleSubmit(onSubmitSources)}>
                        Adicionar
                    </S.Button>
                </div>
            </S.Fonts>
        </form>
    );
};

export default Sources;