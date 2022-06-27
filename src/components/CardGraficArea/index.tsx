import React, { useEffect, useState } from 'react';
import { 
    Box,
    MultSelect 
} from '../index';
import * as S from './style';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    Tooltip, 
} from 'recharts';

type List = {
    name?: string,
    masculino?: number,
    feminino?: number,
    naoBinario?: number,
    outros?: number,
    pard?: number,
    yellow?: number,
    white?: number,
    indigenous?: number,
    black?: number,
    title?: string
}

interface IProps {
    data?: List[]
    valueItem: string[],
    onChange: (e: any) => void,
    title: string,
    type: string
}


const CardGraficArea: React.FC <IProps> = (props) => {
    const toPercent = (decimal: any, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`;
    
    const getPercent = (value: any, total: any) => {
      const ratio = total > 0 ? value / total : 0;
    
      return toPercent(ratio, 2);
    };
    
    const renderTooltipContent = (o: any) => {
        const { payload, label } = o;
        const total = payload.reduce((result: any, entry: any) => result + entry.value, 0);
        
        return (
            <div className="customized-tooltip-content" 
                style={{
                    background: '#2C3941',
                    borderRadius: '8px',
                    padding: '8px'
                }}
            >
            <ul className="list" >
                {payload.map((entry: any, index: any) => (
                <li key={`item-${index}`} style={{ color: '#FFF', listStyleType: 'none' }}>
                    {`${entry.name}: `} <b>{`${getPercent(entry.value, total)}`}</b>
                </li>
                ))}
            </ul>
            </div>
        );
    };

    console.log(props.valueItem, 'item')

    return (
        <Box padding='32px' width='764px'>
            <S.Container>
                <div>
                    <div>
                        <p>Percentual de ocorrências por</p>
                        <h1>{props.title}</h1>
                    </div>
                    <MultSelect
                        width={228}
                        onChange={props.onChange}
                        valueItem={props.valueItem} 
                        list={undefined}
                    />
                </div>
                <S.Values>
                    <div>
                        {props.data?.map((id: any) => {
                            return (
                                <div>
                                    {id.title == 'Masculino' || id.title == 'Preta' ? <div style={{background: '#47DED0'}}/> : ''}
                                    {id.title == 'Feminino' || id.title == 'Branca' ? <div style={{background: '#FF77F1'}}/> : ''}
                                    {id.title == 'Não-binário' || id.title == 'Indígena' ? <div style={{background: '#9D86ED'}}/> : ''}
                                    {id.title == 'Outros' || id.title == 'Amarela' ? <div style={{background: '#FF954E'}}/> : ''}
                                    {id.title == 'Parda' ? <div style={{background: '#B8D335'}}/> : ''}
                                    <p>{id.title}</p>
                                </div>
                            )
                        })}
                    </div>
                </S.Values>
                <BarChart
                    width={700}
                    height={300}
                    data={props.data}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={renderTooltipContent} 
                        contentStyle={{
                            background: '#2C3941',
                            borderRadius: '8px',
                            opacity: '0.8',
                            color: '#FFF'
                        }}
                        cursor={false} 
                    />
                    {props.type == 'genero' ? 
                        <>
                            <>
                                <Bar radius={[25, 25, 0, 0]} dataKey="masculino" fill="#47DED0" />
                                <Bar radius={[25, 25, 0, 0]} dataKey="feminino" fill="#FF77F1" />
                                <Bar radius={[25, 25, 0, 0]} dataKey="naoBinario" fill="#9D86ED" />
                                <Bar radius={[25, 25, 0, 0]} dataKey="outros" fill="#FF954E" />
                            </>
                        </>
                        :
                        <>
                            <Bar radius={[25, 25, 0, 0]} dataKey="yellow" fill="#FF954E" />
                            <Bar radius={[25, 25, 0, 0]} dataKey="white" fill="#FF77F1" />
                            <Bar radius={[25, 25, 0, 0]} dataKey="indigenous" fill="#9D86ED" />
                            <Bar radius={[25, 25, 0, 0]} dataKey="pard" fill="#B8D335" />
                            <Bar radius={[25, 25, 0, 0]} dataKey="black" fill="#47DED0" />
                        </>
                    }


                </BarChart>
            </S.Container>
        </Box>
    );
};

export default CardGraficArea;