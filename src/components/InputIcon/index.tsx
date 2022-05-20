import React, { useState } from 'react';
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
    const [ img, setImg ] = useState<any>('');

    console.log(uploads)

    return (
        <>
            <input 
                type="file" 
                accept='image/png,image/gif,image/jpeg'
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
                            setImg(resp.data.file)
                        }).catch((err) => {
                            console.log(err);
                        })
                    }
                }}
            />
            {uploads?.map((id: any) => {
                return (
                    <img src={id.file} alt="" />
                )
            })}
        </>
    );
};

export default InputIcon;