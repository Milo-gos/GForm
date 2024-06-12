import React, { useEffect, useRef, useState } from 'react';
import style from './questionlinearscale.module.scss';
import classNames from 'classnames/bind';
import CloseIcon from '@mui/icons-material/Close';
import { IoIosAddCircleOutline } from 'react-icons/io';
import TextInput from '../NormalTextInput';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import QuestionTextInput from '../QuestionTextInput';
import { useAppDispatch, useAppSelector } from '../../redux';
import { handleChangeLinear } from '../../redux/slice/survey';
import useChangeLinearScaleMutation from '../Question/mutation/changeLinearScale';
import useAutoSave from '../../hooks/useAutoSave';
const cx = classNames.bind(style);
interface Props {
    isActiveQuestion?: boolean;
    indexQuestion: number;
}
const QuestionLinearScale = ({ isActiveQuestion, indexQuestion }: Props) => {
    const dispatchApp = useAppDispatch();
    const linearScale = useAppSelector((state) => state.survey.questions[indexQuestion].linearScale);
    const ChangeLinearMutation = useChangeLinearScaleMutation(linearScale?.id);

    const handleChangeSelectLeft = (e: SelectChangeEvent) => {
        dispatchApp(
            handleChangeLinear({
                min: e.target.value,
                indexQuestion,
            }),
        );
        ChangeLinearMutation.mutate({
            id: linearScale?.id,
            min: e.target.value,
        });
    };
    const handleChangeSelectRight = (e: SelectChangeEvent) => {
        dispatchApp(
            handleChangeLinear({
                max: Number(e.target.value),
                indexQuestion,
            }),
        );
        ChangeLinearMutation.mutate({
            max: Number(e.target.value),
        });
    };
    useAutoSave(linearScale?.leftLabel, () => {
        ChangeLinearMutation.mutate({
            leftLabel: linearScale?.leftLabel,
        });
    });
    useAutoSave(linearScale?.rightLabel, () => {
        ChangeLinearMutation.mutate({
            rightLabel: linearScale?.rightLabel,
        });
    });

    return (
        <div className={cx('wrapper')}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <FormControl
                    sx={{
                        m: 1,
                        minWidth: 65,
                        '& fieldset': {
                            border: 'none',
                        },
                    }}
                    size="small">
                    <Select
                        onChange={handleChangeSelectLeft}
                        value={'' + linearScale!.min}
                        size="small"
                        MenuProps={{ disablePortal: true }}>
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                    </Select>
                </FormControl>
                <span>đến</span>
                <FormControl
                    sx={{
                        m: 1,
                        minWidth: 65,
                        '& fieldset': {
                            border: 'none',
                        },
                    }}
                    size="small">
                    <Select
                        onChange={handleChangeSelectRight}
                        value={'' + linearScale!.max}
                        size="small"
                        MenuProps={{ disablePortal: true }}>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className={cx('label')}>
                <span>1.</span>
                <div style={{ flex: '1' }}>
                    <QuestionTextInput
                        padding="8px 0"
                        placeholder="Nhãn trái (tùy chọn)"
                        value={linearScale?.leftLabel}
                        onChange={(e) =>
                            dispatchApp(
                                handleChangeLinear({
                                    indexQuestion,
                                    leftLabel: e.target.value,
                                }),
                            )
                        }
                    />
                </div>
            </div>
            <div className={cx('label')}>
                <span>6.</span>
                <div style={{ flex: '1' }}>
                    <QuestionTextInput
                        padding="8px 0"
                        placeholder="Nhãn phải (tùy chọn)"
                        value={linearScale?.rightLabel}
                        onChange={(e) =>
                            dispatchApp(
                                handleChangeLinear({
                                    indexQuestion,
                                    rightLabel: e.target.value,
                                }),
                            )
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default QuestionLinearScale;
