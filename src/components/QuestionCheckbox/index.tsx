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
    handleSetOption,
} from '../../redux/slice/survey';
import OptionComponent from '../Question/OptionComponent';
import useDeleteOptionMutation from '../Question/mutation/deleteOption';
import useAddOptionMutation from '../Question/mutation/addOption';
import useChangeQuestionMutation from '../Question/mutation/changeQuestion';

const cx = classNames.bind(style);
interface Props {
    isActiveQuestion?: boolean;
    indexQuestion: number;
}

const QuestionCheckbox = ({ isActiveQuestion, indexQuestion }: Props) => {
    const question = useAppSelector((state) => state.survey.questions[indexQuestion]);
    const isEdit = useAppSelector((state) => state.survey.isEdit);
    const optionsLength = question.options ? question.options.length : 0;
    const isHasOther = question.isHasOther;
    const dispatchApp = useAppDispatch();

    //////////////////////////////////
    const ChangeQuestion = useChangeQuestionMutation(question.id || '');
    const handleAddOther = () => {
        if (!isEdit) return;
        if (isHasOther) return;
        dispatchApp(
            handleSetHasOther({
                indexQuestion,
                isHasOther: true,
            }),
        );
        ChangeQuestion.mutate({
            isHasOther: true,
        });
    };
    const handleRemoveOther = () => {
        if (!isEdit) return;
        dispatchApp(
            handleSetHasOther({
                indexQuestion,
                isHasOther: false,
            }),
        );
        ChangeQuestion.mutate({
            isHasOther: false,
        });
    };

    const AddOption = useAddOptionMutation(question.id);
    const handleAdd = () => {
        if (!isEdit) return;
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
        if (!isEdit) return;
        dispatchApp(handleRemoveOption({ indexQuestion, indexOption }));

        DeleteOptionMutation.mutate(optionId!);
    };
    return (
        <div className={cx('wrapper')}>
            {question.options?.map((option, indexOption) => {
                return (
                    <div key={indexOption} className={cx('option-wrapper')}>
                        <CheckBoxOutlineBlankIcon style={{ color: '#bdbdbd' }} />
                        <div style={{ flex: '1' }}>
                            <OptionComponent
                                isActiveQuestion={isActiveQuestion}
                                indexOption={indexOption}
                                indexQuestion={indexQuestion}
                            />
                        </div>
                        {optionsLength + Number(isHasOther) > 1 && isActiveQuestion && (
                            <CloseIcon
                                style={{ cursor: 'pointer', color: 'rgb(95, 99, 104)' }}
                                onClick={() => handleRemove(indexOption, option.id)}
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
                            onClick={handleRemoveOther}
                        />
                    )}
                </div>
            )}
            {isActiveQuestion && (
                <div className={cx('add-option-other')}>
                    <div onClick={handleAdd} className={cx('add-option')}>
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
