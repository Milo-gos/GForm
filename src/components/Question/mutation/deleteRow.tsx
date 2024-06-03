import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import API from '../../../utils/api';
import QuestionInterface from '../../../utils/interfaces/question';
import OptionInterface from '../../../utils/interfaces/option';
import RowInterface from '../../../utils/interfaces/row';

const useDeleteRowMutation = (rowId?: string) => {
    return useMutation({
        mutationKey: [`deleteRow_${rowId}`],
        mutationFn: async (body: any) => {
            const response = await axios.delete(`${API.DeleteRow.endPoint}/${body.rowId}`);
            const row: RowInterface = response.data.data;
            return row;
        },
    });
};

export default useDeleteRowMutation;
