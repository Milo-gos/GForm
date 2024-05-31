import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import API from '../../../utils/api';
import QuestionInterface from '../../../utils/interfaces/question';

const useChangeLinearScaleMutation = (linearScaleId?: string) => {
    return useMutation({
        mutationKey: [`changeLinearScale_${linearScaleId}`],
        mutationFn: async (body: any) => {
            const response = await axios.patch(`${API.ChangeLinearScale.endPoint}/${linearScaleId}`, body);
            const updateOption: QuestionInterface = response.data.data;
            return updateOption;
        },
    });
};

export default useChangeLinearScaleMutation;
