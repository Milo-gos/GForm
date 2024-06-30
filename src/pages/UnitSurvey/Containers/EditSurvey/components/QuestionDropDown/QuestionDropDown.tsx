import React from 'react';
import style from './question-dropdown.module.scss';
import classNames from 'classnames/bind';
import CloseIcon from '@mui/icons-material/Close';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/store';
import { handleAddOption, handleRemoveOption, handleSetOption } from '../../../../../../redux/slice/unitSurvey';
import OptionComponent from '../OptionComponent';
import { setOpenSnackbar } from '../../../../../../redux/slice/global';
import { useAddOptionMutation, useDeleteOptionMutation } from '../../../../../../hooks/api-hooks/mutations';
const cx = classNames.bind(style);
interface Props {
    isActiveQuestion?: boolean;
    indexQuestion: number;
}
const QuestionDropDown = ({ isActiveQuestion, indexQuestion }: Props) => {
    const question = useAppSelector((state) => state.survey.questions[indexQuestion]);
    const isEdit = useAppSelector((state) => state.survey.isEdit);
    const optionsLength = question?.options ? question.options.length : 0;
    const dispatchApp = useAppDispatch();

    ////

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
