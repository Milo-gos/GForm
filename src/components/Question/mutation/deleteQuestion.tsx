import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import API from '../../../utils/api';
import QuestionInterface from '../../../utils/interfaces/question';
import OptionInterface from '../../../utils/interfaces/option';
import RowInterface from '../../../utils/interfaces/row';
import GColumnInterface from '../../../utils/interfaces/gcolumn';
import { deleteQuestion } from '../../../utils/API/axios';

const useDeleteQuestionMutation = (questionId?: string) => {
    return useMutation({
        mutationKey: [`deleteQuestion_${questionId}`],
        mutationFn: deleteQuestion,
    });
};

export default useDeleteQuestionMutation;
