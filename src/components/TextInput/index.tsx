import React from 'react';
import style from './textinput.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(style);

interface Props {
    placeholder?: string;
    value?: string;
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}
const TextInput = (props: Props) => {
    return (
        <div className={cx('wrapper')}>
            <input type="text" placeholder={props.placeholder}></input>
        </div>
    );
};

export default TextInput;
