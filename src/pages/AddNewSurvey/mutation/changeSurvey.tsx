import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import API from '../../../utils/api';
import QuestionInterface from '../../../utils/interfaces/question';
import { useParams } from 'react-router-dom';
import InstanceAxios from '../../../utils/axios/instanceAxios';
import { changeSurvey } from '../../../utils/API/axios';

const useChangeSurveyMutation = () => {
    const { id } = useParams();
    return useMutation({
        mutationKey: [`changeSurvey${id}`],
        mutationFn: changeSurvey,
    });
};

export default useChangeSurveyMutation;
