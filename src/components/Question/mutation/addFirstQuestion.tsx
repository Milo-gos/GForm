import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import API from '../../../utils/api';
import QuestionInterface from '../../../utils/interfaces/question';
import OptionInterface from '../../../utils/interfaces/option';
import RowInterface from '../../../utils/interfaces/row';
import GColumnInterface from '../../../utils/interfaces/gcolumn';

const useAddFirstQuestionMutation = () => {
    return useMutation({
        mutationKey: [`addFirstQuestion`],
        mutationFn: async (body: any) => {
            const response = await axios.post(`${API.AddFirstQuestion.endPoint}`, body);
            const question: QuestionInterface = response.data.data;
            return question;
        },
    });
};

export default useAddFirstQuestionMutation;
