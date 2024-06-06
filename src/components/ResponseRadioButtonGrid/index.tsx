import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Rectangle } from 'recharts';
import style from './responseradiobuttongrid.module.scss';
import classNames from 'classnames/bind';
import CHART_COLOR from '../../utils/functions/chartColors';
import QuestionResponseInterface from '../../utils/interfaces/question-response';

const cx = classNames.bind(style);

interface Props {
    questionResponse: QuestionResponseInterface;
}

const ResponseRadioButtonGrid = ({ questionResponse }: Props) => {
    // const question = useAppSelector((state) => state.submitForm.questions[index]);
    // const questionType = question.questionType;
    const data = questionResponse.rowGColumnResponses;
    console.log(data);
    const columns = data![0].gcolumns;
    const tmp = data!.map((item) => {
        const newItem: any = { row: item.row };
        for (let i = 0; i < item.gcolumns.length; i++) {
            newItem[`${item.gcolumns[i].gcolumnContent}`] = item.gcolumns[i].quantity;
        }
        return newItem;
    });
    console.log(tmp);
    return (
        <div className={cx('wrapper')}>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    width={500}
                    height={300}
                    data={tmp}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="row" />
                    <YAxis type="number" interval={0} allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    {/* {data![0].gcolumns
                        .map((i) => i.gcolumnContent)
                        .map((content, index) => {
                            return <Bar dataKey={content} fill="#82ca9d" key={index} />;
                        })} */}
                    {columns.map((item, index) => {
                        return (
                            <Bar dataKey={`${columns[index].gcolumnContent}`} fill={CHART_COLOR[index]} key={index} />
                        );
                    })}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ResponseRadioButtonGrid;
