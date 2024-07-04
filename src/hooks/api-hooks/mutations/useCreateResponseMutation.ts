import { useMutation } from '@tanstack/react-query';
import { createResponse } from '../../../API/axios';

const useCreateResponseMutation = () => {
    return useMutation({
        mutationKey: ['createResponse'],
        mutationFn: createResponse,
    });
};

export default useCreateResponseMutation;
