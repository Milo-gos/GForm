import React, { useCallback, useMemo } from 'react';
import style from './answerlinearscale.module.scss';
import classNames from 'classnames/bind';
import NormalTextInput from '../NormalTextInput';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux';
import { setLinearValue } from '../../redux/slice/submitform';

const cx = classNames.bind(style);

interface Props {
    indexQuestion: number;
}
const AnswerLinearScale = ({ indexQuestion }: Props) => {
    const question = useAppSelector((state) => state.submitForm.questions[indexQuestion]);
    const dispatchApp = useAppDispatch();
    const [value, setValue] = React.useState('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value;
        setValue(value);
        dispatchApp(
            setLinearValue({
                indexQuestion,
                value: value,
            }),
        );
    };
    const arrayMinMax = useMemo(() => {
        const min = question.linearScale?.min || 0;
        const max = question.linearScale?.max || 0;
        const arr = [];
        for (let i = min; i <= max; i++) {
            arr.push(i);
        }
        return arr;
    }, [question.linearScale?.min, question.linearScale?.max]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <span className={cx('label')}>{question.linearScale?.leftLabel}</span>

                <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    value={value}
                    className={cx('radio-group')}
                    onChange={handleChange}>
                    {arrayMinMax.map((value, index) => {
                        return (
                            <FormControlLabel
                                key={index}
                                style={{ margin: '0' }}
                                value={`${value}`}
                                control={
                                    <Radio
                                        sx={{
                                            '& .MuiSvgIcon-root': { fontSize: 28 },
                                            color: '#5c6468',
                                            '&.Mui-checked': {
                                                color: '#fcc934',
                                            },
                                        }}
                                    />
                                }
                                label={`${value}`}
                                labelPlacement="top"
                            />
                        );
                    })}
                </RadioGroup>

                <span className={cx('label')}>{question.linearScale?.rightLabel}</span>
            </div>
        </div>
    );
};

export default AnswerLinearScale;
