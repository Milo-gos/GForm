import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import API from '../../../utils/api';
import QuestionInterface from '../../../utils/interfaces/question';
import RowInterface from '../../../utils/interfaces/row';
import { changeGColumn } from '../../../utils/API/axios';

const useChangeGColumnMutation = (gcolumnId?: string) => {
    return useMutation({
        mutationKey: [`changeGColumn_${gcolumnId}`],
        mutationFn: changeGColumn,
    });
};

export default useChangeGColumnMutation;
