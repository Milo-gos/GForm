import { useMutation } from '@tanstack/react-query';
import { deleteGColumn } from '../../../../../../../utils/API/axios';

const useDeleteGColumnMutation = (gcolumnId?: string) => {
    return useMutation({
        mutationKey: [`deleteGColumn_${gcolumnId}`],
        mutationFn: deleteGColumn,
    });
};

export default useDeleteGColumnMutation;
