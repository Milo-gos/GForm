import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import API from '../../../utils/api';
import QuestionInterface from '../../../utils/interfaces/question';
import OptionInterface from '../../../utils/interfaces/option';
import { deleteOption } from '../../../utils/API/axios';

const useDeleteOptionMutation = (questionId?: string) => {
    return useMutation({
        mutationKey: [`deleteOption_${questionId}`],
        mutationFn: deleteOption,
    });
};

export default useDeleteOptionMutation;
