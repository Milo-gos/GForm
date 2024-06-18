import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import style from './responsedropdown.module.scss';
import classNames from 'classnames/bind';
import QuestionResponseInterface from '../../../../../../utils/interfaces/question-response';
import CHART_COLOR from '../../../../../../constants/chartColors';

const cx = classNames.bind(style);

interface Props {
    questionResponse: QuestionResponseInterface;
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
const ResponseDropdown = ({ questionResponse }: Props) => {
    // const question = useAppSelector((state) => state.submitForm.questions[index]);
    // const questionType = question.questionType;
    const data = questionResponse.optionReponses!.map((option) => ({
        name: option.optionContent,
        value: option.quantity,
    }));
    const COLORS = CHART_COLOR.slice(0, questionResponse.optionReponses?.length);
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
                <Tooltip />
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
                            <span>{data[index].name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ResponseDropdown;
