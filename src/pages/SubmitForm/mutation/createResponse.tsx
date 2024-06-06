import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import ResponseInterface from '../../../utils/interfaces/submit';
import API from '../../../utils/api';
import SubmitFormInterface from '../../../utils/interfaces/submitForm';

const useCreateResponseMutation = () => {
    return useMutation({
        mutationKey: ['createResponse'],
        mutationFn: async (body: any) => {
            const response = await axios.post(`${API.CreateResponse.endPoint}`, body);
            const newResponse: SubmitFormInterface = response.data.data;
            return newResponse;
        },
    });
};

export default useCreateResponseMutation;
