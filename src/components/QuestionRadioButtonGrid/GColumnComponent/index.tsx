import React, { useEffect, useState } from 'react';
import QuestionTextInput from '../../QuestionTextInput';
import { useAppDispatch, useAppSelector } from '../../../redux';
import { handleChangeGColumnContent, handleChangeOptionText } from '../../../redux/slice/survey';
import useAutoSave from '../../../hooks/useAutoSave';
import { Autosave, useAutosave } from 'react-autosave';
import useChangeGColumnMutation from '../../Question/mutation/changeGColumnContent';

interface Props {
    isActiveQuestion?: boolean;
    indexQuestion: number;
    indexGColumn: number;
}
const GColumnComponent = ({ indexQuestion, indexGColumn, isActiveQuestion }: Props) => {
    const dispatchApp = useAppDispatch();
    const gcolumn = useAppSelector((state) => state.survey.questions![indexQuestion]?.gcolumns![indexGColumn]);
    const ChangeGColumn = useChangeGColumnMutation(gcolumn.id);

    useAutoSave(gcolumn.gcolumnContent, () => {
        ChangeGColumn.mutate(
            {
                gcolumnContent: gcolumn.gcolumnContent,
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
            value={gcolumn.gcolumnContent}
            onChange={(e) => {
                dispatchApp(
                    handleChangeGColumnContent({
                        indexQuestion,
                        indexGColumn,
                        gcolumnContent: e.target.value,
                    }),
                );
            }}
        />
    );
};

export default GColumnComponent;
