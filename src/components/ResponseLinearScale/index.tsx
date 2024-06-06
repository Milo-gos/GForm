import React, { useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import style from './responselinearscale.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

interface Props {
    index: number;
}

const ResponseLinearScale = () => {
    // const question = useAppSelector((state) => state.submitForm.questions[index]);
    // const questionType = question.questionType;
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
        {
            name: 'Page T',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    width={600}
                    height={280}
                    data={data}
                    margin={{
                        top: 0,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle stroke="transparent" />} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ResponseLinearScale;
