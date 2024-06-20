import React, { useEffect, useRef, useState } from 'react';
import style from './editsurvey.module.scss';
import classNames from 'classnames/bind';
import { useAppDispatch, useAppSelector } from '../../../../redux';
import {
    handleActiveQuestion,
    handleChangeDescription,
    handleChangeTitle,
    handleInsertQuestion,
    handleSetNewQuestion,
    setSurvey,
} from '../../../../redux/slice/unitSurvey';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import useAutoSave from '../../../../hooks/useAutoSave';
import useChangeSurveyMutation from '../../mutation/changeSurvey';
import { setLoading, setOpenSnackbar } from '../../../../redux/slice/global';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getSurveyById } from '../../../../API/axios';
import useAddFirstQuestionMutation from '../../mutation/addFirstQuestion';
import QuestionTextInput from './components/QuestionTextInput';
import Question from './components/Question';
import { Snackbar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { MoonLoader } from 'react-spinners';
import useChangeBackgroundSurveyMutation from '../../mutation/changeBackgroundSurvey';
import SurveyInterface from '../../../../utils/interfaces/survey';

const cx = classNames.bind(style);

const EditSurveyPage = () => {
    const dispatchApp = useAppDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const inputImage = useRef<HTMLInputElement>(null);
    const [isLoadBackground, setLoadBackground] = useState(false);
    const queryClient = useQueryClient();
    const survey = useAppSelector((state) => state.survey);
    const isEdit = useAppSelector((state) => state.survey.isEdit);

    const { data, isLoading, isError, isSuccess, error } = useQuery({
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
            if (isError) {
                navigate('/page404');
            }
        }
    }, [isLoading, isError, isSuccess, dispatchApp]);

    useEffect(() => {
        if (data) {
            dispatchApp(
                setSurvey({
                    survey: data,
                }),
            );
            dispatchApp(
                handleActiveQuestion({
                    indexQuestion: 0,
                }),
            );
        }
    }, [dispatchApp, data]);

    const ChangeSurveyMutation = useChangeSurveyMutation();
    useAutoSave(survey.title, () => {
        ChangeSurveyMutation.mutate(
            {
                id: survey.id,
                title: survey.title,
            },

            {
                onError(error, variables, context) {
                    console.log(error);
                },
            },
        );
    });
    useAutoSave(survey.description, () => {
        ChangeSurveyMutation.mutate(
            {
                id: survey.id,
                description: survey.description,
            },

            {
                onError(error, variables, context) {
                    console.log(error);
                },
            },
        );
    });

    const AddFirstQuestionMutation = useAddFirstQuestionMutation();
    const handleAddFirstQuestion = () => {
        dispatchApp(
            handleInsertQuestion({
                position: 0,
            }),
        );
        AddFirstQuestionMutation.mutate(
            {
                surveyId: id,
            },
            {
                onSuccess(data, variables, context) {
                    dispatchApp(
                        handleSetNewQuestion({
                            indexQuestion: 0,
                            newQuestion: data,
                        }),
                    );
                },
            },
        );
    };
    const ChangeBackgroundSurveyMutation = useChangeBackgroundSurveyMutation();
    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = (e.target as HTMLInputElement).files;
        if (files?.[0]) {
            const formData = new FormData();
            formData.append('file', files[0]);
            formData.append('currentBackgroundUrl', survey.backgroundImage ?? '');

            setLoadBackground(true);
            ChangeBackgroundSurveyMutation.mutate(
                {
                    formData,
                    surveyId: id,
                },
                {
                    onSuccess(data) {
                        queryClient.setQueryData([`getSurveyById_${id}`], (oldData: SurveyInterface) => {
                            return oldData
                                ? {
                                      ...oldData,
                                      backgroundImage: data,
                                  }
                                : oldData;
                        });

                        setLoadBackground(false);
                    },
                    onError() {
                        setLoadBackground(false);
                    },
                },
            );
        }
    };

    return (
        <div className={cx('wrapper')}>
            {isLoading && <MoonLoader color="#ed6c02" size={30} />}
            {data && (
                <div className={cx('inner')}>
                    <div className={cx('background')}>
                        {survey.backgroundImage && <img src={survey.backgroundImage} />}
                        <div
                            className={cx('edit-wrapper')}
                            onClick={() => {
                                if (!isEdit) {
                                    dispatchApp(
                                        setOpenSnackbar({
                                            value: true,
                                            message: 'Bạn không có quyền chỉnh sửa',
                                        }),
                                    );
                                    return;
                                }
                                inputImage.current?.click();
                            }}>
                            {!isLoadBackground ? (
                                <>
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        className={cx('input-image')}
                                        ref={inputImage}
                                        onChange={handleChangeImage}
                                    />
                                    <EditIcon className={cx('icon')} />
                                </>
                            ) : (
                                <MoonLoader color="#fff" size={15} />
                            )}
                        </div>
                    </div>
                    <div
                        className={cx('container', 'active', 'form-header')}
                        onClick={() =>
                            dispatchApp(
                                handleActiveQuestion({
                                    indexQuestion: -1,
                                }),
                            )
                        }>
                        <QuestionTextInput
                            value={survey.title}
                            onChange={(e) => {
                                if (!isEdit) {
                                    dispatchApp(
                                        setOpenSnackbar({
                                            value: true,
                                            message: 'Bạn không có quyền chỉnh sửa',
                                        }),
                                    );
                                    return;
                                }
                                dispatchApp(handleChangeTitle({ title: e.target.value }));
                            }}
                            isTitleForm={true}></QuestionTextInput>
                        <QuestionTextInput
                            placeholder="Mô tả khảo sát"
                            value={survey.description}
                            onChange={(e) => {
                                if (!isEdit) {
                                    dispatchApp(
                                        setOpenSnackbar({
                                            value: true,
                                            message: 'Bạn không có quyền chỉnh sửa',
                                        }),
                                    );
                                    return;
                                }
                                dispatchApp(handleChangeDescription({ description: e.target.value }));
                            }}></QuestionTextInput>
                    </div>
                    {survey.questions?.length == 0 && (
                        <div className={cx('add')} onClick={handleAddFirstQuestion}>
                            <div className={cx('separate')}></div>
                            <IoIosAddCircleOutline className={cx('icon')} />
                            <div className={cx('separate')}></div>
                        </div>
                    )}
                    {survey.questions?.map((question, index) => <Question key={question.id} index={index} />)}
                </div>
            )}
        </div>
    );
};

export default EditSurveyPage;
