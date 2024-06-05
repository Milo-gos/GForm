import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import style from './responsedropdown.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

interface Props {
    index: number;
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};
const ResponseDropdown = () => {
    // const question = useAppSelector((state) => state.submitForm.questions[index]);
    // const questionType = question.questionType;
    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    return (
        <div className={cx('wrapper')}>
            <PieChart width={260} height={260}>
                <Pie
                    data={data}
                    cx={130}
                    cy={130}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value">
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
            <div className={cx('color-wrapper')}>
                {COLORS.map((color, index) => {
                    return (
                        <div className={cx('color-component')} key={index}>
                            <div
                                style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    backgroundColor: color,
                                }}></div>
                            <span>{index}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ResponseDropdown;
