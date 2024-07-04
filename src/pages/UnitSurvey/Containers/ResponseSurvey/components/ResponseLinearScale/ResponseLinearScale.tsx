import React, { useState } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import style from './response-linear-scale.module.scss';
import classNames from 'classnames/bind';
import QuestionResponseInterface from '../../../../../../utils/interfaces/QuestionResponse';

const cx = classNames.bind(style);

interface Props {
    questionResponse: QuestionResponseInterface;
}

const ResponseLinearScale = ({ questionResponse }: Props) => {
    // const question = useAppSelector((state) => state.submitForm.questions[index]);
    // const questionType = question.questionType;
    const data = questionResponse.linearResponses!.map((linear) => ({
        name: linear.value,
        'Số lựa chọn': linear.quantity,
    }));

    return (
        <div className={cx('wrapper')}>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    width={600}
                    height={300}
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}>
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey="name" />
                    <YAxis type="number" interval={0} allowDecimals={false} />
                    <Tooltip />
                    <Legend />

                    <Bar dataKey="Số lựa chọn" fill="#00c49f" activeBar={<Rectangle stroke="transparent" />} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ResponseLinearScale;
