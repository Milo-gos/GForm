import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../redux';
import useChangeOptionMutation from '../../../../mutation/changeOptionText';
import useAutoSave from '../../../../../../hooks/useAutoSave';
import QuestionTextInput from '../QuestionTextInput';
import { handleChangeOptionText } from '../../../../../../redux/slice/unitSurvey';
import { setOpenSnackbar } from '../../../../../../redux/slice/global';

interface Props {
    isActiveQuestion?: boolean;
    indexQuestion: number;
    indexOption: number;
}
const OptionComponent = ({ indexQuestion, indexOption, isActiveQuestion }: Props) => {
    const dispatchApp = useAppDispatch();
    const option = useAppSelector((state) => state.survey.questions![indexQuestion]?.options![indexOption]);
    const isEdit = useAppSelector((state) => state.survey.isEdit);
    const ChangeOption = useChangeOptionMutation(option.id);

    useAutoSave(option.optionText, () => {
        ChangeOption.mutate(
            {
                id: option.id,
                optionText: option.optionText,
            },

            {
                onError(error, variables, context) {
                    console.log(error);
                },
            },
        );
    });

    return (
        <QuestionTextInput
            isActiveQuestion={isActiveQuestion}
            value={option.optionText}
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
                    handleChangeOptionText({
                        indexQuestion,
                        indexOption,
                        optionText: e.target.value,
                    }),
                );
            }}
        />
    );
};

export default OptionComponent;
