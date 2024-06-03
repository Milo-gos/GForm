import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import API from '../../../utils/api';
import QuestionInterface from '../../../utils/interfaces/question';
import RowInterface from '../../../utils/interfaces/row';

const useChangeGColumnMutation = (gcolumnId?: string) => {
    return useMutation({
        mutationKey: [`changeGColumn_${gcolumnId}`],
        mutationFn: async (body: any) => {
            const response = await axios.patch(`${API.ChangeGColumn.endPoint}/${gcolumnId}`, body);
            const updateGColumn: RowInterface = response.data.data;
            return updateGColumn;
        },
    });
};

export default useChangeGColumnMutation;
