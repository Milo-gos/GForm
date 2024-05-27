import React, { useEffect, useRef, useState } from 'react';
import style from './questiondropdown.module.scss';
import classNames from 'classnames/bind';
import CloseIcon from '@mui/icons-material/Close';
import { IoIosAddCircleOutline } from 'react-icons/io';

import QuestionTextInput from '../QuestionTextInput';
const cx = classNames.bind(style);
interface Props {
    isActiveQuestion?: boolean;
}
const QuestionDropDown = ({ isActiveQuestion }: Props) => {
    const [listOption, setListOption] = useState([1]);
    const handleClickAddOption = () => {
        setListOption((prev) => [...prev, 1]);
    };
    const handleClickRemoveOption = (indexRemove: number) => {
        setListOption((prev) => [...prev].filter((item, index) => index !== indexRemove));
    };
    return (
        <div className={cx('wrapper')}>
            {listOption.map((item, index) => {
                return (
                    <div key={index} className={cx('option-wrapper')}>
                        <span>{index + 1}.</span>
                        <div style={{ flex: '1' }}>
                            <QuestionTextInput isActiveQuestion={isActiveQuestion} />
                        </div>
                        {listOption.length > 1 && isActiveQuestion && (
                            <CloseIcon style={{ cursor: 'pointer' }} onClick={() => handleClickRemoveOption(index)} />
                        )}
                    </div>
                );
            })}
            {isActiveQuestion && (
                <div className={cx('add-option')} onClick={handleClickAddOption}>
                    <IoIosAddCircleOutline size={24} />
                    <div>
                        <p>Thêm lựa chọn</p>
                        <div className={cx('underline')}></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionDropDown;
