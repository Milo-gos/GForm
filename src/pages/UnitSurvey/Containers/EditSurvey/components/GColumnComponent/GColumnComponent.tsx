import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/store';
import { useAutoSave } from '../../../../../../hooks';
import QuestionTextInput from '../QuestionTextInput';
import { handleChangeGColumnContent } from '../../../../../../redux/slice/unitSurvey';
import { setOpenSnackbar } from '../../../../../../redux/slice/global';
import { useChangeGColumnMutation } from '../../../../../../hooks/api-hooks/mutations';

interface Props {
    isActiveQuestion?: boolean;
    indexQuestion: number;
    indexGColumn: number;
}
const GColumnComponent = ({ indexQuestion, indexGColumn, isActiveQuestion }: Props) => {
    const dispatchApp = useAppDispatch();
    const gcolumn = useAppSelector((state) => state.survey.questions![indexQuestion]?.gcolumns![indexGColumn]);
    const isEdit = useAppSelector((state) => state.survey.isEdit);
    const ChangeGColumn = useChangeGColumnMutation();

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
