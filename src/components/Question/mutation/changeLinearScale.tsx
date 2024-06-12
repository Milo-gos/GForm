import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import API from '../../../utils/api';
import QuestionInterface from '../../../utils/interfaces/question';
import { changeLinearScale } from '../../../utils/API/axios';

const useChangeLinearScaleMutation = (linearScaleId?: string) => {
    return useMutation({
        mutationKey: [`changeLinearScale_${linearScaleId}`],
        mutationFn: changeLinearScale,
    });
};

export default useChangeLinearScaleMutation;
