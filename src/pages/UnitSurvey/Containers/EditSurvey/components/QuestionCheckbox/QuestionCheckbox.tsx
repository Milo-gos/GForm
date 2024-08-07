import React from 'react';
import style from './question-checkbox.module.scss';
import classNames from 'classnames/bind';
import CloseIcon from '@mui/icons-material/Close';
import { IoIosAddCircleOutline } from 'react-icons/io';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/store';
import {
    handleAddOption,
    handleRemoveOption,
    handleSetHasOther,
    handleSetOption,
} from '../../../../../../redux/slice/unitSurvey';

import OptionComponent from '../OptionComponent';
import { setOpenSnackbar } from '../../../../../../redux/slice/global';
import {
    useAddOptionMutation,
    useChangeQuestionMutation,
    useDeleteOptionMutation,
} from '../../../../../../hooks/api-hooks/mutations';

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

    const ChangeQuestion = useChangeQuestionMutation();
    const handleAddOther = () => {
        if (!isEdit) {
            dispatchApp(
                setOpenSnackbar({
                    value: true,
                    message: 'Bạn không có quyền chỉnh sửa',
                }),
            );
            return;
        }
        if (isHasOther) return;
        dispatchApp(
            handleSetHasOther({
                indexQuestion,
                isHasOther: true,
            }),
        );
        ChangeQuestion.mutate({
            isHasOther: true,
            id: question.id,
        });
    };
    const handleRemoveOther = () => {
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
            handleSetHasOther({
                indexQuestion,
                isHasOther: false,
            }),
        );
        ChangeQuestion.mutate({
            isHasOther: false,
        });
    };

    const AddOption = useAddOptionMutation();
    const handleAdd = () => {
        if (!isEdit) {
            dispatchApp(
                setOpenSnackbar({
                    value: true,
                    message: 'Bạn không có quyền chỉnh sửa',
                }),
            );
            return;
        }
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
        if (!isEdit) {
            dispatchApp(
                setOpenSnackbar({
                    value: true,
                    message: 'Bạn không có quyền chỉnh sửa',
                }),
            );
            return;
        }
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
