import React, { useState } from 'react';
import style from './answerradiobutton.module.scss';
import classNames from 'classnames/bind';
import NormalTextInput from '../NormalTextInput';
import { Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup } from '@mui/material';
import { pink, red } from '@mui/material/colors';
import { useAppDispatch, useAppSelector } from '../../redux';
import { setChooseOther, setOption, setOtherText } from '../../redux/slice/submitform';

const cx = classNames.bind(style);

interface Props {
    indexQuestion: number;
}
const AnswerRadioButton = ({ indexQuestion }: Props) => {
    const question = useAppSelector((state) => state.submitForm.questions[indexQuestion]);
    const dispatchApp = useAppDispatch();

    const [value, setValue] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value;
        setValue(value);
        if (value !== 'Other') {
            const tmpValue = value.split('/')[1];
            dispatchApp(
                setOption({
                    indexQuestion,
                    value: tmpValue,
                }),
            );
        } else {
            dispatchApp(
                setChooseOther({
                    indexQuestion,
                }),
            );
        }
    };

    const handleChangeOptionText = (value: string) => {
        dispatchApp(
            setOtherText({
                indexQuestion,
                otherText: value,
            }),
        );
    };
    return (
        <div className={cx('wrapper')}>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                value={value}
                onChange={handleChange}>
                {question.options?.map((option, index) => {
                    return (
                        <FormControlLabel
                            key={index}
                            value={`${option.id}/${option.optionText}`}
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
                            label={option.optionText}
                        />
                    );
                })}

                {question.isHasOther && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <FormControlLabel
                            value="Other"
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
                            label="Khác:"
                        />
                        <div style={{ flex: '1' }}>
                            <NormalTextInput
                                style={{ padding: '6px 0' }}
                                onChange={(e) => handleChangeOptionText(e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </RadioGroup>
        </div>
    );
};

export default AnswerRadioButton;
