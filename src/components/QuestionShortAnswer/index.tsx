import React, { useEffect, useRef, useState } from 'react';
import style from './questionshortanswer.module.scss';
import classNames from 'classnames/bind';
import TextInput from '../TextInput';
const cx = classNames.bind(style);

const QuestionShortAnswer = () => {
    const [isActive, setActive] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setActive(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);
    const handleClickInside = () => {
        setActive(true);
    };
    return (
        <div className={cx('wrapper')} onClick={handleClickInside} ref={ref}>
            {isActive ? (
                <TextInput placeholder="Câu hỏi" isActiveQuestion={isActive}></TextInput>
            ) : (
                <div className={cx('question')}>Câu hỏi</div>
            )}

            <div className={cx('answer')}>Câu trả lời ngắn</div>
        </div>
    );
};

export default QuestionShortAnswer;
