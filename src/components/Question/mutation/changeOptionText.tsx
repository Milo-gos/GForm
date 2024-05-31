import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import API from '../../../utils/api';
import QuestionInterface from '../../../utils/interfaces/question';

const useChangeOptionMutation = (optionId?: string) => {
    return useMutation({
        mutationKey: [`changeOption_${optionId}`],
        mutationFn: async (body: any) => {
            const response = await axios.patch(`${API.ChangeOption.endPoint}/${optionId}`, body);
            const updateOption: QuestionInterface = response.data.data;
            return updateOption;
        },
    });
};

export default useChangeOptionMutation;
