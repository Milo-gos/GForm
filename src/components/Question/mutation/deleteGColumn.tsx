import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import API from '../../../utils/api';
import QuestionInterface from '../../../utils/interfaces/question';
import OptionInterface from '../../../utils/interfaces/option';
import RowInterface from '../../../utils/interfaces/row';
import GColumnInterface from '../../../utils/interfaces/gcolumn';

const useDeleteGColumnMutation = (gcolumnId?: string) => {
    return useMutation({
        mutationKey: [`deleteGColumn_${gcolumnId}`],
        mutationFn: async (body: any) => {
            const response = await axios.delete(`${API.DeleteGColumn.endPoint}/${body.gcolumnId}`);
            const gcolumn: GColumnInterface = response.data.data;
            return gcolumn;
        },
    });
};

export default useDeleteGColumnMutation;
