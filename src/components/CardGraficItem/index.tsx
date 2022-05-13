import React, { useEffect, useState } from 'react';
import * as S from './style';
import { Box } from '../index';
import { 
    Area, 
    AreaChart,
} from 'recharts';

type List = {
    label?: string,
    value?: string,
}

interface IProps {
    icon?: string,
    title?: string,
    value?: string,
    id?: string,
    list?: List[],
    width?: string,
    widthChart?: number;
}

const CardGraficItem: React.FC <IProps> = (props) => {
    const [ color, setColor ] = useState('');

    function setColorGrafic(){
        if(props.title == 'Quedas de energia' || props.title == 'Sul'){
            setColor('#FF954E')
        } 
        if(props.title == 'Falta de água' || props.title == 'Norte'){
            setColor('#47DED0')
        }
        if(props.title == 'Quedas de internet' || props.title == 'Nordeste'){
            setColor('#9D86ED')
        }
        if(props.title == 'Falta de gás'){
            setColor('#FF77F1')
        }
        if(props.title == 'Sudeste'){
            setColor('#FF4363')
        }
        if(props.title == 'Centro-Oeste'){
            setColor('#B8D335')
        }
    };

    useEffect(() => {
        setColorGrafic()
    }, [color]);
    
    return (
        <Box padding='0' width={props.width}>
            <S.Container>
                <div>
                    <img src={props.icon} alt="" />
                    <div>
                        <h1>{props.title}</h1>
                        <p>{props.value}</p>
                    </div>
                </div>
                <AreaChart 
                    width={props.widthChart} 
                    height={82} 
                    data={props.list}
                    style={{background: '#fff'}}
                >
                    <defs>
                        <linearGradient id={props.id} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                            <stop offset="100%" stopColor={color} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="label" stroke={color} fillOpacity={1} fill={`url(#${props.id})`} />
                    <Area type="monotone" dataKey="value" stroke={color} fillOpacity={1} fill={`url(#${props.id})`} />
                </AreaChart>
            </S.Container>
        </Box>
    );
};

export default CardGraficItem;