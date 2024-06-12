import { useMutation } from '@tanstack/react-query';
import { deleteRow } from '../../../utils/API/axios';

const useDeleteRowMutation = (rowId?: string) => {
    return useMutation({
        mutationKey: [`deleteRow_${rowId}`],
        mutationFn: deleteRow,
    });
};

export default useDeleteRowMutation;
