import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import API from '../../../utils/api';
import QuestionInterface from '../../../utils/interfaces/question';
import { changeQuestion } from '../../../utils/API/axios';

const useChangeQuestionMutation = (questionId: string) => {
    return useMutation({
        mutationKey: [`changeQuestion_${questionId}`],
        mutationFn: changeQuestion,
    });
};

export default useChangeQuestionMutation;
