import React from 'react';
import * as S from './style';
import { Controller } from 'react-hook-form';
import { CustomInput } from '../../../components';
import { IPropsSources } from '../types';

interface IProps {

}

const SourceForm: React.FC <IPropsSources> = ({
    idSource,
    onClick,
    onDelete,
    register,
    setValue,
    watch,
    errors,
    control,
  }) => {
    return (
        <>
            <input type="hidden" {...register(`sources.${idSource}.id`)} />
            <input type="hidden" {...register(`sources.${idSource}._id`)} />

            <Controller 
                name='name'
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                    <>
                        <CustomInput
                            label='Digite o nome da fonte'
                            type='Text'
                            value={value}
                            width={372}
                            onBlur={onBlur}
                            onChange={onChange}
                            id="name-source"
                        />
                        <S.Button
                            id='submit-source' 
                            type="button"
                            onClick={onClick}
                        >
                            Adicionar
                        </S.Button>
                    </>
                )}
            />
        </>
    );
};

export default SourceForm;