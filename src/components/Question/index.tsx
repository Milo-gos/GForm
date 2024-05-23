import React, { useEffect, useRef, useState } from 'react';
import style from './question.module.scss';
import classNames from 'classnames/bind';
import TextInput from '../TextInput';
import BottomQuestion from '../BottomQuestion';
import QuestionType from '../../utils/questionType';
import QuestionShortAnswer from '../QuestionShortAnswer';
import QuestionParagraph from '../QuestionParagraph';
import QuestionDropDown from '../QuestionDropDown';
import QuestionCheckbox from '../QuestionCheckbox';
import QuestionRadioButton from '../QuestionRadioButton';
import QuestionLinearScale from '../QuestionLinearScale';
const cx = classNames.bind(style);

interface Props {
    type?: string;
}
const Question = ({ type }: Props) => {
    const [isActiveQuestion, setActiveQuestion] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setTimeout(() => {
                    setActiveQuestion(false);
                }, 200);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);
    useEffect(() => {
        if (isActiveQuestion) {
            const topElement = ref.current?.offsetTop;
            window.scroll({ top: topElement, behavior: 'smooth' });
        }
    }, [isActiveQuestion]);

    const handleClickInside = () => {
        setActiveQuestion(true);
    };
    return (
        <div
            className={cx('wrapper', {
                isActiveQuestion: isActiveQuestion === true,
            })}
            onClick={handleClickInside}
            ref={ref}>
            {isActiveQuestion ? (
                <TextInput placeholder="Câu hỏi" isActiveQuestion={isActiveQuestion}></TextInput>
            ) : (
                <div className={cx('question')}>Câu hỏi</div>
            )}

            {type === QuestionType.ShortAnswer && <QuestionShortAnswer />}
            {type === QuestionType.Paragraph && <QuestionParagraph />}
            {type === QuestionType.Dropdown && <QuestionDropDown isActiveQuestion={isActiveQuestion} />}
            {type === QuestionType.Checkbox && <QuestionCheckbox isActiveQuestion={isActiveQuestion} />}
            {type === QuestionType.RadioButton && <QuestionRadioButton isActiveQuestion={isActiveQuestion} />}
            {type === QuestionType.LinearScale && <QuestionLinearScale isActiveQuestion={isActiveQuestion} />}

            {/* Question type */}
            {isActiveQuestion && <BottomQuestion />}
        </div>
    );
};

export default Question;
