import React from 'react';
import style from './home.module.scss';
import classNames from 'classnames/bind';
import { MyButton } from '../../components';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import API from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import SurveyInterface from '../../utils/interfaces/survey';

const cx = classNames.bind(style);
const HomePage = () => {
    const navigate = useNavigate();
    const createNewSurveyMutation = useMutation({
        mutationKey: ['createSurvey'],
        mutationFn: async (body) => {
            const response = await axios.post(API.CreateSurvey.endPoint, body);
            const newSurvey: SurveyInterface = response.data.data;
            return newSurvey;
        },
    });
    const handleCreateNewSurvey = () => {
        createNewSurveyMutation.mutate(undefined, {
            onSuccess(data, variables, context) {
                navigate(`/surveys/${data.id}/edit`);
            },
        });
    };
    return (
        <div className={cx('wrapper')}>
            HOME PAGE
            <MyButton textButton="Tạo mới khảo sát" onClick={handleCreateNewSurvey} />
            {createNewSurveyMutation.isPending && <div>Đang tạo khảo sát...</div>}
        </div>
    );
};

export default HomePage;
