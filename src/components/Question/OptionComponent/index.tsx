import React, { useEffect, useState } from 'react';
import QuestionTextInput from '../../QuestionTextInput';
import { useAppDispatch, useAppSelector } from '../../../redux';
import { handleChangeOptionText } from '../../../redux/slice/survey';
import useAutoSave from '../../../hooks/useAutoSave';
import useChangeOptionMutation from '../mutation/changeOptionText';
import { Autosave, useAutosave } from 'react-autosave';

interface Props {
    isActiveQuestion?: boolean;
    indexQuestion: number;
    indexOption: number;
}
const OptionComponent = ({ indexQuestion, indexOption, isActiveQuestion }: Props) => {
    const dispatchApp = useAppDispatch();
    const option = useAppSelector((state) => state.survey.questions![indexQuestion]?.options![indexOption]);
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
