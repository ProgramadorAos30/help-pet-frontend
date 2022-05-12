import React, { useState } from 'react';
import * as S from './style';
import { Box } from '../index';
import { 
    BarChart, 
    Bar, 
    Cell, 
    XAxis, 
    Tooltip, 
} from 'recharts';
import styled from '@emotion/styled';
import { LinearProgress, linearProgressClasses } from '@mui/material';

type List = {
    name: string,
    energia: number,
    agua: number,
    internet: number,
    gas: number,
    month: string,
    total: number
}

interface IProps {
    title: string,
    number: number,
    data: List[]
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    background: 'red',
    color: '#AFAFAF',
    [`&.${linearProgressClasses.colorPrimary}`]: {
        borderRadius: 5,
        backgroundColor: '#FF954E80'
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: '#FF954E',
      },
    width: '273px'
  }));

const YearGrafic: React.FC <IProps> = (props) => {
    const [focusBar, setFocusBar] = useState<any>(null);
    const [mouseLeave, setMouseLeave] = useState<any>(true);
     
    return (
        <Box padding='40px 24px'>
            <S.Container>
                <div>
                    <h1>{props.title}</h1>
                    <p>{props.number}</p>
                </div>
                <section>
                    <BarChart
                        width={604}
                        height={247}
                        data={props.data}
                        onMouseMove={(state) => {
                            if (state.isTooltipActive) {
                            setFocusBar(state.activeTooltipIndex);
                            setMouseLeave(false);
                            } else {
                            setFocusBar(null);
                            setMouseLeave(true);
                            }
                        }}
                    >
                        <Tooltip cursor={false} />
                        <XAxis dataKey="month" />
                        <Bar 
                            radius={[25, 25, 0, 0]} 
                            dataKey="total" 
                            fill="#C7C7C7" 
                        >
                            {props.data.map((entry: any, index: any) => (
                                <Cell 
                                    fill={
                                        focusBar === index ? "#2B5CE7" : "#C7C7C7"
                                    } 
                                />
                            ))}
                        </Bar>
                    </BarChart>
                    <S.ProgressBar>
                        <div>
                            <div>
                                <div>
                                    <p>{props.title}</p>
                                    <h1>{props.number}</h1>
                                </div>
                                <BorderLinearProgress variant="determinate" value={50} />
                            </div>
                            <div>
                                <div>
                                    <p>{props.title}</p>
                                    <h1>{props.number}</h1>
                                </div>
                                <BorderLinearProgress variant="determinate" value={50} />
                            </div>
                            <div>
                                <div>
                                    <p>{props.title}</p>
                                    <h1>{props.number}</h1>
                                </div>
                                <BorderLinearProgress variant="determinate" value={50} />
                            </div>
                            <div>
                                <div>
                                    <p>{props.title}</p>
                                    <h1>{props.number}</h1>
                                </div>
                                <BorderLinearProgress variant="determinate" value={50} />
                            </div>
                            <div>
                                <div>
                                    <p>{props.title}</p>
                                    <h1>{props.number}</h1>
                                </div>
                                <BorderLinearProgress variant="determinate" value={50} />
                            </div>
                            <div>
                                <div>
                                    <p>{props.title}</p>
                                    <h1>{props.number}</h1>
                                </div>
                                <BorderLinearProgress variant="determinate" value={50} />
                            </div>
                        </div>
                    </S.ProgressBar>
                </section>
            </S.Container>
        </Box>
    );
};

export default YearGrafic;