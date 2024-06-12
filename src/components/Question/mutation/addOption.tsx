import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import API from '../../../utils/api';
import QuestionInterface from '../../../utils/interfaces/question';
import OptionInterface from '../../../utils/interfaces/option';
import { addOPtion } from '../../../utils/API/axios';

const useAddOptionMutation = (questionId?: string) => {
    return useMutation({
        mutationKey: [`addOption_${questionId}`],
        mutationFn: addOPtion,
    });
};

export default useAddOptionMutation;
