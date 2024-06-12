import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import API from '../../../utils/api';
import QuestionInterface from '../../../utils/interfaces/question';
import OptionInterface from '../../../utils/interfaces/option';
import RowInterface from '../../../utils/interfaces/row';
import GColumnInterface from '../../../utils/interfaces/gcolumn';
import { addGColumn } from '../../../utils/API/axios';

const useAddGColumnMutation = (questionId?: string) => {
    return useMutation({
        mutationKey: [`addGColumn_${questionId}`],
        mutationFn: addGColumn,
    });
};

export default useAddGColumnMutation;
