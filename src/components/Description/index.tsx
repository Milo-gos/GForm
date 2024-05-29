import React, { useEffect, useRef, useState } from 'react';
import style from './description.module.scss';
import classNames from 'classnames/bind';
import TextInput from '../NormalTextInput';
import QuestionTextInput from '../QuestionTextInput';
import { useAppDispatch, useAppSelector } from '../../redux';
import { handleChangeDescriptionQuestion } from '../../redux/slice/survey';
const cx = classNames.bind(style);
interface Props {
    isActiveQuestion?: boolean;
    indexQuestion: number;
}
const Description = ({ isActiveQuestion, indexQuestion }: Props) => {
    const question = useAppSelector((state) => state.survey.questions[indexQuestion]);
    const dispatchApp = useAppDispatch();

    return (
        <div className={cx('wrapper')}>
            {question.isHasDescription && (
                <>
                    {isActiveQuestion ? (
                        <QuestionTextInput
                            value={question.description}
                            onChange={(e) =>
                                dispatchApp(
                                    handleChangeDescriptionQuestion({ indexQuestion, description: e.target.value }),
                                )
                            }
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
