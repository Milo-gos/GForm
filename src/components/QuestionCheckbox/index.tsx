import React, { useEffect, useRef, useState } from 'react';
import style from './questioncheckbox.module.scss';
import classNames from 'classnames/bind';
import CloseIcon from '@mui/icons-material/Close';
import { IoIosAddCircleOutline } from 'react-icons/io';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import QuestionTextInput from '../QuestionTextInput';
import { useAppDispatch, useAppSelector } from '../../redux';
import {
    handleAddOption,
    handleChangeOptionText,
    handleRemoveOption,
    handleSetHasOther,
} from '../../redux/slice/survey';

const cx = classNames.bind(style);
interface Props {
    isActiveQuestion?: boolean;
    indexQuestion: number;
}

const QuestionCheckbox = ({ isActiveQuestion, indexQuestion }: Props) => {
    const question = useAppSelector((state) => state.survey.questions[indexQuestion]);
    const optionsLength = question.options ? question.options.length : 0;
    const isHasOther = question.isHasOther;
    const dispatchApp = useAppDispatch();

    const handleAddOther = () => {
        if (isHasOther) return;
        dispatchApp(
            handleSetHasOther({
                indexQuestion,
                isHasOther: true,
            }),
        );
    };
    return (
        <div className={cx('wrapper')}>
            {question.options?.map((option, indexOption) => {
                return (
                    <div key={indexOption} className={cx('option-wrapper')}>
                        <CheckBoxOutlineBlankIcon style={{ color: '#bdbdbd' }} />
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
                        {optionsLength + Number(isHasOther) > 1 && isActiveQuestion && (
                            <CloseIcon
                                style={{ cursor: 'pointer', color: 'rgb(95, 99, 104)' }}
                                onClick={() => dispatchApp(handleRemoveOption({ indexQuestion, indexOption }))}
                            />
                        )}
                    </div>
                );
            })}
            {isHasOther && (
                <div className={cx('option-wrapper')}>
                    <CheckBoxOutlineBlankIcon style={{ color: '#bdbdbd' }} />
                    <div style={{ flex: '1' }}>
                        <div className={cx('other')}>Khác...</div>
                    </div>
                    {optionsLength + Number(isHasOther) > 1 && isActiveQuestion && (
                        <CloseIcon
                            style={{ cursor: 'pointer', color: 'rgb(95, 99, 104)' }}
                            onClick={() =>
                                dispatchApp(
                                    handleSetHasOther({
                                        indexQuestion,
                                        isHasOther: false,
                                    }),
                                )
                            }
                        />
                    )}
                </div>
            )}
            {isActiveQuestion && (
                <div className={cx('add-option-other')}>
                    <div onClick={() => dispatchApp(handleAddOption({ indexQuestion }))} className={cx('add-option')}>
                        <IoIosAddCircleOutline size={24} />
                        <div>
                            <p>Thêm lựa chọn</p>
                            <div className={cx('underline')}></div>
                        </div>
                    </div>
                    <div className={cx('add-other')} onClick={handleAddOther}>
                        <p>
                            hoặc <span>{'thêm "khác"'}</span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionCheckbox;
