import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import API from '../../../utils/api';
import QuestionInterface from '../../../utils/interfaces/question';
import OptionInterface from '../../../utils/interfaces/option';

const useDeleteOptionMutation = (questionId?: string) => {
    return useMutation({
        mutationKey: [`deleteOption_${questionId}`],
        mutationFn: async (body: any) => {
            const response = await axios.delete(`${API.DeleteOption.endPoint}/${body.optionId}`);
            const option: OptionInterface = response.data.data;
            return option;
        },
    });
};

export default useDeleteOptionMutation;
