import React from 'react';
import style from '../submitform.module.scss';
import classNames from 'classnames/bind';
import { Answer, MyButton } from '../../../components';
import QuestionType from '../../../utils/interfaces/questionType';
import { useAppDispatch, useAppSelector } from '../../../redux';
import useCreateResponseMutation from '../mutation/createResponse';
import { useNavigate, useParams } from 'react-router-dom';

const cx = classNames.bind(style);

const SubmitFormInner = () => {
    const survey = useAppSelector((state) => state.submitForm);
    const submit = useAppSelector((state) => state.submitForm.submit);
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatchApp = useAppDispatch();
    const CreateResponseMutation = useCreateResponseMutation();
    const handleClickSubmit = () => {
        CreateResponseMutation.mutate(submit, {
            onSuccess(data, variables, context) {
                navigate(`/surveys/${id}/submitSuccess`);
            },
        });
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('background')}>
                <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" />
            </div>

            <div className={cx('form-header')}>
                <h2>{survey.title}</h2>
                <p>{survey.description}</p>
            </div>
            {survey.questions?.map((quesiton, index) => <Answer key={quesiton.id} index={index} />)}

            <div style={{ width: '120px', marginTop: '8px' }}>
                <MyButton textButton="Submit" padding="12px 0" onClick={handleClickSubmit} />
            </div>
        </div>
    );
};

export default SubmitFormInner;
