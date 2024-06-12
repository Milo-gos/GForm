import React, { useEffect, useRef, useState } from 'react';
import style from './search.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import classNames from 'classnames/bind';
import { IconButton } from '@mui/material';

const cx = classNames.bind(style);

interface Props {
    placeHolder?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Search = ({ placeHolder, onChange }: Props) => {
    const [focus, setFocus] = useState(false);

    return (
        <div
            className={cx('wrapper', {
                isFocus: focus === true,
            })}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}>
            <SearchIcon className={cx('search-icon')} />
            <input placeholder={placeHolder} onChange={onChange} />
        </div>
    );
};

export default Search;
