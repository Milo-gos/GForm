import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import API from '../../../utils/api';
import QuestionInterface from '../../../utils/interfaces/question';
import RowInterface from '../../../utils/interfaces/row';

const useChangeRowMutation = (rowId?: string) => {
    return useMutation({
        mutationKey: [`changeRow_${rowId}`],
        mutationFn: async (body: any) => {
            const response = await axios.patch(`${API.ChangeRow.endPoint}/${rowId}`, body);
            const updateRow: RowInterface = response.data.data;
            return updateRow;
        },
    });
};

export default useChangeRowMutation;
