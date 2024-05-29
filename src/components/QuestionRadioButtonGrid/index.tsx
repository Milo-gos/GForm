import React, { useEffect, useRef, useState } from 'react';
import style from './questionradiobuttongrid.module.scss';
import classNames from 'classnames/bind';
import CloseIcon from '@mui/icons-material/Close';
import { IoIosAddCircleOutline } from 'react-icons/io';

import QuestionTextInput from '../QuestionTextInput';
const cx = classNames.bind(style);
interface Props {
    isActiveQuestion?: boolean;
    indexQuestion: number;
}
const QuestionRadioButtonGrid = ({ isActiveQuestion, indexQuestion }: Props) => {
    const [listRows, setListRows] = useState([1]);
    const handleClickAddRow = () => {
        setListRows((prev) => [...prev, 1]);
    };
    const handleClickRemoveRow = (indexRemove: number) => {
        setListRows((prev) => [...prev].filter((item, index) => index !== indexRemove));
    };
    const [listColumns, setListColumns] = useState([1]);
    const handleClickAddColumns = () => {
        setListColumns((prev) => [...prev, 1]);
    };
    const handleClickRemoveColumns = (indexRemove: number) => {
        setListColumns((prev) => [...prev].filter((item, index) => index !== indexRemove));
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('col')}>
                <div className={cx('head')}>Hàng</div>
                {listRows.map((item, index) => {
                    return (
                        <div key={index} className={cx('option-wrapper')}>
                            <span>{index + 1}.</span>
                            <div style={{ flex: '1' }}>
                                <QuestionTextInput
                                    isActiveQuestion={isActiveQuestion}
                                    placeholder={`Hàng ${index + 1}`}
                                />
                            </div>
                            {listRows.length > 1 && isActiveQuestion && (
                                <CloseIcon style={{ cursor: 'pointer' }} onClick={() => handleClickRemoveRow(index)} />
                            )}
                        </div>
                    );
                })}
                {isActiveQuestion && (
                    <div className={cx('add-option')} onClick={handleClickAddRow}>
                        <IoIosAddCircleOutline size={24} />
                        <div>
                            <p>Thêm hàng</p>
                            <div className={cx('underline')}></div>
                        </div>
                    </div>
                )}
            </div>

            <div className={cx('col')}>
                <div className={cx('head')}>Cột</div>
                {listColumns.map((item, index) => {
                    return (
                        <div key={index} className={cx('option-wrapper')}>
                            <span>{index + 1}.</span>
                            <div style={{ flex: '1' }}>
                                <QuestionTextInput
                                    isActiveQuestion={isActiveQuestion}
                                    placeholder={`Cột ${index + 1}`}
                                />
                            </div>
                            {listColumns.length > 1 && isActiveQuestion && (
                                <CloseIcon
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleClickRemoveColumns(index)}
                                />
                            )}
                        </div>
                    );
                })}
                {isActiveQuestion && (
                    <div className={cx('add-option')} onClick={handleClickAddColumns}>
                        <IoIosAddCircleOutline size={24} />
                        <div>
                            <p>Thêm cột</p>
                            <div className={cx('underline')}></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuestionRadioButtonGrid;
