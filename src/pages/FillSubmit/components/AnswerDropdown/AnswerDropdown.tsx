import React from 'react';
import classNames from 'classnames/bind';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../redux';
import { setErrorQuestion, setOption } from '../../../../redux/slice/submitform';

interface Props {
    indexQuestion: number;
}
const AnswerDropdown = ({ indexQuestion }: Props) => {
    const question = useAppSelector((state) => state.submitForm.questions[indexQuestion]);
    const answer = useAppSelector((state) => state.submitForm.infoSubmit?.answers[indexQuestion]);

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
    const handleBlurSelect = () => {
        if (!answer?.singleOption) {
            dispatchApp(
                setErrorQuestion({
                    indexQuestion,
                    errorMessage: 'Câu hỏi này là bắt buộc',
                }),
            );
        }
    };
    return (
        <div style={{ width: '260px' }}>
            <FormControl
                sx={{
                    m: 1,
                    width: 200,
                }}
                size="medium">
                <InputLabel>Chọn</InputLabel>
                <Select
                    id="demo-simple-select"
                    onBlur={handleBlurSelect}
                    value={value}
                    label="Chọn"
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
