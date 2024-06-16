import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import ResponseInterface from '../../../utils/interfaces/submit';
import API from '../../../utils/api';
import SubmitFormInterface from '../../../utils/interfaces/submitForm';
import { createResponse } from '../../../utils/API/axios';

const useCreateResponseMutation = () => {
    return useMutation({
        mutationKey: ['createResponse'],
        mutationFn: createResponse,
    });
};

export default useCreateResponseMutation;
