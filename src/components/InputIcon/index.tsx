import React, { useRef, useState } from 'react';
import * as S from './style';
import { uploadIcon } from '../../assets/index';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { idText } from 'typescript';
import { Uploads } from '../../@types';
import { 
    api, 
    queryClient,
    useUploads
} from '../../services';
import { RootState } from '../../stores';

interface IProps {

}

const InputIcon: React.FC = () => {
    const { token } = useSelector((state : RootState) => state.clickState);
    const { data: uploads } = useUploads(token);
    const ref = useRef<HTMLInputElement>(null);

    return (
        <S.Container>
            <input 
                ref={ref}
                style={{display: 'none'}}
                type="file" 
                accept='image/png, image/svg, image/jpeg'
                onChange={(e: any) => {
                    let image = new FileReader();
                    image.readAsDataURL(e.target.files[0])
                    image.onloadend = () => {
                        let base64 = image.result;
                        let file = { "file": base64 }
                        
                        api.post('/uploads', file,{
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        }).then((resp: any) => {
                            console.log(resp.data);
                        }).catch((err) => {
                            console.log(err);
                        })
                    }
                }}
            />
            <S.Upload
                type="button"
                onClick={() => {
                    ref.current?.click();
                }}
            >
                <div>
                    <img src={uploadIcon} alt="Upload icon" />
                    <p>Importar ícone</p>
                </div>
            </S.Upload>
            {uploads?.map((id: any) => {
                return (
                    <img src={id.file} alt="" />
                )
            })}
        </S.Container>
    );
};

export default InputIcon;