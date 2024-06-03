import React from 'react';
import style from './answerdropdown.module.scss';
import classNames from 'classnames/bind';
import NormalTextInput from '../NormalTextInput';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

const cx = classNames.bind(style);

const AnswerDropdown = () => {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
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
                    value={age}
                    label="Age"
                    onChange={handleChange}
                    MenuProps={{ disablePortal: true }}>
                    <MenuItem value={10} style={{ height: 50 }}>
                        Ten
                    </MenuItem>
                    <MenuItem value={20} style={{ height: 50 }}>
                        Twenty
                    </MenuItem>
                    <MenuItem value={30} style={{ height: 50 }}>
                        Thirty
                    </MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default AnswerDropdown;
