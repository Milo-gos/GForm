import React, { useEffect, useRef, useState } from 'react';
import style from './questiondropdown.module.scss';
import classNames from 'classnames/bind';
import CloseIcon from '@mui/icons-material/Close';
import { IoIosAddCircleOutline } from 'react-icons/io';

import QuestionTextInput from '../QuestionTextInput';
import { useAppDispatch, useAppSelector } from '../../redux';
import { handleAddOption, handleChangeOptionText, handleRemoveOption, handleSetOption } from '../../redux/slice/survey';
import useCurrentSurvey from '../../hooks/useCurrentSurvey';
import Option from '../Question/OptionComponent';
import OptionComponent from '../Question/OptionComponent';
import useChangeQuestionMutation from '../Question/mutation/changeQuestion';
import useAddOptionMutation from '../Question/mutation/addOption';
import useDeleteOptionMutation from '../Question/mutation/deleteOption';
const cx = classNames.bind(style);
interface Props {
    isActiveQuestion?: boolean;
    indexQuestion: number;
}
const QuestionDropDown = ({ isActiveQuestion, indexQuestion }: Props) => {
    const question = useAppSelector((state) => state.survey.questions[indexQuestion]);

    const optionsLength = question?.options ? question.options.length : 0;
    const dispatchApp = useAppDispatch();

    ////

    const AddOption = useAddOptionMutation(question.id);
    const handleAdd = () => {
        dispatchApp(handleAddOption({ indexQuestion }));
        AddOption.mutate(
            {
                questionId: question.id,
                optionText: `Lựa chọn ${question.options!.length + 1}`,
            },

            {
                onSuccess(data, variables, context) {
                    dispatchApp(
                        handleSetOption({
                            indexQuestion,
                            option: data,
                        }),
                    );
                },
            },
        );
    };
    const DeleteOptionMutation = useDeleteOptionMutation();
    const handleRemove = (indexOption: number, optionId?: string) => {
        dispatchApp(handleRemoveOption({ indexQuestion, indexOption }));

        DeleteOptionMutation.mutate(optionId!);
    };

    return (
        <div className={cx('wrapper')}>
            {question?.options?.map((option, indexOption) => {
                return (
                    <div key={indexOption} className={cx('option-wrapper')}>
                        <span>{indexOption + 1}.</span>
                        <div style={{ flex: '1' }}>
                            <OptionComponent
                                isActiveQuestion={isActiveQuestion}
                                indexOption={indexOption}
                                indexQuestion={indexQuestion}
                            />
                        </div>
                        {optionsLength > 1 && isActiveQuestion && (
                            <CloseIcon
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleRemove(indexOption, option.id)}
                            />
                        )}
                    </div>
                );
            })}
            {isActiveQuestion && (
                <div className={cx('add-option')} onClick={handleAdd}>
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
