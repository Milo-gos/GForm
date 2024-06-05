import React from 'react';
import style from './answerradiobuttongrid.module.scss';
import classNames from 'classnames/bind';
import RowRadioGroupComponent from './RowRadioGroupComponent';
import { useAppSelector } from '../../redux';

const cx = classNames.bind(style);

interface Props {
    indexQuestion: number;
}
const AnswerRadioButtonGrid = ({ indexQuestion }: Props) => {
    const question = useAppSelector((state) => state.submitForm.questions[indexQuestion]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('pseudo-wrapper')}>
                <table className={cx('pseudo-table')}>
                    <thead>
                        <tr>
                            <th className={cx('first-column')}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {question.rows?.map((row, index) => {
                            return (
                                <tr key={index}>
                                    <td>{row.rowContent}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className={cx('inner')}>
                <div className={cx('left-padding')}>
                    <div style={{ width: '100px' }}></div>
                </div>
                <div style={{ flex: '1' }}>
                    <table className={cx('table')}>
                        <thead>
                            <tr>
                                {question.gcolumns?.map((gcolumn, index) => {
                                    return <th key={index}>{gcolumn.gcolumnContent}</th>;
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {question.rows?.map((row, index) => {
                                return (
                                    <RowRadioGroupComponent
                                        key={index}
                                        indexQuestion={indexQuestion}
                                        row={row}
                                        indexRow={index}
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AnswerRadioButtonGrid;
