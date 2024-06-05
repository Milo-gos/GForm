import React from 'react';
import style from './answerdropdown.module.scss';
import classNames from 'classnames/bind';
import NormalTextInput from '../NormalTextInput';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux';
import { setOption } from '../../redux/slice/submitform';

const cx = classNames.bind(style);

interface Props {
    indexQuestion: number;
}
const AnswerDropdown = ({ indexQuestion }: Props) => {
    const question = useAppSelector((state) => state.submitForm.questions[indexQuestion]);
    const dispatchApp = useAppDispatch();
    const [value, setValue] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        const value = event.target.value as string;
        const tmpValue = value.split('/')[1];
        setValue(value);
        dispatchApp(
            setOption({
                indexQuestion,
                value: tmpValue,
            }),
        );
    };
    return (
        <div className={cx('wrapper')}>
            <FormControl
                sx={{
                    m: 1,
                    width: 200,
                }}
                size="medium">
                <InputLabel>Chọn</InputLabel>
                <Select
                    id="demo-simple-select"
                    value={value}
                    onChange={handleChange}
                    MenuProps={{ disablePortal: true }}>
                    {question.options?.map((option, index) => {
                        return (
                            <MenuItem value={`${option.id}/${option.optionText}`} style={{ height: 50 }} key={index}>
                                {option.optionText}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </div>
    );
};

export default AnswerDropdown;
