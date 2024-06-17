import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../redux';
import useAutoSave from '../../../../../../hooks/useAutoSave';
import QuestionTextInput from '../QuestionTextInput';
import { handleChangeRowContent } from '../../../../../../redux/slice/unitSurvey';
import useChangeRowMutation from '../../../../mutation/changeRowContent';
import { setOpenSnackbar } from '../../../../../../redux/slice/global';

interface Props {
    isActiveQuestion?: boolean;
    indexQuestion: number;
    indexRow: number;
}
const RowComponent = ({ indexQuestion, indexRow, isActiveQuestion }: Props) => {
    const dispatchApp = useAppDispatch();
    const row = useAppSelector((state) => state.survey.questions![indexQuestion]?.rows![indexRow]);
    const isEdit = useAppSelector((state) => state.survey.isEdit);

    const ChangeRow = useChangeRowMutation(row.id);

    useAutoSave(row.rowContent, () => {
        ChangeRow.mutate(
            {
                id: row.id,
                rowContent: row.rowContent,
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
            value={row.rowContent}
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
