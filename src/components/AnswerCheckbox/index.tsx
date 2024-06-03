import React from 'react';
import style from './answercheckbox.module.scss';
import classNames from 'classnames/bind';
import NormalTextInput from '../NormalTextInput';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

const cx = classNames.bind(style);

const AnswerCheckbox = () => {
    return (
        <div className={cx('wrapper')}>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            sx={{
                                '& .MuiSvgIcon-root': { fontSize: 28 },
                                color: '#5c6468',
                                '&.Mui-checked': {
                                    color: '#fcc934',
                                },
                            }}
                        />
                    }
                    label="Label"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            sx={{
                                '& .MuiSvgIcon-root': { fontSize: 28 },
                                color: '#5c6468',
                                '&.Mui-checked': {
                                    color: '#fcc934',
                                },
                            }}
                        />
                    }
                    label="Required"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            sx={{
                                '& .MuiSvgIcon-root': { fontSize: 28 },
                                color: '#5c6468',
                                '&.Mui-checked': {
                                    color: '#fcc934',
                                },
                            }}
                        />
                    }
                    label="Required"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            sx={{
                                '& .MuiSvgIcon-root': { fontSize: 28 },
                                color: '#5c6468',
                                '&.Mui-checked': {
                                    color: '#fcc934',
                                },
                            }}
                        />
                    }
                    label="Required"
                />
            </FormGroup>
        </div>
    );
};

export default AnswerCheckbox;
