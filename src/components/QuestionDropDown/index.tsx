import React, { useEffect, useRef, useState } from 'react';
import style from './questiondropdown.module.scss';
import classNames from 'classnames/bind';
import CloseIcon from '@mui/icons-material/Close';
import { IoIosAddCircleOutline } from 'react-icons/io';

import QuestionTextInput from '../QuestionTextInput';
import { useAppDispatch, useAppSelector } from '../../redux';
import { handleAddOption, handleChangeOptionText, handleRemoveOption } from '../../redux/slice/survey';
const cx = classNames.bind(style);
interface Props {
    isActiveQuestion?: boolean;
    indexQuestion: number;
}
const QuestionDropDown = ({ isActiveQuestion, indexQuestion }: Props) => {
    const question = useAppSelector((state) => state.survey.questions[indexQuestion]);
    const optionsLength = question.options ? question.options.length : 0;
    const dispatchApp = useAppDispatch();
    const [listOption, setListOption] = useState([1]);
    const handleClickAddOption = () => {
        setListOption((prev) => [...prev, 1]);
    };
    const handleClickRemoveOption = (indexRemove: number) => {
        setListOption((prev) => [...prev].filter((item, index) => index !== indexRemove));
    };
    return (
        <div className={cx('wrapper')}>
            {question.options?.map((option, indexOption) => {
                return (
                    <div key={indexOption} className={cx('option-wrapper')}>
                        <span>{indexOption + 1}.</span>
                        <div style={{ flex: '1' }}>
                            <QuestionTextInput
                                isActiveQuestion={isActiveQuestion}
                                value={option.optionText}
                                onChange={(e) =>
                                    dispatchApp(
                                        handleChangeOptionText({
                                            indexQuestion,
                                            indexOption,
                                            optionText: e.target.value,
                                        }),
                                    )
                                }
                            />
                        </div>
                        {optionsLength > 1 && isActiveQuestion && (
                            <CloseIcon
                                style={{ cursor: 'pointer' }}
                                onClick={() => dispatchApp(handleRemoveOption({ indexQuestion, indexOption }))}
                            />
                        )}
                    </div>
                );
            })}
            {isActiveQuestion && (
                <div className={cx('add-option')} onClick={() => dispatchApp(handleAddOption({ indexQuestion }))}>
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
