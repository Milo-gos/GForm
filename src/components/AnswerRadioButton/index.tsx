import React, { useState } from 'react';
import style from './answerradiobutton.module.scss';
import classNames from 'classnames/bind';
import NormalTextInput from '../NormalTextInput';
import { Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup } from '@mui/material';
import { pink, red } from '@mui/material/colors';

const cx = classNames.bind(style);

const AnswerRadioButton = () => {
    const [value, setValue] = React.useState('female');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value;
        setValue(value);
    };
    return (
        <div className={cx('wrapper')}>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                value={value}
                onChange={handleChange}>
                <FormControlLabel
                    value="female"
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
                    label="Female"
                />
                <FormControlLabel
                    value="male"
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
                    label="Male"
                />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FormControlLabel
                        value="other"
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
                        label="Other:"
                    />
                    <div style={{ flex: '1' }}>
                        <NormalTextInput style={{ padding: '6px 0' }} />
                    </div>
                </div>
            </RadioGroup>
        </div>
    );
};

export default AnswerRadioButton;
