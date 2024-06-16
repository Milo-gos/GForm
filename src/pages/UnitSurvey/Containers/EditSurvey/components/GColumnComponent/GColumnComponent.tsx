import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../redux';
import useChangeGColumnMutation from '../Question/mutation/changeGColumnContent';
import useAutoSave from '../../../../../../hooks/useAutoSave';
import QuestionTextInput from '../QuestionTextInput';
import { handleChangeGColumnContent } from '../../../../../../redux/slice/survey';

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
                id: gcolumn.id,
                gcolumnContent: gcolumn.gcolumnContent,
            },

            {
                onError(error) {
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
