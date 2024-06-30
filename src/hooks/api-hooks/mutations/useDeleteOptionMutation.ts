import { useMutation } from '@tanstack/react-query';
import { deleteOption } from '../../../API/axios';

const useDeleteOptionMutation = () => {
    return useMutation({
        mutationKey: [`deleteOption`],
        mutationFn: deleteOption,
    });
};

export default useDeleteOptionMutation;
