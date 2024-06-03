import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import API from '../../../utils/api';
import QuestionInterface from '../../../utils/interfaces/question';

const useChangeQuestionMutation = (questionId: string) => {
    return useMutation({
        mutationKey: [`changeQuestion_${questionId}`],
        mutationFn: async (body: any) => {
            const response = await axios.patch(`${API.ChangeQuestion.endPoint}/${questionId}`, body);
            const updateQuestion: QuestionInterface = response.data.data;
            return updateQuestion;
        },
    });
};

export default useChangeQuestionMutation;
