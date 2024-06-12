import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import API from '../../../utils/api';
import QuestionInterface from '../../../utils/interfaces/question';
import OptionInterface from '../../../utils/interfaces/option';
import RowInterface from '../../../utils/interfaces/row';
import { addRow } from '../../../utils/API/axios';

const useAddRowMutation = (questionId?: string) => {
    return useMutation({
        mutationKey: [`addOption_${questionId}`],
        mutationFn: addRow,
    });
};

export default useAddRowMutation;
