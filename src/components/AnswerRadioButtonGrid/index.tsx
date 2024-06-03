import React from 'react';
import style from './answerradiobuttongrid.module.scss';
import classNames from 'classnames/bind';
import RowRadioGroupComponent from './RowRadioGroupComponent';

const cx = classNames.bind(style);

const AnswerRadioButtonGrid = () => {
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
                        <tr>
                            <td>Row 1</td>
                        </tr>
                        <tr>
                            <td>Row 1</td>
                        </tr>
                        <tr>
                            <td>Row 1</td>
                        </tr>
                        <tr>
                            <td>Row 1</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={cx('inner')}>
                <div className={cx('left-padding')}>
                    <div style={{ width: '100px' }}></div>
                </div>
                <div>
                    <table className={cx('table')}>
                        <thead>
                            <tr>
                                <th>Column 1</th>
                                <th>Column 1</th>
                                <th>Column 1</th>
                                <th>Column 1dsfdsfdsfdsdsfds</th>
                                <th>Column 1</th>
                                <th>Column 1</th>
                                <th>Column 1</th>
                                <th>Column 1</th>
                                <th>Column 1</th>
                                <th>Column 1</th>
                                <th>Column 1</th>
                                <th>Column 1</th>
                                <th>Column 1</th>
                                <th>Column 1</th>
                            </tr>
                        </thead>
                        <tbody>
                            <RowRadioGroupComponent />
                            <RowRadioGroupComponent />
                            <RowRadioGroupComponent />
                            <RowRadioGroupComponent />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AnswerRadioButtonGrid;
