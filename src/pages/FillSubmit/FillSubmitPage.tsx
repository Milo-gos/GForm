import React, { useEffect } from 'react';
import style from './fillsubmit.module.scss';
import classNames from 'classnames/bind';
import { MyButton } from '../../components';
import { useAppDispatch, useAppSelector } from '../../redux';
import useCreateResponseMutation from './mutation/createResponse';
import { useNavigate, useParams } from 'react-router-dom';
import { setErrorQuestion, setSurveySubmit } from '../../redux/slice/submitform';
import { useQuery } from '@tanstack/react-query';
import { getPublicSurveyById } from '../../API/axios';
import { setLoading } from '../../redux/slice/global';
import Answer from './components/Answer';
import QuestionType from '../../utils/interfaces/questionType';
import { MoonLoader } from 'react-spinners';

const cx = classNames.bind(style);

const FillSubmitPage = () => {
    const dispatchApp = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const surveySubmit = useAppSelector((state) => state.submitForm);
    const answers = useAppSelector((state) => state.submitForm.infoSubmit?.answers);

    const { data, isLoading, isSuccess, isError } = useQuery({
        queryKey: [`getPublicSurveyById_${id}`],
        queryFn: () => getPublicSurveyById(id!),
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
            if (!data.isAccepting) {
                navigate(`/surveys/${id}/closedForm`, {
                    replace: true,
                });
                return;
            }
            dispatchApp(
                setSurveySubmit({
                    survey: data,
                }),
            );
        }
    }, [data, dispatchApp]);

    const CreateResponseMutation = useCreateResponseMutation();
    const checkError = (): boolean => {
        let isError = false;
        for (let i = 0; i < surveySubmit.questions.length; i++) {
            const question = surveySubmit.questions[i];
            if (
                question.questionType === QuestionType.ShortAnswer ||
                question.questionType === QuestionType.Paragraph
            ) {
                if (question.isRequired) {
                    if (!answers![i].answerText?.trim()) {
                        isError = true;
                        dispatchApp(
                            setErrorQuestion({
                                indexQuestion: i,
                                errorMessage: 'Câu hỏi này là bắt buộc',
                            }),
                        );
                    }
                }
            }

            if (question.questionType === QuestionType.RadioButton) {
                if (question.isRequired) {
                    if (!answers![i].singleOption && !answers![i].isChooseOther) {
                        isError = true;
                        dispatchApp(
                            setErrorQuestion({
                                indexQuestion: i,
                                errorMessage: 'Câu hỏi này là bắt buộc',
                            }),
                        );
                    }
                }
            }

            if (question.questionType === QuestionType.Dropdown) {
                if (question.isRequired) {
                    if (!answers![i].singleOption) {
                        isError = true;
                        dispatchApp(
                            setErrorQuestion({
                                indexQuestion: i,
                                errorMessage: 'Câu hỏi này là bắt buộc',
                            }),
                        );
                    }
                }
            }

            if (question.questionType === QuestionType.LinearScale) {
                if (question.isRequired) {
                    if (!answers![i].linearValue) {
                        isError = true;
                        dispatchApp(
                            setErrorQuestion({
                                indexQuestion: i,
                                errorMessage: 'Câu hỏi này là bắt buộc',
                            }),
                        );
                    }
                }
            }

            if (question.questionType === QuestionType.Checkbox) {
                if (question.isRequired) {
                    if (
                        (!answers![i].multiChooseOption || answers![i].multiChooseOption?.length === 0) &&
                        !answers![i].isChooseOther
                    ) {
                        isError = true;
                        dispatchApp(
                            setErrorQuestion({
                                indexQuestion: i,
                                errorMessage: 'Câu hỏi này là bắt buộc',
                            }),
                        );
                    }
                }
            }

            if (question.questionType === QuestionType.RadioButtonGrid) {
                if (question.isRequired) {
                    if (!answers![i].multiChooseGrid || answers![i].multiChooseGrid?.length === 0) {
                        isError = true;
                        dispatchApp(
                            setErrorQuestion({
                                indexQuestion: i,
                                errorMessage: 'Mỗi hàng phải có ít nhất một câu trả lời',
                            }),
                        );
                    }
                    const isErrorGrid = answers![i].multiChooseGrid?.some((row) => !row.gcolumn);
                    if (isErrorGrid) {
                        isError = true;
                        dispatchApp(
                            setErrorQuestion({
                                indexQuestion: i,
                                errorMessage: 'Mỗi hàng phải có ít nhất một câu trả lời',
                            }),
                        );
                    }
                }
            }
        }
        return isError;
    };
    const handleClickSubmit = () => {
        const isError = checkError();
        if (isError) return;
        CreateResponseMutation.mutate(surveySubmit.infoSubmit, {
            onSuccess() {
                navigate(`/surveys/${id}/submitSuccess`);
            },
        });
    };
    return (
        <div className={cx('wrapper')}>
            {data && (
                <>
                    <div className={cx('background')}>
                        <img src={data.backgroundImage} />
                    </div>

                    <div className={cx('form-header')}>
                        <h2>{surveySubmit.title}</h2>
                        <p>{surveySubmit.description}</p>
                    </div>
                    {surveySubmit.questions?.map((quesiton, index) => <Answer key={quesiton.id} index={index} />)}

                    <div style={{ width: '120px', marginTop: '8px' }}>
                        <MyButton textButton="Submit" padding="12px 0" onClick={handleClickSubmit} />
                    </div>
                </>
            )}
        </div>
    );
};

export default FillSubmitPage;
