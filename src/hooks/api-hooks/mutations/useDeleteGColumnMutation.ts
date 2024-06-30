import { useMutation } from '@tanstack/react-query';
import { deleteGColumn } from '../../../API/axios';

const useDeleteGColumnMutation = () => {
    return useMutation({
        mutationKey: [`deleteGColumn`],
        mutationFn: deleteGColumn,
    });
};

export default useDeleteGColumnMutation;
