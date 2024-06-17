import { useMutation } from '@tanstack/react-query';
import { createResponse } from '../../../utils/API/axios';

const useCreateResponseMutation = () => {
    return useMutation({
        mutationKey: ['createResponse'],
        mutationFn: createResponse,
    });
};

export default useCreateResponseMutation;
