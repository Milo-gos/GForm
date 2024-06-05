import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import ResponseInterface from '../../../utils/interfaces/response';
import API from '../../../utils/api';

const useCreateResponseMutation = () => {
    return useMutation({
        mutationKey: ['createResponse'],
        mutationFn: async (body: any) => {
            const response = await axios.post(`${API.CreateResponse.endPoint}`, body);
            const newResponse: ResponseInterface = response.data.data;
            return newResponse;
        },
    });
};

export default useCreateResponseMutation;
