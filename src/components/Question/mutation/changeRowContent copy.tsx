import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import API from '../../../utils/api';
import QuestionInterface from '../../../utils/interfaces/question';
import RowInterface from '../../../utils/interfaces/row';
import { changeRow } from '../../../utils/API/axios';

const useChangeRowMutation = (rowId?: string) => {
    return useMutation({
        mutationKey: [`changeRow_${rowId}`],
        mutationFn: changeRow,
    });
};

export default useChangeRowMutation;
