import React, { useEffect, useRef, useState } from 'react';
import style from './description.module.scss';
import classNames from 'classnames/bind';
import QuestionTextInput from '../QuestionTextInput';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/store';
import { handleChangeDescriptionQuestion } from '../../../../../../redux/slice/unitSurvey';
import { setOpenSnackbar } from '../../../../../../redux/slice/global';

const cx = classNames.bind(style);
interface Props {
    isActiveQuestion?: boolean;
    indexQuestion: number;
}
const Description = ({ isActiveQuestion, indexQuestion }: Props) => {
    const question = useAppSelector((state) => state.survey.questions[indexQuestion]);
    const isEdit = useAppSelector((state) => state.survey.isEdit);

    const dispatchApp = useAppDispatch();

    return (
        <div className={cx('wrapper')}>
            {question.isHasDescription && (
                <>
                    {isActiveQuestion ? (
                        <QuestionTextInput
                            value={question.description}
                            onChange={(e) => {
                                if (!isEdit) {
                                    dispatchApp(
                                        setOpenSnackbar({
                                            value: true,
                                            message: 'Bạn không có quyền chỉnh sửa',
                                        }),
                                    );
                                    return;
                                }
                                dispatchApp(
                                    handleChangeDescriptionQuestion({ indexQuestion, description: e.target.value }),
                                );
                            }}
                            placeholder="Mô tả (tùy chọn)"
                            isActiveQuestion={isActiveQuestion}></QuestionTextInput>
                    ) : (
                        <div className={cx('description')}>{question.description || 'Mô tả (tùy chọn)'}</div>
                    )}
                </>
            )}
        </div>
    );
};

export default Description;
