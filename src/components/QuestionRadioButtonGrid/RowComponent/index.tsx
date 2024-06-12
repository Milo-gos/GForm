import React, { useEffect, useState } from 'react';
import QuestionTextInput from '../../QuestionTextInput';
import { useAppDispatch, useAppSelector } from '../../../redux';
import { handleChangeOptionText, handleChangeRowContent } from '../../../redux/slice/survey';
import useAutoSave from '../../../hooks/useAutoSave';
import { Autosave, useAutosave } from 'react-autosave';
import useChangeRowMutation from '../../Question/mutation/changeRowContent copy';

interface Props {
    isActiveQuestion?: boolean;
    indexQuestion: number;
    indexRow: number;
}
const RowComponent = ({ indexQuestion, indexRow, isActiveQuestion }: Props) => {
    const dispatchApp = useAppDispatch();
    const row = useAppSelector((state) => state.survey.questions![indexQuestion]?.rows![indexRow]);
    const ChangeRow = useChangeRowMutation(row.id);

    useAutoSave(row.rowContent, () => {
        ChangeRow.mutate(
            {
                id: row.id,
                rowContent: row.rowContent,
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
            value={row.rowContent}
            onChange={(e) => {
                dispatchApp(
                    handleChangeRowContent({
                        indexQuestion,
                        indexRow,
                        rowContent: e.target.value,
                    }),
                );
            }}
        />
    );
};

export default RowComponent;
