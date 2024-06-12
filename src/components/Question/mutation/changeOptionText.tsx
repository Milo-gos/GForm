import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import API from '../../../utils/api';
import QuestionInterface from '../../../utils/interfaces/question';
import { changeOption } from '../../../utils/API/axios';

const useChangeOptionMutation = (optionId?: string) => {
    return useMutation({
        mutationKey: [`changeOption_${optionId}`],
        mutationFn: changeOption,
    });
};

export default useChangeOptionMutation;
