import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import API from '../../../utils/api';
import QuestionInterface from '../../../utils/interfaces/question';
import OptionInterface from '../../../utils/interfaces/option';
import RowInterface from '../../../utils/interfaces/row';
import GColumnInterface from '../../../utils/interfaces/gcolumn';

const useAddGColumnMutation = (questionId?: string) => {
    return useMutation({
        mutationKey: [`addGColumn_${questionId}`],
        mutationFn: async (body: any) => {
            const response = await axios.post(`${API.AddGColumn.endPoint}/${questionId}`, body);
            const gcolumn: GColumnInterface = response.data.data;
            return gcolumn;
        },
    });
};

export default useAddGColumnMutation;
