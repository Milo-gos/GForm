import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import API from '../../../utils/api';
import QuestionInterface from '../../../utils/interfaces/question';
import OptionInterface from '../../../utils/interfaces/option';
import RowInterface from '../../../utils/interfaces/row';

const useAddRowMutation = (questionId?: string) => {
    return useMutation({
        mutationKey: [`addOption_${questionId}`],
        mutationFn: async (body: any) => {
            const response = await axios.post(`${API.AddRow.endPoint}/${questionId}`, body);
            const row: RowInterface = response.data.data;
            return row;
        },
    });
};

export default useAddRowMutation;
