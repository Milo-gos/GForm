import React, { useEffect } from 'react';
import style from './fillsubmit.module.scss';
import classNames from 'classnames/bind';
import { MyButton } from '../../components';
import { useAppDispatch, useAppSelector } from '../../redux';
import useCreateResponseMutation from './mutation/createResponse';
import { useNavigate, useParams } from 'react-router-dom';
import { setSurveySubmit } from '../../redux/slice/submitform';
import { useQuery } from '@tanstack/react-query';
import { getSurveyById } from '../../utils/API/axios';
import { setLoading } from '../../redux/slice/global';
import Answer from './components/Answer';

const cx = classNames.bind(style);

const FillSubmitPage = () => {
    const dispatchApp = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const surveySubmit = useAppSelector((state) => state.submitForm);

    const { data, isLoading, isSuccess, isError } = useQuery({
        queryKey: [`getSurveyById_${id}`],
        queryFn: () => getSurveyById(id!),
        refetchOnWindowFocus: false,
        retry: 0,
    });

    useEffect(() => {
        if (isLoading) {
            dispatchApp(setLoading(true));
        }
        if (isSuccess || isError) {
            dispatchApp(setLoading(false));
        }
    }, [isLoading, isSuccess, isError, dispatchApp]);

    useEffect(() => {
        if (data) {
            dispatchApp(
                setSurveySubmit({
                    survey: data,
                }),
            );
        }
    }, [data, dispatchApp]);

    const CreateResponseMutation = useCreateResponseMutation();
    const handleClickSubmit = () => {
        CreateResponseMutation.mutate(surveySubmit.infoSubmit, {
            onSuccess() {
                navigate(`/surveys/${id}/submitSuccess`);
            },
        });
    };

    if (!data) return <></>;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('background')}>
                <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" />
            </div>

            <div className={cx('form-header')}>
                <h2>{surveySubmit.title}</h2>
                <p>{surveySubmit.description}</p>
            </div>
            {surveySubmit.questions?.map((quesiton, index) => <Answer key={quesiton.id} index={index} />)}

            <div style={{ width: '120px', marginTop: '8px' }}>
                <MyButton textButton="Submit" padding="12px 0" onClick={handleClickSubmit} />
            </div>
        </div>
    );
};

export default FillSubmitPage;
