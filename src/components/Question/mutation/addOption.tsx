import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import API from '../../../utils/api';
import QuestionInterface from '../../../utils/interfaces/question';
import OptionInterface from '../../../utils/interfaces/option';

const useAddOptionMutation = (questionId?: string) => {
    return useMutation({
        mutationKey: [`addOption_${questionId}`],
        mutationFn: async (body: any) => {
            const response = await axios.post(`${API.AddOption.endPoint}/${questionId}`, body);
            const option: OptionInterface = response.data.data;
            return option;
        },
    });
};

export default useAddOptionMutation;
