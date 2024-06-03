import React from 'react';
import style from './rowradiogroupcomponent.module.scss';
import classNames from 'classnames/bind';
import { Radio } from '@mui/material';

const cx = classNames.bind(style);

const RowRadioGroupComponent = () => {
    const [selectedValue, setSelectedValue] = React.useState('a');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };
    return (
        <tr className={cx('wrapper')}>
            <td>
                <Radio
                    checked={selectedValue === 'a'}
                    onChange={handleChange}
                    value="a"
                    name="row1"
                    sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        color: '#5c6468',
                        '&.Mui-checked': {
                            color: '#fcc934',
                        },
                    }}
                />
            </td>
            <td>
                <Radio
                    checked={selectedValue === 'a'}
                    onChange={handleChange}
                    value="a"
                    name="row1"
                    sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        color: '#5c6468',
                        '&.Mui-checked': {
                            color: '#fcc934',
                        },
                    }}
                />
            </td>
            <td>
                <Radio
                    checked={selectedValue === 'b'}
                    onChange={handleChange}
                    value="b"
                    name="row1"
                    sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        color: '#5c6468',
                        '&.Mui-checked': {
                            color: '#fcc934',
                        },
                    }}
                />
            </td>
            <td>
                <Radio
                    checked={selectedValue === 'c'}
                    onChange={handleChange}
                    value="c"
                    name="row1"
                    sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        color: '#5c6468',
                        '&.Mui-checked': {
                            color: '#fcc934',
                        },
                    }}
                />
            </td>
            <td>
                <Radio
                    checked={selectedValue === 'c'}
                    onChange={handleChange}
                    value="c"
                    name="row1"
                    sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        color: '#5c6468',
                        '&.Mui-checked': {
                            color: '#fcc934',
                        },
                    }}
                />
            </td>
            <td>
                <Radio
                    checked={selectedValue === 'c'}
                    onChange={handleChange}
                    value="c"
                    name="row1"
                    sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        color: '#5c6468',
                        '&.Mui-checked': {
                            color: '#fcc934',
                        },
                    }}
                />
            </td>
            <td>
                <Radio
                    checked={selectedValue === 'c'}
                    onChange={handleChange}
                    value="c"
                    name="row1"
                    sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        color: '#5c6468',
                        '&.Mui-checked': {
                            color: '#fcc934',
                        },
                    }}
                />
            </td>
            <td>
                <Radio
                    checked={selectedValue === 'c'}
                    onChange={handleChange}
                    value="c"
                    name="row1"
                    sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        color: '#5c6468',
                        '&.Mui-checked': {
                            color: '#fcc934',
                        },
                    }}
                />
            </td>
            <td>
                <Radio
                    checked={selectedValue === 'c'}
                    onChange={handleChange}
                    value="c"
                    name="row1"
                    sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        color: '#5c6468',
                        '&.Mui-checked': {
                            color: '#fcc934',
                        },
                    }}
                />
            </td>
            <td>
                <Radio
                    checked={selectedValue === 'c'}
                    onChange={handleChange}
                    value="c"
                    name="row1"
                    sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        color: '#5c6468',
                        '&.Mui-checked': {
                            color: '#fcc934',
                        },
                    }}
                />
            </td>
            <td>
                <Radio
                    checked={selectedValue === 'c'}
                    onChange={handleChange}
                    value="c"
                    name="row1"
                    sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        color: '#5c6468',
                        '&.Mui-checked': {
                            color: '#fcc934',
                        },
                    }}
                />
            </td>
            <td>
                <Radio
                    checked={selectedValue === 'c'}
                    onChange={handleChange}
                    value="c"
                    name="row1"
                    sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        color: '#5c6468',
                        '&.Mui-checked': {
                            color: '#fcc934',
                        },
                    }}
                />
            </td>
            <td>
                <Radio
                    checked={selectedValue === 'c'}
                    onChange={handleChange}
                    value="c"
                    name="row1"
                    sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        color: '#5c6468',
                        '&.Mui-checked': {
                            color: '#fcc934',
                        },
                    }}
                />
            </td>
            <td>
                <Radio
                    checked={selectedValue === 'c'}
                    onChange={handleChange}
                    value="c"
                    name="row1"
                    sx={{
                        '& .MuiSvgIcon-root': { fontSize: 28 },
                        color: '#5c6468',
                        '&.Mui-checked': {
                            color: '#fcc934',
                        },
                    }}
                />
            </td>
        </tr>
    );
};

export default RowRadioGroupComponent;
