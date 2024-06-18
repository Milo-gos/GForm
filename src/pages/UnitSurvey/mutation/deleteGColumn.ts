import { useMutation } from '@tanstack/react-query';
import { deleteGColumn } from '../../../API/axios';

const useDeleteGColumnMutation = (gcolumnId?: string) => {
    return useMutation({
        mutationKey: [`deleteGColumn_${gcolumnId}`],
        mutationFn: deleteGColumn,
    });
};

export default useDeleteGColumnMutation;
