import React from 'react';
import style from './answercheckbox.module.scss';
import classNames from 'classnames/bind';
import NormalTextInput from '../NormalTextInput';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux';
import { setChooseOther, setMultipleOption, setOtherText } from '../../redux/slice/submitform';

const cx = classNames.bind(style);

interface Props {
    indexQuestion: number;
}
const AnswerCheckbox = ({ indexQuestion }: Props) => {
    const question = useAppSelector((state) => state.submitForm.questions[indexQuestion]);

    const dispatchApp = useAppDispatch();
    const handleChangeChecked = (event: React.ChangeEvent<HTMLInputElement>, optionText?: string) => {
        dispatchApp(
            setMultipleOption({
                indexQuestion,
                value: optionText,
            }),
        );
    };
    const handleChooseOther = () => {
        dispatchApp(
            setChooseOther({
                indexQuestion,
            }),
        );
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
            <FormGroup>
                {question.options?.map((option, index) => {
                    return (
                        <FormControlLabel
                            key={index}
                            control={
                                <Checkbox
                                    onChange={(e) => handleChangeChecked(e, option.optionText)}
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
                            control={
                                <Checkbox
                                    onChange={handleChooseOther}
                                    sx={{
                                        '& .MuiSvgIcon-root': { fontSize: 28 },
                                        color: '#5c6468',
                                        '&.Mui-checked': {
                                            color: '#fcc934',
                                        },
                                    }}
                                />
                            }
                            label={'Khác'}
                        />
                        <div style={{ flex: '1' }}>
                            <NormalTextInput
                                style={{ padding: '6px 0' }}
                                onChange={(e) => handleChangeOptionText(e.target.value)}
                            />
                        </div>
                    </div>
                )}
            </FormGroup>
        </div>
    );
};

export default AnswerCheckbox;
