import React from 'react';
import style from './submitform.module.scss';
import classNames from 'classnames/bind';
import { Answer } from '../../components';
import QuestionType from '../../utils/interfaces/questionType';

const cx = classNames.bind(style);

const SubmitFormPage = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('background')}>
                <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" />
            </div>

            <div className={cx('form-header')}>
                <h2>Title</h2>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente ipsam dolorum laborum quos amet,
                    reiciendis, assumenda corrupti unde nulla et a, inventore architecto ducimus? Reiciendis sunt
                    laudantium sit architecto repellat.
                </p>
            </div>

            <Answer questionType={QuestionType.ShortAnswer} />
            <Answer questionType={QuestionType.Paragraph} />
            <Answer questionType={QuestionType.Dropdown} />
            <Answer questionType={QuestionType.Checkbox} />
            <Answer questionType={QuestionType.RadioButton} />
            <Answer questionType={QuestionType.LinearScale} />
            <Answer questionType={QuestionType.RadioButtonGrid} />
        </div>
    );
};

export default SubmitFormPage;
