import React from 'react';
import classNames from 'classnames/bind';
import { Radio } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../redux';
import RowInterface from '../../../../utils/interfaces/row';
import { setMultiChooseGColumn } from '../../../../redux/slice/submitform';

interface Props {
    indexQuestion: number;
    row: RowInterface;
    indexRow: number;
}
const RowRadioGroupComponent = ({ indexQuestion, row, indexRow }: Props) => {
    const question = useAppSelector((state) => state.submitForm.questions[indexQuestion]);
    const dispatchApp = useAppDispatch();
    const [selectedValue, setSelectedValue] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const tmpValue = value.split('/')[1];
        setSelectedValue(value);
        dispatchApp(
            setMultiChooseGColumn({
                indexQuestion,
                indexRow,
                value: tmpValue,
            }),
        );
    };
    return (
        <tr>
            {question.gcolumns?.map((gcolumn, index) => {
                return (
                    <td key={index}>
                        <Radio
                            checked={selectedValue === `${gcolumn.id}/${gcolumn.gcolumnContent}`}
                            onChange={handleChange}
                            value={`${gcolumn.id}/${gcolumn.gcolumnContent}`}
                            name={row.rowContent}
                            sx={{
                                '& .MuiSvgIcon-root': { fontSize: 28 },
                                color: '#5c6468',
                                '&.Mui-checked': {
                                    color: '#fcc934',
                                },
                            }}
                        />
                    </td>
                );
            })}
        </tr>
    );
};

export default RowRadioGroupComponent;
