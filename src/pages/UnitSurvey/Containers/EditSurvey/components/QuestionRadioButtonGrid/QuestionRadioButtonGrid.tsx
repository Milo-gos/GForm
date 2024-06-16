import React, { useEffect, useRef, useState } from 'react';
import style from './questionradiobuttongrid.module.scss';
import classNames from 'classnames/bind';
import CloseIcon from '@mui/icons-material/Close';
import { IoIosAddCircleOutline } from 'react-icons/io';

import QuestionTextInput from '../QuestionTextInput';
import { useAppDispatch, useAppSelector } from '../../../../../../redux';
import useAddRowMutation from '../Question/mutation/addRow';
import {
    handleAddGColumn,
    handleAddRow,
    handleRemoveGColumn,
    handleRemoveRow,
    handleSetGColumn,
    handleSetRow,
} from '../../../../../../redux/slice/survey';
import useDeleteRowMutation from '../Question/mutation/deleteRow';
import useAddGColumnMutation from '../Question/mutation/addGColumn';
import useDeleteGColumnMutation from '../Question/mutation/deleteGColumn';
import RowComponent from '../RowComponent';
import GColumnComponent from '../GColumnComponent';
const cx = classNames.bind(style);
interface Props {
    isActiveQuestion?: boolean;
    indexQuestion: number;
}
const QuestionRadioButtonGrid = ({ isActiveQuestion, indexQuestion }: Props) => {
    const question = useAppSelector((state) => state.survey.questions[indexQuestion]);
    const rowLength = question?.rows ? question.rows.length : 0;
    const gcolumnLength = question?.gcolumns ? question.gcolumns.length : 0;
    const dispatchApp = useAppDispatch();

    const AddRow = useAddRowMutation(question.id);
    const handleClickAddRow = () => {
        dispatchApp(handleAddRow({ indexQuestion }));
        AddRow.mutate(
            {
                questionId: question.id,
                rowContent: `Hàng ${question.rows!.length + 1}`,
            },

            {
                onSuccess(data, variables, context) {
                    dispatchApp(
                        handleSetRow({
                            indexQuestion,
                            row: data,
                        }),
                    );
                },
            },
        );
    };
    const DeleteRowMutation = useDeleteRowMutation();
    const handleClickRemoveRow = (indexRow: number, rowId?: string) => {
        dispatchApp(handleRemoveRow({ indexQuestion, indexRow }));

        DeleteRowMutation.mutate(rowId!);
    };

    const AddGColumn = useAddGColumnMutation(question.id);
    const handleClickAddGColumn = () => {
        dispatchApp(handleAddGColumn({ indexQuestion }));
        AddGColumn.mutate(
            {
                questionId: question.id,
                gcolumnContent: `Cột ${question.gcolumns!.length + 1}`,
            },

            {
                onSuccess(data, variables, context) {
                    dispatchApp(
                        handleSetGColumn({
                            indexQuestion,
                            gcolumn: data,
                        }),
                    );
                },
            },
        );
    };
    const DeleteGColumnMutation = useDeleteGColumnMutation();
    const handleClickRemoveGColumn = (indexGColumn: number, gcolumnId?: string) => {
        dispatchApp(handleRemoveGColumn({ indexQuestion, indexGColumn }));

        DeleteGColumnMutation.mutate(gcolumnId!);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('col')}>
                <div className={cx('head')}>Hàng</div>
                {question.rows?.map((item, indexRow) => {
                    return (
                        <div key={indexRow} className={cx('option-wrapper')}>
                            <span>{indexRow + 1}.</span>
                            <div style={{ flex: '1' }}>
                                <RowComponent
                                    indexQuestion={indexQuestion}
                                    isActiveQuestion={isActiveQuestion}
                                    indexRow={indexRow}
                                />
                            </div>
                            {rowLength > 1 && isActiveQuestion && (
                                <CloseIcon
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleClickRemoveRow(indexRow, item.id)}
                                />
                            )}
                        </div>
                    );
                })}
                {isActiveQuestion && (
                    <div className={cx('add-option')} onClick={handleClickAddRow}>
                        <IoIosAddCircleOutline size={24} />
                        <div>
                            <p>Thêm hàng</p>
                            <div className={cx('underline')}></div>
                        </div>
                    </div>
                )}
            </div>

            <div className={cx('col')}>
                <div className={cx('head')}>Cột</div>
                {question.gcolumns?.map((item, indexGColumn) => {
                    return (
                        <div key={indexGColumn} className={cx('option-wrapper')}>
                            <span>{indexGColumn + 1}.</span>
                            <div style={{ flex: '1' }}>
                                <GColumnComponent
                                    indexQuestion={indexQuestion}
                                    isActiveQuestion={isActiveQuestion}
                                    indexGColumn={indexGColumn}
                                />
                            </div>
                            {gcolumnLength > 1 && isActiveQuestion && (
                                <CloseIcon
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleClickRemoveGColumn(indexGColumn, item.id)}
                                />
                            )}
                        </div>
                    );
                })}
                {isActiveQuestion && (
                    <div className={cx('add-option')} onClick={handleClickAddGColumn}>
                        <IoIosAddCircleOutline size={24} />
                        <div>
                            <p>Thêm cột</p>
                            <div className={cx('underline')}></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuestionRadioButtonGrid;
