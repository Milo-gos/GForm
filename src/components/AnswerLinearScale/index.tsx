import React from 'react';
import style from './answerlinearscale.module.scss';
import classNames from 'classnames/bind';
import NormalTextInput from '../NormalTextInput';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

const cx = classNames.bind(style);

const AnswerLinearScale = () => {
    const [value, setValue] = React.useState('female');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value;
        setValue(value);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <span className={cx('label')}>Left</span>

                <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="0"
                    name="radio-buttons-group"
                    value={value}
                    className={cx('radio-group')}
                    onChange={handleChange}>
                    <FormControlLabel
                        style={{ margin: '0' }}
                        value="0"
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
                        label="1"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        style={{ margin: '0' }}
                        value="1"
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
                        label="1"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        style={{ margin: '0' }}
                        value="1"
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
                        label="1"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        style={{ margin: '0' }}
                        value="1"
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
                        label="1"
                        labelPlacement="top"
                    />
                </RadioGroup>

                <span className={cx('label')}>Right</span>
            </div>
        </div>
    );
};

export default AnswerLinearScale;
