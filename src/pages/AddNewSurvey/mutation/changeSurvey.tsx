import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import API from '../../../utils/api';
import QuestionInterface from '../../../utils/interfaces/question';
import { useParams } from 'react-router-dom';

const useChangeSurveyMutation = () => {
    const { id } = useParams();
    return useMutation({
        mutationKey: [`changeQuestion_${id}`],
        mutationFn: async (body: any) => {
            const response = await axios.patch(`${API.ChangeSurvey.endPoint}/${id}`, body);
            const updateQuestion: QuestionInterface = response.data.data;
            return updateQuestion;
        },
    });
};

export default useChangeSurveyMutation;
